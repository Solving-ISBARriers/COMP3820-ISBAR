import React from "react";
import { Assessment } from "./Assessment";
import { Background } from "./Background";
import { Introduction } from "./Introduction";
import { Recommendation } from "./Recommendation";
import { Situation } from "./Situation";

export class IsbarComplexApp extends React.Component {

    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Introduction />
                <Situation />
                <Background />
                <Assessment />
                <Recommendation />
            </div>
        )
    }
}
