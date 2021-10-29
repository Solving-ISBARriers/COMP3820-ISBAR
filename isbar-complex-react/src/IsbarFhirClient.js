// This is the file to deal with fhir client
// Client context is created and updated.

import React from "react";
import { client, oauth2 as SMART } from "fhirclient";

// React client context so it is accessible in differernt parts of code.
// by exporting, it should be accessible from various part of the code.
export const IsbarClientContext = React.createContext({});

export class IsbarClientProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            client: null, // client object
            error: null, // error message
            simpleForms: null, // simple isbar forms (questionnaireResponses)
            complexForms: null // complex isbar forms ()
        }
    }

    componentDidMount() {
        // Wait until the SMART client is ready, then save the client object as its state.
        SMART.ready().then(
            (client) => this.setState({ client }),
            (error) => this.setState({ error })
        )
        // Load the relevant resources
    }

    render() {

        return (
            // When the client is not loaded, it displays authorizing message.
            // Once the client is loaded, display the child components.
            <IsbarClientContext.Provider value={this.state || {}}>
                <IsbarClientContext.Consumer>
                    {({ client, error }) => {
                        console.log("Client");
                        console.log(client);
                        // any error that SMART.ready() may have been rejected with
                        if (error) {
                            return <pre>{error.stack}</pre>;
                        }

                        // if client is already available render the subtree (patient and input in this case.)
                        if (client) {

                            return this.props.children;
                        }
                        // client is undefined until SMART.ready() is fulfilled. show loading message
                        return (
                            <div className="loading-container">
                                Launching the ISBAR handover form..
                            </div>
                        )
                    }}
                </IsbarClientContext.Consumer>
            </IsbarClientContext.Provider>
        );
    }
}