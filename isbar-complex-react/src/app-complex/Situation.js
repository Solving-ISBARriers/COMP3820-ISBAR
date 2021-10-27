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
                    <mb-date label="Date of transfer" /> 
                    <mb-input  path="name[0].given" label="Patient Status" class=" "> </mb-input>
                    <sl-textarea size="medium" resize="auto" label="Principal diagnosis/problem"></sl-textarea>
                    <sl-textarea size="medium" resize="auto" label="Other diagnosis/problem"></sl-textarea>
                    <mb-input path="name[0].given" label="Reason for transfer"></mb-input>
                    <div class="table-container">
                        <h3>Airway</h3>
                        <sl-checkbox>Patent</sl-checkbox>
                        <sl-checkbox>Compromised</sl-checkbox>
                        <sl-checkbox>Ventilated</sl-checkbox>
                    </div>

                    
                    <mb-submit>
                        <sl-button type="info">Submit</sl-button>
                    </mb-submit>                      
                    
                </mb-fhir-form>

                

            </div>
        )
    }
}
