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
        SMART.ready().then(
            (client) => this.setState({ client }),
            (error) => this.setState({ error })
        );
    }
    render() {
        
        return (
            // value is state or none.
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
                            return "Client loaded";
                            //return this.props.children;
                        }
                        console.log("App break1");
                        // client is undefined until SMART.ready() is fulfilled
                        return "Authorizing...";
                    }}
                </IsbarClientContext.Consumer>
            </IsbarClientContext.Provider>
        );
    }
}