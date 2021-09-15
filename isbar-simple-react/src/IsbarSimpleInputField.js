import React from "react";
import TextInputField from "./TextInputField";
import { IsbarClientContext } from "./IsbarFhirClient";
import { questionnaireObject } from "./Questionnaire";
import { runInThisContext } from "vm";

// Class for the input field group.
export class ISBARSimpleInputField extends React.Component {

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
            // turns true if it's isobar
            isIsobar: false,
            // would be good if we have a array of question-answer pair.
        };
    }

    componentDidMount() {
        // questionnaire object
        // Code is not inlcuded becaues it's not related to anything?
        
        const client = this.context.client;
        this._loader = client.patient
            .read()
            .then(patient => {
                this.setState({ patient, loaded: true, error: null });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
        // Search for the questionnaire
        
            // the questionnaire
        client.create(questionnaireObject).then(questionnaire => {
            this.setState({ questionnaire })
            console.log(this.state.questionnaire);
        }).catch(console.error);
    }

    // function to change the form to isobar form.
    changeToIsobar() {

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
                        <TextInputField label="I" heading="Heading" value={this.state.patient} />
                        <TextInputField label="S" heading="Heading" value="Loading...." />
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
