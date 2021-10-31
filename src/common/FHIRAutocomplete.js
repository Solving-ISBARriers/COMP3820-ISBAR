import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { IsbarClientContext } from "../IsbarFhirClient";

// autocomplete that displays values based on fhir search query.
// takes in fields as props
// should return the target resource
// onSelect prop triggered when there is a value selection
// getLabel prop is to retrieve relevant label from the resource
export default class FHIRAutocomplete extends React.Component {

    static contextType = IsbarClientContext;
    constructor(props) {
        super(props)
        this.state = {
            answerSet: [],
            // value from select
            value: this.props.initialValue,
            // input is what is entered
            input: "",
            // this displays loading when updating the answerset
            loading: true,
            timeout: null,
            delay: 500
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        this.updatAnswerSet("")
        // console.log(this.state.value)
        // this.setState({value: this.props.defaultValue})
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeout)
    }

    // update the answer set by searching the fhir server with given input
    // input is taken as an argument because this.state.input may cause errors
    // due to setState not being synchronous
    updatAnswerSet(input) {
        var queryString = this.props.resourceName
        var inputString = ""
        const inputArr = input.split(" ")
        inputArr.forEach((element => {

            inputString = inputString + this.props.searchTerm + "=" + element + "&"
        }))
        // check queries
        if(this.props.queries && this.props.queries[0]){
            this.props.queries.forEach((element, index) => {
                // append the search terms
                index === 0
                    ? queryString = queryString + "?" + element
                    : queryString = queryString + "&" + element
            })
            // this searches our value
            queryString = queryString + "&" + inputString
        } else{
            queryString = queryString + "?" + inputString
        }
        // console.log(queryString)
        this.context.client.request(queryString)
            .then((res) => {
                const resources = []
                if(res.total > 0){
                    res.entry.forEach(element => {
                        // console.log(element)
                        // need to give it label property and all that
                        resources.push({label: this.props.getLabel(element.resource), id:element.resource.id})
                        // resources.push(element.resource)
                    })

                }
                // console.log(resources)
                this.setState({ answerSet: resources, loading: false })
            })
        
    }

    handleInputChange(event, newInput) {
        console.log(this.state.loading)
        this.setState({ input: newInput, loading: true })
        
        clearTimeout(this.state.timeout)
        this.setState({

            timeout: setTimeout(() => { this.updatAnswerSet(newInput) },
                this.state.delay)
        })

    }

    render() {
        return (
            <Autocomplete
                disablePortal
                autoSelect={true}
                value={this.state.value}
                onChange={(event, newValue) => {
                    this.setState({ value: newValue })
                    this.props.onSelect(newValue)
                    console.log(newValue)
                }}
                input={this.state.input}
                onInputChange={(event, newInput) => this.handleInputChange(event, newInput)}
                id={this.props.id}
                options={ this.state.answerSet }
                renderInput={(params) => 
                    <TextField {...params}
                        label={this.props.label}
                        helperText={this.state.loading? "Loading..." : ""}
                        sx={{
                            borderColor: '#ffffff'
                        }}
                        // variant="standard"
                        // helperText={this.props.helperText}
                    />
                }
            />
        )
    }
}