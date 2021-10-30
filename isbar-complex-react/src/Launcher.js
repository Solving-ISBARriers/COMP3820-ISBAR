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
            scope: "launch openid fhirUser patient/*.read patient/*.write",
            redirectUri: "/isbar-app",
            iss:
                "https://launch.smarthealthit.org/v/r3/sim/" +
                "eyJoIjoiMSIsImIiOiJmMDQ2MjkzNi1lYjRiLTRkYT" +
                "EtYjQ1YS1mYmQ5NmViZjhjY2IiLCJlIjoic21hcnQt" +
                "UHJhY3RpdGlvbmVyLTcxNjE0NTAyIn0/fhir",
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