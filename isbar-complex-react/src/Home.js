// Main class for the main screen. Contains everything.
import React from "react";
import { IsbarClientProvider } from "./IsbarFhirClient";
import { IsbarSimpleApp } from "./app-simple/IsbarSimpleApp";
import { IsbarComplexApp } from "./app-complex/IsbarComplexApp";
import { IsbarComplexDevelopment } from "./app-complex/IsbarComplexDevelopment";
import { IsbarClientContext } from "./IsbarFhirClient";
import { Stack, Box, Container, Accordion, AccordionSummary, Typography, Button, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SimpleHistory } from "./SimpleHistory";

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

    // include client 
    static contextType = IsbarClientContext;
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            isMenu: true,
            isSimple: true,
            questionnaireID: null,
            simpleResponses: null,
            createNew: false,

        }
    }
    componentDidMount() {

        // Load questionnaire and simple isbar forms for this patient
        const loadSimple = this.loadQuestionnaireID()
            // .then(() => this.createSimpleIsbar())
            .then((res) => this.loadSimpleIsbars(res))
            .then(() => this.setState({ loaded: true }))
        this.context.client.request("Practitioner/e443ac58-8ece-4385-8d55-775c1b8f3a37").then(console.log)
        // wait till all promises resolved
        Promise.all([loadSimple]).then(() => console.log("all loaded"))
    }

    backToMenu() {

        // change the statte to come back to menu
        this.setState({ isMenu: true })
    }

    // Returns a promise that loads questionnaire ID using questionnaire template
    // updates the state for questionnaire id
    // the promise resolves to questionnaire id
    loadQuestionnaireID() {

        // make server calls 
        return this.context.client.request("Questionnaire?name=" + isbarQuestionnaire.name)
            .then((response) => {

                if (response.total === 0) {
                    // there are no questionnaire object - create one
                    return this.context.client.create(isbarQuestionnaire);
                } else {
                    // return the existing questionnaire to be saved
                    return response.entry[0].resource;
                }
            }).then((result) => {
                // console.log(result.id)
                // save the questionnaire ID in current component state
                this.setState({ questionnaireID: result.id })
                // return the questionnaire id. This allows response searching without
                // having to wait for setState to be executed
                return result.id
            }).catch(console.error)
    }

    // Returns a promise for loading simple isbar forms given questionnaire id.
    // The promise resolves to the bundle returned from the server
    loadSimpleIsbars(questionnaireID) {

        return this.context.client.request(
            // currently, retrieves all responses about this patient
            "QuestionnaireResponse?questionnaire=" + questionnaireID
            + "&patient=Patient/" + this.context.client.patient.id,
            // resolves references connected to questionnaire
            { resolveReferences: ["author", "extension[1].valueReference"] }
        ).then((result) => {
            // console.log(result)
            // console.log(questionnaireID)
            this.setState({ simpleResponses: result })
            // console.log(result)
            return result
        }).catch(console.error)
    }

    // What a mess! requires cleaning..
    render() {

        if (this.state.loaded && this.state.isMenu) {
            return (
                <div>
                    <Box sx={{
                        padding: '3%'
                    }}>
                        {/* Heading needs fixing */}
                        <Typography sx={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '30px'
                        }}>
                            ISBAR Handover Form
                        </Typography>

                        {/* Stack requires positioning */}
                        <Stack spacing={2}
                            sx={{

                            }}
                        >
                            <Accordion defaultExpanded={false}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '70%', flexShrink: 0 }}>
                                        Simple ISBAR handover forms
                                    </Typography>
                                    <Button
                                        onClick={() => this.setState({ createNew: true, isMenu: false, isSimple: true })}
                                    >
                                        Create new
                                    </Button>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SimpleHistory data={this.state.simpleResponses} />
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Box>

                    <button className="main-menu-button" onClick={() => this.setState({ isSimple: false, isMenu: false })}>
                        Complex ISBAR
                    </button>
                </div>
            )
        } else if (this.state.loaded && this.state.isSimple) {

            return (
                <IsbarSimpleApp
                    goBack={this.backToMenu.bind(this)}
                    content={"content"} // this is the response object passed.
                    create={this.state.createNew}
                    questionnaireID={this.state.questionnaireID}
                />
            )
        } else if (this.state.loaded && !this.state.isSimple) {
            return (
                // <IsbarComplexDevelopment />
                <IsbarComplexApp />
            )
        } else {
            return (<div>Loading</div>)

        }
    }
}



const isbarQuestionnaire = {
    "resourceType": "Questionnaire",
    "title": "questionnaireTitle",
    "name": "isbar-simple",
    "status": "active",
    // Introduction
    "item": [{
        "linkid": "1",
        "text": "I:Identify",
        "type": "text" // free text
    },
    // Situation
    {
        "linkid": "2",
        "text": "S:Situation",
        "type": "text" // free text
    },
    // Observation. Enable option is not included, because it could be handled by js.
    {
        "linkid": "3",
        "text": "O:Observation",
        "type": "text" // free text
    },
    // Background
    {
        "linkid": "4",
        "text": "B:Background",
        "type": "text" // free text
    },
    // assessment
    {
        "linkid": "5",
        "text": "A:Assessment",
        "type": "text" // free text
    },
    // Recommendation
    {
        "linkid": "6",
        "text": "R:Recommendation",
        "type": "text" // free text
    }]
}



