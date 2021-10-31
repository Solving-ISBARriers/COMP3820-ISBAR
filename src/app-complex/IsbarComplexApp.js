import React from "react";
import { Assessment } from "./Assessment";
import { Background } from "./Background";
import { Introduction } from "./Introduction";
import { Recommendation } from "./Recommendation";
import { Situation } from "./Situation";
import Patient from "./Patient";

export class IsbarComplexApp extends React.Component {

    render() {
        return (
            <div className="app-complex">
                <div className="container">
                    <Patient />
                    <h2 className="section-title">Introduction</h2>
                    <Introduction />
                    <h2 className="section-title">Situation</h2>
                    <Situation />
                    <h2 className="section-title">Background</h2>
                    <Background />
                    <h2 className="section-title">Assessment</h2>
                    <Assessment />
                    <h2 className="section-title">Recommendation</h2>
                    <Recommendation />

                </div>


            </div>

        )
    }
}
