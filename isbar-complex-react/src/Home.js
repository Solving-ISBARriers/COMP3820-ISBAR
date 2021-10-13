// Main class for the main screen. Contains everything.
import React from "react";
import { IsbarClientProvider } from "./IsbarFhirClient";
import { IsbarSimpleApp } from "./IsbarSimpleApp";
import { BrowserRouter, Link } from "react-router-dom";

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

    render() {

        if (this.state.isMenu) {
            console.log("Menu")
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
            console.log("App")
            if (this.state.isSimple) {
                return (
                    <IsbarSimpleApp />
                )
            } else {
                return (
                    <IsbarSimpleApp />
                )
            }
        }
    }
}

