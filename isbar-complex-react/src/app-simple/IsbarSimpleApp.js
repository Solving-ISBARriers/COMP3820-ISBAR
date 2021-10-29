import React from "react";
import TextInputField from "./TextInputField";
import { IsbarClientContext } from "../IsbarFhirClient";
import { isbarQuestionnaire, newQuestionnaireResponse } from "./QuestionnaireTemplates";
import { SimplePDF } from "./SimplePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReactDOM } from "react";
import TextField from '@mui/material/TextField'
import simpleQuestionnaire from './res/simpleQuestionnaire'


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
      // questionnaire object that will be stored or created
      questionnaire: null,
      // questionnaire response object
      content: null,
      // turns true if it's isobar
      isIsobar: false,
      // indicates saved state
      saved: "edited",
      // type of current form
      formState: "ISOBAR"
    };

    this.updateResponse = this.updateResponse.bind(this)
  }

  componentDidMount() {
    console.log(simpleQuestionnaire)
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
          return client.create(simpleQuestionnaire);
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
          content: result,
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
      "Updated response: " + JSON.stringify(this.state.content)
    );
    this.context.client
      .update(this.state.content)
      .then((response) => {
        console.log(response);
        this.setState({ saved: "saved" })
      })
      .catch(console.error);
  }


  // this is the function for changing value
  // changes answer string in the questionnaireresponse object with given index
  // updates questionnaireresponse state
  // TODO: make it smooth
  updateResponse(event, index) {
    var response = this.state.content;

    if (response.item[index].hasOwnProperty("answer")) {
      response.item[index].answer[0].valueString = event.target.value;
    } else {
      response.item[index].answer = [
        {
          valueString: event.target.value,
        },
      ];
    }
    this.setState({ content: response });
    // change the saved state
    if (this.state.saved === "saved") {
      this.setState({ saved: "edited" })
    }
  }
  
  getFieldValue(index){
    return this.state.content.item[index].hasOwnProperty('answer')
    ? this.state.content.item[index].answer[0].valueString
    : ""
  }

  // Load the text fields after the questionnaire and questionnaire responses are loaded.
  render() {
    // questionnaire response object

    if (this.state.loaded) {
      return (

        <div className="container">
          <div id="simple-header">
            <button id="go-back-button" onClick={this.props.goBack}> Back to Menu </button>
            <h1>ISBAR</h1>
            <div id="simple-header-content">
              <p className="simple-state">
                State:
                {this.state.saved}
              </p>
              <label className="simple-toggle">
                Is ISOBAR:
                <input
                  name="isISOBAR"
                  type="checkbox"
                  checked={this.state.isIsobar}
                  onChange={() => this.setState(prevState => ({ isIsobar: !prevState.isIsobar }))}
                />
              </label>

            </div>
          </div>

          <TextField fullWidth multiline
          placeholder="Introduction"
          value={this.getFieldValue(0)}
          onChange={(e) => this.updateResponse(e, 0)}
          />
          <TextField fullWidth multiline
          placeholder="Situation"
          value={this.getFieldValue(1)}
          onChange={(e) => this.updateResponse(e, 1)}
          />
          <TextField fullWidth multiline
          placeholder="Observation"
          value={this.getFieldValue(2)}
          onChange={(e) => this.updateResponse(e, 2)}
          />
          <TextField fullWidth multiline
          placeholder="Background"
          value={this.getFieldValue(3)}
          onChange={(e) => this.updateResponse(e, 3)}
          />
          <TextField fullWidth multiline
          placeholder="Assessment"
          value={this.getFieldValue(4)}
          onChange={(e) => this.updateResponse(e, 4)}
          />
          <TextField fullWidth multiline
          placeholder="Recommendation"
          value={this.getFieldValue(5)}
          onChange={(e) => this.updateResponse(e, 5)}
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
                <SimplePDF content={this.state.content} />
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
      return (

        <div className="loading-container">
          Loading simple ISBAR form...
        </div>
      )
    }
  }
}
