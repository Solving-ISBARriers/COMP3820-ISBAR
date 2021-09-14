// Main class for the main screen. Contains everything.
import React from "react";
import { oauth2 as SMART } from "fhirclient";
import { IsbarClientContext } from "./IsbarFhirClient";
import { IsbarClientProvider } from "./IsbarFhirClient";
import { ISBARSimpleInputField } from "./IsbarSimpleInputField";

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <IsbarClientProvider>
                <ISBARSimpleInputField/>
            </IsbarClientProvider>
            // andupdate
            

        )
    }
}

