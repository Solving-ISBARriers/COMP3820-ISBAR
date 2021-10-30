import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { IsbarClientContext } from "../IsbarFhirClient";

// autocomplete that displays values based on fhir search query.
// takes in fields as props
// should return the target resource
export default class FHIRAutocomplete extends React.Component {
    
    static contextType = IsbarClientContext;
    constructor(props){
        super(props)
        this.state = {
            answerSet:[],
            // value for text input
            value: ""
            
        }
    }
    componentDidMount(){
        this.updatAnswerSet()
    }

    updatAnswerSet(){
        var queryString = this.props.resourceName + "?"
        this.props.query.forEach((element, index) => {
            index === 0 
            ? queryString = "?" + queryString 
            : queryString = ":" + queryString
            queryString = queryString + element
        })
        this.context.client.request(queryString)
        .then((res) => {
            const resources = []
            res.entry.forEach(element => {
                // need to give it label property and all that
                // resources.push(element.resource)
            })
            this.setState({answerSet: resources})
        })
    }

    render(){
        return(
            <Autocomplete 
            id={this.props.id}
            options={this.state.answerSet}
            renderInput={(params) => <TextField {...params} label="input"/>}
            />
        )
    }
}