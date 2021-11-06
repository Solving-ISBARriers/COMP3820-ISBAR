// Launcher file for the app. 
import React from "react";
import { oauth2 as SMART } from "fhirclient";

/**
 * Typically the launch page is an empty page with a `SMART.authorize`
 * call in it. This isbased on the example code from:
 * https://codesandbox.io/s/fhir-client-react-react-router-context-0q3n8?file=/src/components/Launcher.js
 * 
 *
 */
export default class Launcher extends React.Component {
    
    /**
     * This is configured to make a Standalone Launch, just in case it
     * is loaded directly. An EHR can still launch it by passing `iss`
     * and `launch` url parameters
     */
    componentDidMount() {

        SMART.authorize({
            clientId: "my-client-id",
            scope: "launch launch/patient openid fhirUser patient/*.read patient/*.write",
            // redirectURL for github deployment
            // redirectUri: "https://solving-isbarriers.github.io/COMP3820-ISBAR/#/isbar-app",
            // RedirectURL for the development version
            redirectUri: "#/isbar-app",
            iss: 'https://launch.smarthealthit.org/v/r4/sim/eyJoIjoiMSIsImoiOiIxIn0/fhir',
            // Redirect to main screen.
            
            completeInTarget: true
        });
    }
    
    render() {
        return (
            <div className="loading-container">
                Launching the ISBAR handover form..
            </div>
            )
    }
}