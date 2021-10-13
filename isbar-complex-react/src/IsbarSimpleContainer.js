import React from "react";
import { IsbarClientProvider } from "./IsbarFhirClient";
import { IsbarSimpleApp } from "./IsbarSimpleApp";

export class IsbarSimpleContainer extends React.Component{

    render(){
        return(
            <IsbarClientProvider>
                <IsbarSimpleApp />
            </IsbarClientProvider>
        )
    }
}