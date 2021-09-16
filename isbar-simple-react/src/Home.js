// Main class for the main screen. Contains everything.
import React from "react";
import { IsbarClientProvider } from "./IsbarFhirClient";
import { IsbarSimpleInputField } from "./IsbarSimpleInputField";

export default class Home extends React.Component{

    render(){
        return(
            <IsbarClientProvider>
                <IsbarSimpleInputField/>
            </IsbarClientProvider>
            // andupdate
            

        )
    }
}

