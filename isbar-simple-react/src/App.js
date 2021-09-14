/*
  Application file for simple ISBAR app.
  Classes can be separated later on.
  the react-router-dom module had to be installed with:
  npm install -S react-router-dom
*/
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Launcher from './Launcher';
import Home from "./Home"



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
  }

  render() {
    return (
      // This runs the launcher first, which redirects to the main screen.
      <BrowserRouter>
        {/* The actual app */}
        <Route path="/isbar-simple" component={Home} />
        {/* Launcher for smart app */}
        <Route path="/" component={Launcher} exact />
      </BrowserRouter>
    )
  }
}

export default App;
