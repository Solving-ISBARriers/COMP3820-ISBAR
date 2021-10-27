import React from "react";
import '@shoelace-style/shoelace/dist/themes/light.css';
import 'medblocks-ui';
import { IsbarClientContext } from "../IsbarFhirClient";
import Patient from "./Patient";



export class Situation extends React.Component {

    static contextType = IsbarClientContext;
    

    constructor(props){
        super(props)
        this.state = {
            // used true if data is loaded
            loaded: false,
            error: null,
            // true if questionnaireResponse exists
            responseExist: false,
            patient: null,
            // questionnaire object that will be stored or created
            questionnaire: null,
            // questionnaire response object
            questionnaireResponse: null,
            // turns true if it's isobar
            isIsobar: false,
            // indicates saved state
            saveState: "edited",
            // type of current form
            formState: "ISOBAR"
            // would be good if we have a array of question-answer pair.
          };            
        
    }

   

    
    componentDidMount() {
        // load client from the client context
        const client = this.context.client;
         
    }      
    


    
    
    render(){
        return(
            <div  class="container  mx-auto px-10 sm:px-0 max-w-7xl py-10">
                <h2 class="text-3xl font semi-bold font-sans">Situation</h2>
                <Patient />
                <mb-fhir-form class="flex flex-col gap-6 m-5 " onClick={this.handleSubmit} >               
                    <mb-context path="resourceType" data="Patient"> </mb-context>
                    <mb-date label="Date of transfer"> </mb-date>
                    <mb-input  path="name[0].given" label="Patient Status" class=" "> </mb-input>
                    <sl-textarea size="medium" resize="auto" label="Principal diagnosis/problem"></sl-textarea>
                    <sl-textarea size="medium" resize="auto" label="Other diagnosis/problem"></sl-textarea>
                    <mb-input path="name[0].given" label="Reason for transfer"></mb-input>
                    <div class="table-container">
                        <h3>Observations</h3>
                        <table>
                            <tr>
                                <th>Airway</th>
                                <th>Breathing</th>
                                <th>Skin Colour</th>
                                <th>Mental</th>
                                <th>Behaviour</th>
                            </tr>
                            <tr>
                                <td><sl-checkbox>Patent</sl-checkbox></td>
                                <td><sl-checkbox>Unremarkable</sl-checkbox></td>
                                <td><sl-checkbox>Unremarkable</sl-checkbox></td>
                                <td><sl-checkbox>Cognitive impairment</sl-checkbox></td>
                                <td><sl-checkbox>Verbal aggression</sl-checkbox></td>
                            </tr>
                            <tr>
                                <td><sl-checkbox>Compromised</sl-checkbox></td>
                                <td><sl-checkbox>Shallow</sl-checkbox></td>
                                <td><sl-checkbox>Pale</sl-checkbox></td>
                                <td><sl-checkbox>Depression</sl-checkbox></td>
                                <td><sl-checkbox>Harm to others</sl-checkbox></td>
                            </tr>
                            <tr>
                                <td><sl-checkbox>Ventilated</sl-checkbox></td>
                                <td><sl-checkbox>Deep</sl-checkbox></td>
                                <td><sl-checkbox>Flushed</sl-checkbox></td>
                                <td><sl-checkbox>Dementia</sl-checkbox></td>
                                <td><sl-checkbox>Harm to self</sl-checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><sl-checkbox>Rapid</sl-checkbox></td>
                                <td><sl-checkbox>Mottled</sl-checkbox></td>
                                <td><sl-checkbox>Delirium</sl-checkbox></td>
                                <td><sl-checkbox>Sleep disturbance</sl-checkbox></td>
                            </tr> 
                            <tr>
                                <td></td>
                                <td><sl-checkbox>Slow</sl-checkbox></td>
                                <td><sl-checkbox>Cyanotic</sl-checkbox></td>
                                <td><sl-checkbox>Delirium</sl-checkbox></td>
                                <td><sl-checkbox>Sleep disturbance</sl-checkbox></td>
                            </tr> 
                            <tr>
                                <td></td>
                                <td><sl-checkbox>Audible Wheeze</sl-checkbox></td>
                                <td></td>
                            </tr>                         
                            
                        </table>
                    </div>

                    
                    <mb-submit>
                        <sl-button type="info">Submit</sl-button>
                    </mb-submit>                      
                    
                </mb-fhir-form>

                

            </div>
        )
    }
}
