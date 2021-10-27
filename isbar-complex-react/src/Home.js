// Main class for the main screen. Contains everything.
import React from "react";
import { IsbarClientProvider } from "./IsbarFhirClient";
import { IsbarSimpleApp } from "./app-simple/IsbarSimpleApp";
import { IsbarComplexApp } from "./app-complex/IsbarComplexApp";
import { IsbarComplexDevelopment } from "./app-complex/IsbarComplexDevelopment";

export default class Home extends React.Component {

    render() {
        return (
            <IsbarClientProvider>
                <AppController />
            </IsbarClientProvider>
        )
    }
}

class AppController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isMenu: true,
            isSimple: true
        }
    }

    backToMenu(){
        this.setState({isMenu: true})
        
    }

    render() {

        if (this.state.isMenu) {
            return (
                // menu
                <div className="main-menu-container">
                    <h2 className="menu-title">ISBAR Form</h2>
                    <button className="main-menu-button" onClick={() => this.setState({ isSimple: true, isMenu: false })}>
                        Simple ISBAR
                    </button>

                    <button className="main-menu-button"onClick={() => this.setState({ isSimple: false, isMenu: false })}>
                        Complex ISBAR
                    </button>
                </div>
            )
        } else {
            if (this.state.isSimple) {
                return (
                    <IsbarSimpleApp goBack={this.backToMenu.bind(this)}/>
                )
            } else {
                return (
                    <IsbarComplexDevelopment />
                )
            }
        }
    }
}

