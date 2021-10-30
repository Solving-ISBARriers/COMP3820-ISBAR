import React from "react";
import { Assessment } from "./Assessment";
import { Background } from "./Background";
import { Introduction } from "./Introduction";
import { Recommendation } from "./Recommendation";
import { Situation } from "./Situation";
import Patient from "./Patient";

export class IsbarComplexApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <Patient />
        <Introduction />
        <Situation />
        <Background />
        <Assessment />
        <Recommendation />
      </div>
    );
  }
}
