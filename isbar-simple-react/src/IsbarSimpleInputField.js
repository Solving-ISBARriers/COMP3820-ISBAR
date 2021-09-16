import React from "react";
import TextInputField from "./TextInputField";
import { IsbarClientContext } from "./IsbarFhirClient";
import { questionnaireObject } from "./QuestionnaireTemplates";

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
            patient: null,
            questionnaire: null,
            questionnaireResponse: null,
            // variable for testing.
            test: null,
            // turns true if it's isobar
            isIsobar: false,
            // would be good if we have a array of question-answer pair.
        };
    }

    componentDidMount() {
        // questionnaire object
        // Code is not inlcuded becaues it's not related to anything?

        const client = this.context.client;
        console.log("Component mounted");
        // These are number of async calls.
        const loadPatient = client.patient
            .read()
            .then(patient => {
                this.setState({ patient, loaded: false, error: null });
                console.log(questionnaireObject.name);
                // Request the questionnaire responses by this patient
                //return client.patient.request("QuestionnaireResponse")
            });

            // is is the steam to retrieve the questionnaire object
        const loadQuestionnaire = loadPatient.then(() => {

            // WHy doesn't canonical url work?
            //return client.request(questionnaireObject.url);
            // tHis is searching based on name.. need something more robust.
            return client.request("Questionnaire?name=" + questionnaireObject.name);
        }).then(response => {

            console.log("Questionnaires:");
            console.log(response);
            if(response.total == 0){
                // there are no questionnaire object - create one
                return client.create(questionnaireObject);
            } else{
                // return the existing questionnaire to be saved
                return response.entry[0].resource;
            }
        }).then(response =>{
            // save the created/found questionnaire object
            this.setState({questionnaire: response});
        });

        // this is the stream for questionnaireResponse object
        const loadResponse = loadPatient.then(() => {

            return client.patient.request("QuestionnaireResponse");
        }).then(response => {
            console.log("Questionnaireresponse");
            console.log(response);
            // Find the response corresponding to isbar
            if(response.total == 0){
                // create questionnaire response resource and save it
            } else{
                this.setState({questionnaireResponse: response.entry[0].resource});
            }
        });

        // wait for all promise to resolve. and catch error
        Promise.all([loadQuestionnaire, loadResponse]).then((values) => {
            this.setState({ loaded: true, error: null });
        })
            .catch(error => {
                console.error(error);
                this.setState({ error, loaded: false });
            });

    }

    // function to change the form to isobar form.
    changeToIsobar() {

    }

    // function that creates questionnaire
    createQuestionnaire() {
        this.client.create(questionnaireObject).then(response => {
            console.log("Created questionnaire");
            console.log(response);
        }).catch(console.error);
    }

    // create new questionnaire response resource with this patient.
    createQuestionnaireResponse() {
        // questionnaire response resource
        var qResponse = {
            "resourceType": "QuestionnaireResponse",
            "questionnaire": "Questionnaire/" + this.state.questionnaire.id,
            "status": "in-progress",
            "authored": "2021-09-16T00:00:00+01:00",
            "source": {
                "reference": "Patient/" + this.client.patient.id
            },
            "item": [
                {
                    "linkId": "1",
                    "text": this.state.questionnaire.text
                }
            ]
        }

        this.client.create(questionnaireObject).then(response => {
            console.log("Created questionnaireResponse");
            console.log(response);
        }).catch(console.error);
    }

    // Load the text fields after the questionnaire and questionnaire responses are loaded.
    render() {
        //const client = this.context.client;
        //this.state.client = this.context.client;
        //this.state.value = this.context.client;
        //var patient = this.state.value.patient;
        if (this.state.loaded) {
            if (this.state.isIsobar) {
                return (
                    <div className="isbar-input-fields">
                        <TextInputField label="I" heading="Heading" value={this.state.patient} />
                        <TextInputField label="S" heading="Heading" value="Loading...." />
                        <TextInputField label="O" heading="Heading" value="Loading..." />
                        <TextInputField label="B" heading="Heading" value="Loading..." />
                        <TextInputField label="A" heading="Heading" value="Loading..." />
                        <TextInputField label="R" heading="Heading" value="Loading..." />

                    </div>
                )
            } else {
                return (
                    <div className="isbar-input-fields">
                        <TextInputField label="I" heading="Heading" value={JSON.stringify(this.state.patient)} />
                        <TextInputField label="S" heading="Heading" value={JSON.stringify(this.state.test)} />
                        <TextInputField label="B" heading="Heading" value="Loading..." />
                        <TextInputField label="A" heading="Heading" value="Loading..." />
                        <TextInputField label="R" heading="Heading" value="Loading..." />
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
