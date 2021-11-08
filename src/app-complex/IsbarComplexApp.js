import React from "react";
import { Assessment } from "./Assessment";
import { Background } from "./Background";
import { Introduction } from "./Introduction";
import { Recommendation } from "./Recommendation";
import { Situation } from "./Situation";
import { IsbarClientContext } from "../IsbarFhirClient";
import Patient from "./Patient";
import FormHeader from "../common/FormHeader";
import { newCarePlan } from "./ResourceTemplates"
import { Typography, Stack } from "@mui/material";

export class IsbarComplexApp extends React.Component {
    static contextType = IsbarClientContext;

    constructor(props) {
        super(props);
        this.state = {

            loaded: false,
            // questionnaire response object
            carePlan: null,
            // indicates saved state
            published: false,
            // indicates updated state.
            uploaded: true,
            recipient: null,
            // author and patient resources are required for print
            author: null,
            patient: null
        };
        this.onRecipientSelect = this.onRecipientSelect.bind(this)
        this.createNewForm = this.createNewForm.bind(this)
    }

    componentDidMount() {
        console.log(this.props.create)
        // save author
        this.context.client.request("Practitioner/" + this.context.client.user.id)
            .then((res) => this.setState({ author: res }, console.log(res)))
        this.context.client.patient.read()
            .then((res) => this.setState({ patient: res }))
        if (this.props.create) {

            // create new resource and store that 
            // new form targets to current practitiner
            const newForm = newCarePlan(
                this.context.client.patient.id,
                this.context.client.user.id
            )
            // always create a new form when approached this way
            this.setState({ carePlan: newForm, loaded: true })
        } else {

            // note we are not directly modifying the file in parent.
            // parent will fetch the updated version via database query
            this.context.client.request("CarePlan/" + this.props.formID)
                .then((res) => {
                    // res is the questionnaire object
                    console.log(res)
                    this.setState({ carePlan: res })
                })

            // .then((res) => {
            //     // res is practitioner resource of recipient practitioner
            //     this.setState({ recipient: res, loaded: true, published: true })

            // })
        }
    }


    createNewForm() {
        // upload the new form
        if (!this.state.published) {
            this.context.client.create(this.state.carePlan)
                .then((res) => {
                    console.log(res)
                    this.setState({ carePlan: res, published: true })
                })
        }
    }
    // gets triggered when recipient is selected
    // value is the value from the autocomplete
    onRecipientSelect(value) {

        if (!value) {
            return
        }
        // reviewer is the name of extension
        const newContent = this.state.carePlan
        // console.log(newContent)
        if (newContent.contributor) {
            if (newContent.contributor[0].hasOwnProperty('reference')) {
                newContent.contributor[0].reference = "Practitioner/" + value.id
            } else {
                newContent.contributor[0] = {
                    reference: "Practitioner/" + value.id
                }
            }
        } else {
            newContent.contributor = [{
                reference: "Practitioner/" + value.id
            }]
        }
        this.setState({ carePlan: newContent, uploaded: false })
    }


    render() {
        if (this.state.loaded) {
            return (
                <div className="app-complex">
                    <div className="container">
                        <Stack spacing={3}>
                        <Typography variant="h3">Introduction</Typography>
                        {/* <h2 className="section-title">Introduction</h2> */}
                        <Introduction 
                        recipient={this.state.recipient}
                        carePlan={this.state.carePlan}
                        patient={this.state.patient}
                        published={this.state.published}
                        onRecipientSelect={(value) => this.onRecipientSelect(value)}
                        publishForm={this.createNewForm}
                        />

                        <Typography variant="h3">Situation</Typography>
                        {/* <h2 className="section-title">Situation</h2> */}
                        <Situation />
                        <Typography variant="h3">Background</Typography>
                        {/* <h2 className="section-title">Background</h2> */}
                        <Background />
                        <Typography variant="h3">Assessment</Typography>
                        {/* <h2 className="section-title">Assessment</h2> */}
                        <Assessment />
                        <Typography variant="h3">Recommendation</Typography>
                        {/* <h2 className="section-title">Recommendation</h2> */}
                        <Recommendation />
                        </Stack>

                    </div>


                </div>

            )

        } else {
            return (

                <div>Loading.</div>
            )
        }
    }
}
