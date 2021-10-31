/*
  Application file for simple ISBAR app.
  Classes can be separated later on.
  the react-router-dom module had to be installed with:
  npm install -S react-router-dom
*/
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Launcher from './Launcher';
import Home from "./Home"
import './App.css';






/*
 The top application object. Responsible for:
 - Loading patient information
 - Loading questionnaire
 - Loading questionnaire response
 - Initiating the render of other components.
 */
class App extends React.Component {

  render() {
    return (
      // This runs the launcher first, which redirects to the main screen.
      <BrowserRouter>
        <Switch>
          {/* The actual app */}
          <Route path="/isbar-app" component={Home} exact/>

          {/* Launcher for smart app */}
          <Route path="/" component={Launcher} exact />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
