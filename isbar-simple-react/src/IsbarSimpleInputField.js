import React from "react";
import TextInputField from "./TextInputField";
import { IsbarClientContext } from "./IsbarFhirClient";

// Class for the input field group.
export class ISBARSimpleInputField extends React.Component {
    static contextType = IsbarClientContext;
    constructor(props) {
      super(props);
      this.state = {
        // used true if data is loaded
        loaded: false,
        // would be good if we have a array of question-answer pair.
        // hardcode the questionnaire object?
        labels: [], // labels for the questionnaire
        answers: [] // answers for the questionnaire//
      };
    }

    componentDidMount(){
        //this.setState(client, this.context);
    }
  
    // Load the text fields after the questionnaire and questionnaire responses are loaded.
    render() {
      if (this.state.loaded) {
        return (
          <div class="isbar-input-fields">
            <TextInputField label="field1" heading="Heading" value="Loading..." />
            <TextInputField label="field2" heading="Heading" value="Loading..." />
            <TextInputField label="field3" heading="Heading" value="Loading..." />
  
          </div>
        )
      } else {
        return (
          <div class="isbar-loading">
            Loading...
          </div>
        )
      }
    }
  }
  