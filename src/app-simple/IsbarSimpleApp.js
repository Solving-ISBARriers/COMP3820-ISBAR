import React from "react";
import { IsbarClientContext } from "../IsbarFhirClient";
import { SimplePDF } from "./SimplePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SimpleTextArea from "../common/SimpleTextArea";
import { Stack, Grid, Typography, Button } from '@mui/material'
import { FormControlLabel, Switch } from "@mui/material";
import FHIRAutocomplete from "../common/FHIRAutocomplete";
import { getSimpleName } from "../common/DisplayHelper";
import { ArrowBack } from "@mui/icons-material";
import Patient from "../app-complex/Patient"

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
      published: false,
      // indicates updated state.
      uploaded: true,
      recipient: null,

      // author and patient resources are required for print
      author: null,
      patient: null
    };

    this.updateFieldValue = this.updateFieldValue.bind(this)
    this.onRecipientSelect = this.onRecipientSelect.bind(this)
    this.createNewForm = this.createNewForm.bind(this)
  }

  componentDidMount() {
    console.log(this.props.create)
    // save author
    this.context.client.request("Practitioner/" + this.context.client.user.id)
      .then((res) => this.setState({ author: res }))
    this.context.client.patient.read()
      .then((res) => this.setState({ patient: res }))
    if (this.props.create) {
      // create new resource and store that 
      // new form targets to current practitiner
      const newForm = newQuestionnaireResponse(
        this.props.questionnaireID,
        this.context.client.patient.id,
        this.context.client.user.id)
      // always create a new form when approached this way
      this.setState({ content: newForm, loaded: true })
    } else {

      // note we are not directly modifying the file in parent.
      // parent will fetch the updated version via database query
      this.context.client.request("QuestionnaireResponse/" + this.props.formID)
        .then((res) => {
          // res is the questionnaire object
          console.log(res)
          this.setState({ content: res })
          // turn on isobar if the given form is isobar
          if (res.item[2].hasOwnProperty('answer')) {
            this.setState({ isIsobar: true })
          }
          if (res.hasOwnProperty('extension')) {

            return this.context.client.request(res.extension[0].valueReference.reference)
          }
        })
        .then((res) => {
          // res is practitioner resource of recipient practitioner
          this.setState({ recipient: res, loaded: true, published: true })

        })
    }
  }

  createNewForm() {
    // upload the new form
    if (!this.state.published) {
      this.context.client.create(this.state.content)
        .then((res) => {
          console.log(res)
          this.setState({ content: res, published: true })
        })
    }
  }

  componentDidUpdate() {
    this.uploadToServer()
  }

  // function to send upload request
  // checks if requires uploading
  uploadToServer() {
    if (!this.state.uploaded && this.state.published) {
      // console.log(this.state.content)
      this.context.client.update(this.state.content)
        .then((res) => {
          // console.log(res)
          if (res.hasOwnProperty('extension')) {
            this.context.client.request(res.extension[0].valueReference.reference)
              .then((res) => {
                // this updates the recipient
                this.setState({ recipient: res })
              })
          }
          this.setState({ uploaded: true })
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
  }

  // gets triggered when recipient is selected
  // value is the value from the autocomplete
  onRecipientSelect(value) {

    if (!value) {
      return
    }
    // reviewer is the name of extension
    const newContent = this.state.content
    // console.log(newContent)
    if (newContent.extension) {
      if (newContent.extension[0].hasOwnProperty('valueReference')) {
        newContent.extension[0].valueReference.reference = "Practitioner/" + value.id
      } else {
        newContent.extension[0].valueReference = {
          reference: "Practitioner/" + value.id
        }
      }
    } else {
      newContent.extension = [{
        url: "http://hl7.org/fhir/StructureDefinition/questionnaireresponse-reviewer",
        valueReference: {
          reference: "Practitioner/" + value.id
        }
      }]
    }
    this.setState({ content: newContent, uploaded: false })
  }

  // Load the text fields after the questionnaire and questionnaire responses are loaded.
  render() {
    // questionnaire response object

    if (this.state.loaded) {
      return (
        <Stack spacing={2}>

          {/* Header grid */}
          <Grid container spacing={3} align="center" justify="center"
            sx={{
              borderBottomWidth: '1px',
              borderBottomColor: 'text.secondary',
              borderBottomStyle: 'solid',
              padding: "10px"
            }}
          >
            <Grid item xs={3} sx={{
              color: "text.primary",

            }}>
              <ArrowBack
                onClick={this.props.goBack}
                sx={{
                  fontSize: "30px",
                  // padding: "5px",
                  cursor: "pointer"
                }} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h5'
                align="center"
              >
                Simple ISBAR Form
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <FormControlLabel
                value="ISOBAR"
                control={<Switch />}
                checked={this.state.isIsobar}
                label="ISOBAR"
                labelPlacement="start"
                onChange={(event) => this.setState({ isIsobar: event.target.checked })}
                sx={{
                  alignSelf: 'center'
                }}
              />
            </Grid>
          </Grid>

          <Stack spacing={3}
            sx={{
              padding: '3%'
            }}>

            <Grid container spacing={2}>
              <Grid item xs={8}>
                <FHIRAutocomplete
                  resourceName="Practitioner"
                  searchTerm="name"
                  label="Recipient"
                  id="recipientAutocomplete"
                  initialValue={this.state.recipient ? {
                    label: getSimpleName(this.state.recipient.name),
                    id: this.state.recipient.id
                  } : null}
                  queries={[]}
                  onSelect={(value) => this.onRecipientSelect(value)}
                  getLabel={(resource) => getSimpleName(resource.name)}
                />
              </Grid>

              <Grid item xs={2}
                justifySelf="center"
                alignSelf="center"
              >
                <PDFDownloadLink
                  document={
                    <SimplePDF
                      content={this.state.content}
                      author={this.state.author}
                      recipient={this.state.recipient}
                      subject={this.state.patient}
                    />
                  }
                  fileName="isbar.pdf"
                >
                  <Button
                    size="large"
                    variant="outlined"
                    fullWidth={true}
                  >
                    {/* {({ blob, url, loading, error }) =>
                      loading ? "Preparing" : "Print"
                    } */}
                    Print
                  </Button>
                </PDFDownloadLink>

              </Grid>
              <Grid item xs={2}
                justifySelf="center"
                alignSelf="center"
              >
                <Button
                  size="large"
                  variant="outlined"
                  fullWidth={true}
                  disabled={this.state.published}
                  onClick={this.createNewForm}
                > Publish
                </Button>

              </Grid>

            </Grid>
            <SimpleTextArea
              initialValue={this.getFieldValue(0)}
              placeholder="Introduction"
              label="Introduction"
              visible={true}
              updateField={(value) => this.updateFieldValue(value, 0)}
            />
            <SimpleTextArea
              initialValue={this.getFieldValue(1)}
              placeholder="Situation"
              label="Situation"
              visible={true}
              updateField={(value) => this.updateFieldValue(value, 1)}
            />
            <SimpleTextArea
              initialValue={this.getFieldValue(2)}
              placeholder="Observation"
              label="Observation"
              visible={this.state.isIsobar}
              updateField={(value) => this.updateFieldValue(value, 2)}
            />
            <SimpleTextArea
              initialValue={this.getFieldValue(3)}
              placeholder="Background"
              label="Background"
              visible={true}
              updateField={(value) => this.updateFieldValue(value, 3)}
            />
            <SimpleTextArea
              initialValue={this.getFieldValue(4)}
              placeholder="Assessment"
              label="Assessment"
              visible={true}
              updateField={(value) => this.updateFieldValue(value, 4)}
            />
            <SimpleTextArea
              initialValue={this.getFieldValue(5)}
              placeholder="Recommendation"
              label="Recommendation"
              visible={true}
              updateField={(value) => this.updateFieldValue(value, 5)}
            />

          </Stack >
        </Stack>
      )
    } else {
      return (

        <div className="loading-container">
          Loading ISBAR form
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
    extension: [{
      url: "http://hl7.org/fhir/StructureDefinition/questionnaireresponse-reviewer",
      valueReference: {
        // reference: "Practitioner/" + sourceID
      }
    }],
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