import React from "react";
import '@shoelace-style/shoelace/dist/themes/light.css';
import 'medblocks-ui';



export class Situation extends React.Component {

    constructor(props){
        super(props)      
        
    }

    patient() {
        // load client from the client context
        const client = this.context.client;


        client.patient.read();
        console.log(client.patient.read);
        console.log("patient read")   
        
          };
      
    
    render(){
        return(
            <div  class="container  mx-auto px-10 sm:px-0 max-w-7xl py-50">
                <h2 class="text-2xl font semi-bold font-sans">Patient Details</h2>
                <h2 id="patient"></h2>
                <mb-fhir-form class="flex flex gap-3" >
                    <mb-context path="resourceType" data="Patient" ></mb-context>                    
                    <mb-input path path="name[0].given" label="Name" />                   
                    
                </mb-fhir-form>

                

            </div>
        )
    }
}
