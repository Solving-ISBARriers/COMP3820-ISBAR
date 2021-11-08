import React from "react";
import { Stack, Grid, Typography, Button } from '@mui/material'
import { getSimpleName } from "./DisplayHelper";
import { IsbarClientContext } from "../IsbarFhirClient";
import FHIRAutocomplete from "./FHIRAutocomplete";
import Patient from "../app-complex/Patient";
import PrintButton from "./PrintButton";

// contains sending and receiving practitioner
// Just gets the author from client context iteself.
// returns a vertical stack of practitioner informatio
export default class FormHeader extends React.Component {

    static contextType = IsbarClientContext;

    constructor(props) {
        super(props)
        this.state = {
            author: null,
            loaded: false,
            // the recipient is managed by the parent component
        }
    }

    componentDidMount() {

        // load the authoring practitioner resource
        this.context.client.request("Practitioner/" + this.context.client.user.id)
            .then((res) => this.setState({ author: res, loaded: true }))
    }

    render() {
        if (this.state.loaded) {
            return (
                <Grid container spacing={4} columnSpacing={2}>
                    <Grid item xs={6}>

                        {/* <Typography variant="h4">Patient</Typography> */}
                        <h3>Patient</h3>
                        <Patient />

                    </Grid>
                    <Grid item xs={6}>

                        <h3>Actions</h3>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <PrintButton
                                    simple={this.props.isSimple}
                                    content={this.props.content}
                                    author={this.state.author}
                                    recipient={this.props.recipient}
                                    subject={this.props.patient}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    size="large"
                                    variant="outlined"
                                    fullWidth={true}
                                    disabled={this.props.published}
                                    onClick={this.props.publishForm}
                                >
                                    Publish
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={6}>

                        {/* <Typography variant="h4">Author</Typography> */}
                        <h3> Author </h3>
                        <p>{getSimpleName(this.state.author.name)}</p>

                    </Grid>
                    <Grid item xs={6}>

                        {/* <Typography variant="h4">Recipient</Typography> */}
                        <h3> Recipient </h3>
                        <FHIRAutocomplete
                            resourceName="Practitioner"
                            searchTerm="name"
                            label=""
                            id="recipientAutocomplete"
                            recipient={this.props.recipient}
                            queries={[]}
                            onSelect={(value) => this.props.onRecipientSelect(value)}
                            getLabel={(resource) => getSimpleName(resource.name)}
                        />

                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Stack>
                    <Typography variant="h4">Loading...</Typography>
                </Stack>
            )
        }
    }
}