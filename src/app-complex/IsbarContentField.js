import React from "react";
import { Assessment } from "./Assessment";
import { Background } from "./Background";
import { Introduction } from "./Introduction";
import { Recommendation } from "./Recommendation";
import { Situation } from "./Situation";

export class IsbarContentField extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {

        switch (this.props.current) {
            case "I":
                return <Introduction />
            case "S":
                return <Situation />
            case "B":
                return <Background />
            case "A":
                return <Assessment />
            case "R":
                return <Recommendation />
            default: 
                // fail safe
                return <Introduction />


        }
    }
}
