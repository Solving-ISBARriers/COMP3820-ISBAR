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
            redirectUri: "./isbar-simple",
            // Redirect to main screen.
            
            // WARNING: completeInTarget=true is needed to make this work
            // in the codesandbox frame. It is otherwise not needed if the
            // target is not another frame or window but since the entire
            // example works in a frame here, it gets confused without
            // setting this!
            completeInTarget: true
        });
    }
    
    render() {
        return "Launching...";
    }
}