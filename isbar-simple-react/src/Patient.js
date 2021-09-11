// Patient-related script
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { FhirClientContext } from "FHIRClient"
import { FhirClientProvider } from "FHIRClient"

// Class for patient information. 
class PatientInfoField extends React.Component {

    static contextType = FHIRClientContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            patient: null,
            error: null
        }
    }
    componentDidMount() {
        const client = this.context.client;
    }

    render() {
        return
    }
}