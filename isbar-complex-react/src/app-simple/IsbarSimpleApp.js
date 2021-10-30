import React from "react";
import { IsbarClientContext } from "../IsbarFhirClient";
import { SimplePDF } from "./SimplePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SimpleTextArea from "../common/SimpleTextArea";
import { Stack, Grid, Typography, Slider } from '@mui/material'
import { FormGroup, FormControl, FormControlLabel, Switch } from "@mui/material";


// Class for the input field group.
export class IsbarSimpleApp extends React.Component {

  // the this.context.client is the client object!!!
  static contextType = IsbarClientContext;

  constructor(props) {
    super(props);
    this.state = {

      loaded: false,
      // questionnaire response object
      content: null,
      // turns true if it's isobar
      isIsobar: false,
      // indicates saved state
      isNew: false,
      // indicates updated state.
      uploaded: true
    };

    this.updateFieldValue = this.updateFieldValue.bind(this)
  }

  componentDidMount() {
    console.log(this.props.create)
    if (this.props.create) {
      // create new resource and store that 
      // now the question is.. do we have to create the resource in the server?
      // no, we include a publish button for now, because it may result in many duplicates.
      // this.createSimpleIsbar()
      // new form targets to current practitiner?
      const newForm = newQuestionnaireResponse(
        this.props.questionnaireID,
        this.context.client.patient.id,
        this.context.client.user.id)
      // always create a new form when approached this way
      this.context.client.create(newForm)
        .then((res) => {
          // console.log(res)
          this.setState({ content: res, loaded: true })
        })
    } else {

      // note we are not directly modifying the file in parent.
      // parent will fetch the updated version via database query
      this.context.client.request("QuestionnaireResponse/" + this.props.formID)
        .then((res) => this.setState({ content: res, loaded: true }))
    }
  }

  componentDidUpdate() {
    this.uploadToServer()
  }

  // function to send upload request
  // checks if requires uploading
  uploadToServer() {
    if (!this.state.uploaded) {
      this.context.client.update(this.state.content)
        .then((res) => {
          this.setState({ uploaded: true })
          console.log(res)
        })
    }
  }

  getFieldValue(index) {
    return this.state.content.item[index].hasOwnProperty('answer')
      ? this.state.content.item[index].answer[0].valueString
      : ""
  }

  // update the isbar form field of given index to the value given
  updateFieldValue(value, index) {
    const prevContent = this.state.content
    if (prevContent.item[index].hasOwnProperty('answer')) {
      prevContent.item[index].answer[0].valueString = value
    } else {
      prevContent.item[index].answer = [{
        valueString: value
      }]
    }
    this.setState({ content: prevContent, uploaded: false })
    // should we update the server?
    // we will think about it!
    // how often should it call the update?
  }

  // Load the text fields after the questionnaire and questionnaire responses are loaded.
  render() {
    // questionnaire response object

    if (this.state.loaded) {
      return (
        <Stack spacing={2}
          sx={{
            padding: '5% 3% 5% 3%'
          }}>

          <Typography variant='h2'>
            Simple ISBAR Form
          </Typography>
          <Grid>
            <FormControlLabel
              value="ISOBAR"
              control={<Switch />}
              label="ISOBAR"
              labelPlacement="start"
              onChange={(event) => this.setState({isIsobar: event.target.checked})}
            >
            </FormControlLabel>
          </Grid>
          <SimpleTextArea
            initialValue={this.getFieldValue(0)}
            placeholder="Introduction"
            visible={true}
            updateField={(value) => this.updateFieldValue(value, 0)}
          />
          <SimpleTextArea
            initialValue={this.getFieldValue(1)}
            placeholder="Situation"
            visible={true}
            updateField={(value) => this.updateFieldValue(value, 1)}
          />
          <SimpleTextArea
            initialValue={this.getFieldValue(2)}
            placeholder="Observation"
            visible={this.state.isIsobar}
            updateField={(value) => this.updateFieldValue(value, 2)}
          />
          <SimpleTextArea
            initialValue={this.getFieldValue(3)}
            placeholder="Background"
            visible={true}
            updateField={(value) => this.updateFieldValue(value, 3)}
          />
          <SimpleTextArea
            initialValue={this.getFieldValue(4)}
            placeholder="Assessment"
            visible={true}
            updateField={(value) => this.updateFieldValue(value, 4)}
          />
          <SimpleTextArea
            initialValue={this.getFieldValue(5)}
            placeholder="Recommendation"
            visible={true}
            updateField={(value) => this.updateFieldValue(value, 5)}
          />

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

        </Stack >

      )
    } else {
      return (

        <div className="loading-container">
          Creating new form..
        </div>
      )
    }
  }
}

// function that returns a new response
// sourceID: ID of practitioner writing this form
// it assumes the target is not defined, target practitioner will be included later.
function newQuestionnaireResponse(questionnaireID, patientID, sourceID) {
  // questionnaire response resource
  //const date = new Date()
  // const lastModified = new Date().toJSON()
  // console.log(lastModified)

  var qResponse = {
    resourceType: "QuestionnaireResponse",
    text: { name: "isbar handover form" },
    // maybe later when we sort out the thingy
    // Reference the questionnaire
    // date this form was last modified
    // authored: lastModified,
    questionnaire: "Questionnaire/" + questionnaireID,
    status: "in-progress",
    subject: {
      reference: "Patient/" + patientID
    },
    author: {
      // refer to current practitioner
      reference: "Practitioner/" + sourceID,
    },
    // extension not used because resolving reference requires extra effort. 
    // Instead, author section is used.
    // extension: [{
    //   url:"http://hl7.org/fhir/StructureDefinition/questionnaireresponse-reviewer",
    //   valueReference:{
    //     reference: "Practitioner/" + targetID
    //   }
    // }],
    item: [
      {
        linkId: "1",
        text: "I:Identify",
      },
      {
        linkId: "2",
        text: "S:Situation",
      },
      {
        linkId: "3",
        text: "O:Observation",
      },
      {
        linkId: "4",
        text: "B:Background",
      },
      {
        linkId: "5",
        text: "A:Assessment",
      },
      {
        linkId: "6",
        text: "R:Recommendation",
      },
    ],
  };

  return qResponse;
}