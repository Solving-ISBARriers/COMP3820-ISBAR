import React from "react";
// import TextInputField from "./TextInputField";
import { IsbarClientContext } from "../IsbarFhirClient";
import { isbarQuestionnaire, newQuestionnaireResponse } from "./QuestionnaireTemplates";
import { SimplePDF } from "./SimplePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import { ReactDOM } from "react";
import TextField from '@mui/material/TextField'
import simpleQuestionnaire from './res/simpleQuestionnaire'
import { client } from "fhirclient";


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
    this.context.client.user.read().then(console.log)
    this.setState({content: this.props.content})
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
