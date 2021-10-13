// Main class for the main screen. Contains everything.
import React from "react";
import { IsbarClientProvider } from "./IsbarFhirClient";
import { IsbarSimpleApp } from "./IsbarSimpleApp";

export default class Home extends React.Component{

    render(){
        return(
            <IsbarClientProvider>
                <IsbarSimpleApp />
            </IsbarClientProvider>


        )
    }
}

