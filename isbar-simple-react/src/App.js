/*
  Application file for simple ISBAR app.
  Classes can be separated later on.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { FhirClientContext } from "FHIRClient"
import { FhirClientProvider } from "FHIRClient"

/*
 The top application object. Responsible for:
 - Loading patient information
 - Loading questionnaire
 - Loading questionnaire response
 - Initiating the render of other components.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: 1
    }
  }

  render() {
    return (
      <div className="App">
        <FhirClientProvider>
          {/* This is where the patient information will be displayed*/}
          <header className="patient-info">
            <PatientInfoField />
          </header>
          <body>
            <ISBARSimpleInputField />
          </body>
        </FhirClientProvider>

      </div>
    )
  }
}

export default App;
