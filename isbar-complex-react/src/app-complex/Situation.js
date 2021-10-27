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
        console.log("Patient id Test" + this.context.client.patient.id);       
        console.log("Patient id Test2" + client.request(`Patient/${this.context.client.patient.id}`));
        console.log("Patient name" + <Patient />) 
    }    
      
    
    


    
    
    render(){
        return(
            <div  class="container  mx-auto px-10 sm:px-0 max-w-7xl py-50">
                <h2 class="text-2xl font semi-bold font-sans">Patient Details</h2>
                <h2 id="patient"></h2>
                <Patient />
                <mb-fhir-form class="flex flex gap-3" >
                    <mb-context path="resourceType" data="Patient" ></mb-context>                    
                    <mb-input path path="name[0].given" label="Name" />                   
                    
                </mb-fhir-form>

                

            </div>
        )
    }
}
