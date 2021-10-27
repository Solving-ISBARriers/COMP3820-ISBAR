import React from "react";
import { IsbarContentField } from "./IsbarContentField";

export class IsbarComplexApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // state for the app display
            current: "I"
        }
    }
    render() {
        return (
            <div className="app-complex">
                <div className="app-content">

                <IsbarContentField current={this.state.current}/>
                </div>

                <div className="footer">
                    <div className="arrow">&larr;</div>
                    
                    <button className="nav-button"  onClick={() => this.setState({current:"I"})}>I</button>
                    <button className="nav-button"  onClick={() => this.setState({current:"S"})}>S</button>
                    <button className="nav-button"  onClick={() => this.setState({current:"B"})}>B</button>
                    <button className="nav-button"  onClick={() => this.setState({current:"A"})}>A</button>
                    <button className="nav-button"  onClick={() => this.setState({current:"R"})}>R</button>
                    <div className="arrow">&rarr;</div>
                </div>

            </div>

        )
    }
}
