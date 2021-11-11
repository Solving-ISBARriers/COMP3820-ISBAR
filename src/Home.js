// Main class for the main screen. Contains everything.
import React from "react";
import { IsbarClientProvider } from "./IsbarFhirClient";
import { IsbarSimpleApp } from "./app-simple/IsbarSimpleApp";
import { IsbarComplexApp } from "./app-complex/IsbarComplexApp";
import { IsbarComplexDevelopment } from "./app-complex/IsbarComplexDevelopment";
import { IsbarClientContext } from "./IsbarFhirClient";
import { Stack, Box, Grid, Accordion, AccordionSummary, Typography, Button, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SimpleHistory } from "./SimpleHistory";

export default class Home extends React.Component {

    componentWillMount(){
        console.log("Home will mount")
    }
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
            // id of current simple form
            simpleFormID: null
        }
        this.editSimpleForm = this.editSimpleForm.bind(this)
    }
    componentDidMount() {

        // Load questionnaire and simple isbar forms for this patient
        const loadSimple = this.loadQuestionnaireID()
            // .then(() => this.createSimpleIsbar())
            .then((res) => this.loadSimpleIsbars(res))
            .then(() => this.setState({ loaded: true }))
        this.context.client.request("ValueSet" ).then(console.log)
        this.context.client.patient.request("Observation").then(console.log)
        
        // wait till all promises resolved
        Promise.all([loadSimple]).then(() => console.log("all loaded"))
    }

    backToMenu() {
        // change the statte to come back to menu, and start loading
        this.setState({ isMenu: true, loaded: false })
        this.loadSimpleIsbars(this.state.questionnaireID)
            .then(() => this.setState({ loaded: true }))

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
            // this was not used because it caused corruption, and the data had to be loaded again.
            { resolveReferences: ["author"] }
        ).then((result) => {
            // console.log(result)
            // console.log(questionnaireID)
            this.setState({ simpleResponses: result })
            // console.log(result)
            return result
        }).catch(console.error)
    }

    // opens existing form to edit. id is the questionnaireResponse id.
    editSimpleForm(id) {
        // the simple form should be passed as a prop to child object?
        const response = this.state.simpleResponses.entry.filter((element) => element.resource.id === id)
        console.log(response)
        console.log(response[0].resource.id)
        // search the server for questionnaireResponse with same id
        // The resource is retrieved again rather than being set from the bundle
        // because bundle contains resolved references, it results in corruption
        this.setState({ simpleFormID: response[0].resource.id, isMenu: false, isSimple: true, createNew: false })
    }

    // What a mess! requires cleaning..
    render() {

        if (this.state.loaded && this.state.isMenu) {
            // this is the menu. 
            return (
                
                <Stack spacing={5} sx={{ padding: '3%' }}>

                    <Typography variant='h1'
                        sx={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '50px'
                        }}>
                        ISBAR Handover Form
                    </Typography>
                    <Accordion defaultExpanded={false}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography variant='h5'
                                sx={{ width: '80%' }}>
                                Simple ISBAR handover forms
                            </Typography>

                            <Button
                                size='medium'
                                variant='outlined'
                                sx={{ width: '18%', marginRight: '2%' }}
                                onClick={() => this.setState({ createNew: true, isMenu: false, isSimple: true })}
                            >
                                Create
                            </Button>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleHistory
                                data={this.state.simpleResponses}
                                editForm={(id) => this.editSimpleForm(id)}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded={false}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography variant='h5'
                                sx={{ width: '80%' }}>
                                Complex ISBAR handover forms
                            </Typography>

                            <Button
                                size='medium'
                                variant='outlined'
                                sx={{ width: '18%', marginRight: '2%' }}
                                onClick={() => this.setState({ createNew: true, isMenu: false, isSimple: false })}
                            >
                                Create
                            </Button>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleHistory
                                data={null}
                                editForm={(id) => this.editSimpleForm(id)}
                            />
                        </AccordionDetails>
                    </Accordion>

                </Stack>
                
            )
        } else if (this.state.loaded && this.state.isSimple) {

            return (
                <IsbarSimpleApp
                    goBack={this.backToMenu.bind(this)}
                    formID={this.state.simpleFormID} // this is the response object passed.
                    create={this.state.createNew}
                    questionnaireID={this.state.questionnaireID}
                />
            )
        } else if (this.state.loaded && !this.state.isSimple) {
            return (
                // <IsbarComplexDevelopment />
                <IsbarComplexApp 
                create={this.state.createNew}
                />
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



