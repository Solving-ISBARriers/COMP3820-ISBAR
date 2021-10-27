import React from "react";
import { IsbarContentField } from "./IsbarContentField";
import { IsbarClientContext } from "../IsbarFhirClient";
import { client } from "fhirclient";

export class IsbarComplexDevelopment extends React.Component {
    
    // client context
    static contextType = IsbarClientContext;

    constructor(props) {
        super(props)
        
        this.state = {
            // state for the app display
            current: "I",
            loaded: false
            // initialise careplan resource?
        }
    }

    componentDidMount(){
        
        const client = this.context.client;
        // search for the careplan related to this patient
        this.LoadCarePlan()
        .then((res) => {
            console.log(res)
            this.setState({loaded: true})
        })
        // load the careplan
    }

    LoadCarePlan(){
        return this.context.client.request("CarePlan?patient=" + this.context.client.patient.id)
    }

    render() {
        if(this.state.loaded){

            return (
            
                <div className="app-complex">
                    <div className="app-content">
                        <IsbarContentField current={this.state.current} />
                    </div>
    
                    <div className="footer">
                        <div className="arrow">&larr;</div>
                        <button className="nav-button" onClick={() => this.setState({ current: "I" })}>I</button>
                        <button className="nav-button" onClick={() => this.setState({ current: "S" })}>S</button>
                        <button className="nav-button" onClick={() => this.setState({ current: "B" })}>B</button>
                        <button className="nav-button" onClick={() => this.setState({ current: "A" })}>A</button>
                        <button className="nav-button" onClick={() => this.setState({ current: "R" })}>R</button>
                        <div className="arrow">&rarr;</div>
                    </div>
    
                </div>
                
            )
        } else{
            return(
            <div>
                Loading complex isbar form...
            </div>)
        }
    }
}
