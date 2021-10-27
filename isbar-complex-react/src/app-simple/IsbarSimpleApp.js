import React from "react";
import TextInputField from "./TextInputField";
import { IsbarClientContext } from "../IsbarFhirClient";
import { isbarQuestionnaire, newQuestionnaireResponse } from "./QuestionnaireTemplates";
import { IsbarDoc } from "./IsbarDoc";
import { PDFDownloadLink } from "@react-pdf/renderer";


// Class for the input field group.
export class IsbarSimpleApp extends React.Component {
  
  // the this.context.client is the client object!!!
  static contextType = IsbarClientContext;

  constructor(props) {
    super(props);
    this.state = {
      // used true if data is loaded
      loaded: false,
      error: null,
      // true if questionnaireResponse exists
      responseExist: false,
      patient: null,
      // questionnaire object that will be stored or created
      questionnaire: null,
      // questionnaire response object
      questionnaireResponse: null,
      // turns true if it's isobar
      isIsobar: false,
      // indicates saved state
      saveState: "edited",
      // type of current form
      formState: "ISOBAR"
      // would be good if we have a array of question-answer pair.
    };
  }

  componentDidMount() {
    // load client from the client context
    const client = this.context.client;

    // Promise to load/create questionnaire
    client.request("Questionnaire?name=" + isbarQuestionnaire.name)
      .then((response) => {
        // Check if questionnaire exist or not

        console.log("Questionnaires:");
        console.log(response);
        if (response.total === 0) {
          // there are no questionnaire object - create one
          return client.create(isbarQuestionnaire);
        } else {
          // return the existing questionnaire to be saved
          return response.entry[0].resource;
        }
      })
      .then((result) => {
        // save questionnaire, request questionnaireResponse

        this.setState({ questionnaire: result });
        return client.request(
          "QuestionnaireResponse?source=Patient/" +
          this.context.client.patient.id
        );
      })
      .then((response) => {
        // Check if there's an existing questionnaireResponse

        console.log("Questionnaire Responses:");
        console.log(response);
        var qResponse;

        if (response.total > 0) {
          if (
            response.entry.some((element) => {
              qResponse = element.resource;
              return this.checkExistingResponse(element.resource);
            })
          ) {

            // response that fulfills the criteria exists
            console.log("Selected Response");
            console.log(qResponse)

            return qResponse;
          }
        }
        // no isbar responses - create one
        console.log(
          "No ISBAR questionnaire response from this patient. Creating one.."
        );
        return client.create(newQuestionnaireResponse(
          this.state.questionnaire.id,
          this.context.client.patient.id
        ));
      })
      .then((result) => {
        console.log("Questionnaire response result");
        console.log(result);
        // save the response object, finish loading
        this.setState({
          questionnaireResponse: result,
          loaded: true,
          error: null,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error, loaded: false });
      });
  }

  // check if the given resource is QuestionnaireResponse for isbar
  // still need some check to see if it is actually for isbar
  checkExistingResponse(resource) {
    if (
      resource.source.reference ===
      "Patient/" + this.context.client.patient.id &&
      resource.questionnaire === "Questionnaire/" + this.state.questionnaire.id
    ) {
      return true;
    }
    return false;
  }

  // function to send update request
  updateResponse() {
    console.log(
      "Updated response: " + JSON.stringify(this.state.questionnaireResponse)
    );
    this.context.client
      .update(this.state.questionnaireResponse)
      .then((response) => {
        console.log(response);
        this.setState({ saveState: "saved" })
      })
      .catch(console.error);
  }


  // this is the function for changing value
  // changes answer string in the questionnaireresponse object with given index
  // updates questionnaireresponse state
  handleChange(event, index) {
    var response = this.state.questionnaireResponse;

    if (response.item[index].hasOwnProperty("answer")) {
      response.item[index].answer[0].valueString = event.target.value;
    } else {
      response.item[index].answer = [
        {
          valueString: event.target.value,
        },
      ];
    }

    this.setState({ questionnaireResponse: response });
    if (this.state.saveState === "saved") {
      this.setState({ saveState: "edited" })
    }
  }

  printPDF() { }

  // Load the text fields after the questionnaire and questionnaire responses are loaded.
  render() {
    // questionnaire response object

    if (this.state.loaded) {
      return (
        
          <div className="container">

            <label>
              Is ISOBAR:
              <input
                name="isISOBAR"
                type="checkbox"
                checked={this.state.isIsobar}
                onChange={() => this.setState(prevState => ({ isIsobar: !prevState.isIsobar }))}
              />
            </label>
            <p>
              State:
              {this.state.saveState}
            </p>

            <TextInputField
              index="0"
              formID="introduction"
              label="Introduction"
              placeholder="Introduction"
              item={this.state.questionnaireResponse.item[0]}
              handleChange={this.handleChange.bind(this)}
            />
            <TextInputField
              index="1"
              formID="situation"
              label="Situation"
              placeholder="Situation"
              item={this.state.questionnaireResponse.item[1]}
              handleChange={this.handleChange.bind(this)}
            />
            <TextInputField
              index="2"
              formID="Observation"
              label="Observation"
              placeholder="Observation"
              item={this.state.questionnaireResponse.item[2]}
              render={this.state.isIsobar}
              handleChange={this.handleChange.bind(this)}
            />
            <TextInputField
              index="3"
              formID="background"
              label="Background"
              placeholder="Background"
              item={this.state.questionnaireResponse.item[3]}
              handleChange={this.handleChange.bind(this)}
            />
            <TextInputField
              index="4"
              formID="assessment"
              label="Assessment"
              placeholder="Assessment"
              item={this.state.questionnaireResponse.item[4]}
              handleChange={this.handleChange.bind(this)}
            />
            <TextInputField
              index="5"
              formID="recommendation"
              label="Recommendation"
              placeholder="Recommendation"
              item={this.state.questionnaireResponse.item[5]}
              handleChange={this.handleChange.bind(this)}
            />
            <button
              className="isbar-save"
              onClick={() => this.updateResponse()}
            >
              Save
            </button>

            <button className="isbar-save">
              <PDFDownloadLink
                document={
                  <IsbarDoc content={this.state.questionnaireResponse} />
                }
                fileName="isbar.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Preparing" : "Print"
                }
              </PDFDownloadLink>
            </button>
          </div>
        
      )
    } else {
      return <div className="isbar-loading">Loading the ISBAR form..</div>;
    }
  }
}
