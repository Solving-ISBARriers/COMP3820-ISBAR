// Main class for the main screen. Contains everything.
import React from "react";
import { oauth2 as SMART } from "fhirclient";
import { IsbarClientContext } from "./IsbarFhirClient";
import { IsbarClientProvider } from "./IsbarFhirClient";

export default class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <IsbarClientProvider>
    
            </IsbarClientProvider>

        )
    }
}

