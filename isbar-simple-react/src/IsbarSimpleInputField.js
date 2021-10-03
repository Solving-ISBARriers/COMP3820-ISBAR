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


        // This is the steam to retrieve the questionnaire object
        const loadQuestionnaire = loadPatient.then(() => {

            // WHy doesn't canonical url work?
            //return client.request(questionnaireObject.url);
            // tHis is searching based on name.. need something more robust.
            return client.request("Questionnaire?name=" + questionnaireObject.name);
        }).then(response => {

            console.log("Questionnaires:");
            console.log(response);
            if (response.total == 0) {
                // there are no questionnaire object - create one
                return client.create(questionnaireObject);
            } else {
                // return the existing questionnaire to be saved
                return response.entry[0].resource;
            }
        }).then(result => {
            // save the created/found questionnaire object
            this.setState({ questionnaire: result });
        });

        // this is the stream for questionnaireResponse object
        const loadResponse = loadPatient.then(() => {

            return client.patient.request("QuestionnaireResponse");
        }).then(response => {

            console.log("Questionnaireresponse bundle");
            console.log(response);
            // Find the response corresponding to isbar
            if (response.total > 0) {

                response.entry.forEach(element => {
                    if (element.resource.text.name == "isbar-simple-response") {

                        return element.resource;
                    }
                });
            }
            // create if there are no responses
            console.log("No questionnaire response from this patient. Creating one..")
            return client.create(this.newQuestionnaireResponse());
        }).then(result => {

            console.log("Questionnaire response result");
            console.log(result);
            // save the response object.
            this.setState({ questionnaireResponse: result });
        });

        // wait for all promise to resolve. and catch error
        Promise.all([loadQuestionnaire, loadResponse]).then((values) => {

            this.setState({ loaded: true, error: null });
        }).catch(error => {

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

    // create new empty questionnaire response resource with this patient.
    // returns the questionnaire object made.
    newQuestionnaireResponse() {

        // questionnaire response resource
        var qResponse = {
            "resourceType": "QuestionnaireResponse",
            "text": { "name": "isbar-simple-response" },
            // maybe later when we sort out the thingy
            // Reference the questionnaire
            //"questionnaire": "Questionnaire/" + this.state.questionnaire.id,
            "status": "in-progress",
            "authored": "2021-09-16T00:00:00+01:00",
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
        
        
        //item.answer[0].valueString = event.target.value

        if(response.item[index].hasOwnProperty('answer')){
            response.item[index].answer[0].valueString = event.target.value
        } else{
            response.item[index].answer = [{
                "valueString": event.target.value
            }]
        }
        
        this.setState({questionnaireResponse: response})
        

    }

    // Load the text fields after the questionnaire and questionnaire responses are loaded.
    render() {
        //const client = this.context.client;
        //this.state.client = this.context.client;
        //this.state.value = this.context.client;
        //var patient = this.state.value.patient;

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
                    <div className="isbar-input-fields">
                        <TextInputField
                            index="0"
                            item={this.state.questionnaireResponse.item[0]}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <TextInputField
                            index="1"
                            item={this.state.questionnaireResponse.item[1]}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <TextInputField
                            index="3"
                            item={this.state.questionnaireResponse.item[3]}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <TextInputField
                            index="4"
                            item={this.state.questionnaireResponse.item[4]}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <TextInputField
                            index="5"
                            item={this.state.questionnaireResponse.item[5]}
                            handleChange={this.handleChange.bind(this)}
                        />
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
