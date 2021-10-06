import React from "react";
import TextInputField from "./TextInputField";
import { IsbarClientContext } from "./IsbarFhirClient";
import { isbarQuestionnaire } from "./QuestionnaireTemplates";
import { IsbarDoc } from "./IsbarDoc";
import { PDFDownloadLink } from '@react-pdf/renderer';

// Class for the input field group.
export class IsbarSimpleInputField extends React.Component {

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
            questionnaire: null,
            questionnaireResponse: null,
            // turns true if it's isobar
            isIsobar: false,
            // would be good if we have a array of question-answer pair.
        };
    }

    componentDidMount() {

        // load client from the client context
        const client = this.context.client;

        // Promise to set the patient... for?
        //const loadPatient = client.patient.read().then(patient => this.setState({patient: patient}))

        // Promise to load/create questionnaire
        const loadQuestionnaire = client.request("Questionnaire?name=" + isbarQuestionnaire.name)
            .then(response => {
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
            }).then(result => {
                // save questionnaire, request questionnaireResponse

                this.setState({ questionnaire: result });
                return client.request("QuestionnaireResponse?source=Patient/" + this.context.client.patient.id)
            }).then(response => {
                // Check if there's an existing questionnaireResponse

                console.log("Questionnaire Responses:");
                console.log(response);
                var qResponse

                if (response.total > 0) {
                    if (
                        response.entry.some(element => {
                            qResponse = element.resource;
                            return this.checkExistingResponse(element.resource);
                        })
                    ) {
                        // response that fulfills the criteria exists
                        console.log("Selected Response")
                        //console.log(qResponse)
                        console.log(this.newQuestionnaireResponse());
                        //return client.create(this.newQuestionnaireResponse());
                        return qResponse
                    }
                }
                // no isbar responses - create one
                console.log("No ISBAR questionnaire response from this patient. Creating one..")
                return client.create(this.newQuestionnaireResponse());
            }).then(result => {

                console.log("Questionnaire response result");
                console.log(result);
                // save the response object, finish loading
                this.setState({
                    questionnaireResponse: result,
                    loaded: true,
                    error: null
                });
            }).catch(error => {

                console.error(error);
                this.setState({ error, loaded: false });
            });
    }

    // function to change the form to isobar form.
    changeToIsobar() {

    }

    // check if the given resource is QuestionnaireResponse for isbar
    // still need some check to see if it is actually for isbar
    checkExistingResponse(resource) {

        if (resource.source.reference === "Patient/" + this.context.client.patient.id &&
            resource.questionnaire === "Questionnaire/" + this.state.questionnaire.id
        ) {
            return true
        }
        return false
    }

    // function to send update request
    updateResponse() {
        console.log("Updated response: " + JSON.stringify(this.state.questionnaireResponse))
        this.context.client.update(this.state.questionnaireResponse)
            .then(console.log)
            .catch(console.error)
    }

    // create new empty questionnaire response resource with this patient.
    // returns the questionnaire object made.
    newQuestionnaireResponse() {

        // questionnaire response resource
        var qResponse = {
            "resourceType": "QuestionnaireResponse",
            "text": { "name": "isbar-simple-response" },
            // maybe later when we sort out the thingy
            // Reference the questionnaire
            "questionnaire": "Questionnaire/" + this.state.questionnaire.id,
            "status": "in-progress",
            "source": {
                // refer to current patient
                "reference": "Patient/" + this.context.client.patient.id
            },
            "item": [
                {
                    "linkId": "1",
                    "text": "I:Identify",
                    "answer": [
                        {
                            "valueString": ""
                        }
                    ]
                },
                {
                    "linkId": "2",
                    "text": "S:Situation",
                    "answer": [
                        {
                            "valueString": ""
                        }
                    ]
                },
                {
                    "linkId": "3",
                    "text": "O:Observation",
                    "answer": [
                        {
                            "valueString": ""
                        }
                    ]
                },
                {
                    "linkId": "4",
                    "text": "B:Background",
                    "answer": [
                        {
                            "valueString": ""
                        }
                    ]
                },
                {
                    "linkId": "5",
                    "text": "A:Assessment",
                    "answer": [
                        {
                            "valueString": ""
                        }
                    ]
                },
                {
                    "linkId": "6",
                    "text": "R:Recommendation",
                    "answer": [
                        {
                            "valueString": ""
                        }
                    ]
                },
            ]
        }

        return qResponse;
    }

    // this is the function for changing value
    // changes answer string in the questionnaireresponse object with given index
    // updates questionnaireresponse state
    handleChange(event, index) {

        var response = this.state.questionnaireResponse;

        if (response.item[index].hasOwnProperty('answer')) {
            response.item[index].answer[0].valueString = event.target.value
        } else {
            response.item[index].answer = [{
                "valueString": event.target.value
            }]
        }

        this.setState({ questionnaireResponse: response })
    }

    printPDF() {

    }

    // Load the text fields after the questionnaire and questionnaire responses are loaded.
    render() {

        // questionnaire response object

        if (this.state.loaded) {
            if (this.state.isIsobar) {
                return (
                    <div className="isbar-input-fields">
                        {/* <TextInputField label="I" heading="Heading" value={this.state.questionnaireResponse} />
                        <TextInputField label="S" heading="Heading" value="Loading...." />
                        <TextInputField label="O" heading="Heading" value="Loading..." />
                        <TextInputField label="B" heading="Heading" value="Loading..." />
                        <TextInputField label="A" heading="Heading" value="Loading..." />
                        <TextInputField label="R" heading="Heading" value="Loading..." /> */}

                    </div>
                )
            } else {
                return (
                    <div className="container">

                        <TextInputField
                            index="0"
                            formID="introduction"
                            label="I"
                            placeholder="Introduction"
                            item={this.state.questionnaireResponse.item[0]}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <TextInputField
                            index="1"
                            formID="situation"
                            label="S"
                            placeholder="Situation"
                            item={this.state.questionnaireResponse.item[1]}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <TextInputField
                            index="3"
                            formID="background"
                            label="B"
                            placeholder="Background"
                            item={this.state.questionnaireResponse.item[3]}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <TextInputField
                            index="4"
                            formID="assessment"
                            label="A"
                            placeholder="Assessment"
                            item={this.state.questionnaireResponse.item[4]}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <TextInputField
                            index="5"
                            formID="recommendation"
                            label="R"
                            placeholder="Recommendation"
                            item={this.state.questionnaireResponse.item[5]}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <button
                            className="isbar-save"
                            onClick={() => this.updateResponse()}>
                            Save
                        </button>

                        
                        
                        <button
                            className="isbar-save">
                            <PDFDownloadLink document={
                            <IsbarDoc content={this.state.questionnaireResponse}/>} fileName="isbar.pdf">
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Preparing' : 'Print'
                                }
                            </PDFDownloadLink>
                            </button>
                    </div>
                )
            }
        } else {
            return (
                <div className="isbar-loading">
                    Loading the ISBAR form..
                </div>
            )
        }
    }
}
