// This is the file to deal with fhir client
// Client context is created and updated.

import React from "react";
import { oauth2 as SMART } from "fhirclient";

// React client context so it is accessible in differernt parts of code.
// by exporting, it should be accessible from various part of the code.
export const IsbarClientContext = React.createContext({});

export class IsbarClientProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            client: null,
            error: null
        }
    }
    componentDidMount() {
        // Wait until the SMART client is ready, then save the client object as its state.
        SMART.ready().then(
            (client) => this.setState({ client }),
            (error) => this.setState({ error })
        );
    }
    render() {
        
        return (
            // When the client is not loaded, it displays authorizing message.
            // Once the client is loaded, display the child components.
            <IsbarClientContext.Provider value={this.state || {}}>
                <IsbarClientContext.Consumer>
                    {({ client, error }) => {
                        console.log("Load success!");
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
                        return "Authorizing...";
                    }}
                </IsbarClientContext.Consumer>
            </IsbarClientContext.Provider>
        );
    }
}