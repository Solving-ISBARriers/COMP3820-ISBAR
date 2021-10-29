// Main class for the main screen. Contains everything.
import React from "react";
import { IsbarClientProvider } from "./IsbarFhirClient";
import { IsbarSimpleApp } from "./app-simple/IsbarSimpleApp";
import { IsbarComplexApp } from "./app-complex/IsbarComplexApp";
import { IsbarComplexDevelopment } from "./app-complex/IsbarComplexDevelopment";
import { isbarQuestionnaire, newQuestionnaireResponse } from "./app-simple/QuestionnaireTemplates";
import { IsbarClientContext } from "./IsbarFhirClient";

export default class Home extends React.Component {

    render() {
        return (
            <IsbarClientProvider>
                <AppController />
            </IsbarClientProvider>
        )
    }
}

// this component loads and displays the questionnaireResponse
class AppController extends React.Component {

    static contextType = IsbarClientContext;
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            isMenu: true,
            isSimple: true,
            simpleResponses: null,
            questionnaireID: null
        }
    }
    componentDidMount() {

        // Load questionnaire and simple isbar forms.
        const loadSimple = this.loadQuestionnaireID()
            .then((res) => this.loadSimpleIsbars(res))

        // wait till all promises resolved
        Promise.all([loadSimple]).then(() => console.log("all loaded"))
    }

    backToMenu() {
        this.setState({ isMenu: true })
    }

    // Returns a promise that loads questionnaire ID using questionnaire template
    // updates the state for questionnaire id
    // the promise resolves to questionnaire id
    loadQuestionnaireID() {

        return this.context.client.request("Questionnaire?name=" + isbarQuestionnaire.name)
            .then((response) => {
                console.log(response)
                if (response.total === 0) {
                    // there are no questionnaire object - create one
                    return this.context.client.create(isbarQuestionnaire);
                } else {
                    // return the existing questionnaire to be saved
                    return response.entry[0].resource;
                }
            }).then((result) => {
                this.setState({ questionnaireID: result.id })
                return result.id
            })
    }

    // Returns a promise for loading simple isbar forms given questionnaire id.
    // The promise resolves to the bundle returned from the server
    loadSimpleIsbars(questionnaireID) {

        return this.context.client.patient.request(
            "QuestionnaireResponse?questionnaire=" + questionnaireID
        ).then((result) => {
            this.setState({ simpleResponses: result })
            return result
        })
    }

    render() {

        if (this.state.isMenu) {
            return (
                // menu
                <div className="main-menu-container">
                    <h2 className="menu-title">ISBAR Form</h2>
                    <button className="main-menu-button" onClick={() => this.setState({ isSimple: true, isMenu: false })}>
                        Simple ISBAR
                    </button>

                    <button className="main-menu-button" onClick={() => this.setState({ isSimple: false, isMenu: false })}>
                        Complex ISBAR
                    </button>
                </div>
            )
        } else {
            if (this.state.isSimple) {
                return (
                    <IsbarSimpleApp goBack={this.backToMenu.bind(this)} />
                )
            } else {
                return (
                    // <IsbarComplexDevelopment />
                    <IsbarComplexApp />
                )
            }
        }
    }
}

