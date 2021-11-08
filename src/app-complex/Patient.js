import React from "react";
import { IsbarClientContext } from "../IsbarFhirClient";


function PatientName({ name = [] }) {
    let entry =
        name.find(nameRecord => nameRecord.use === "official") || name[0];
    if (!entry) {
        return <h1>No Name</h1>;
    }
    return <p> Name: <b>{entry.given.join(" ") + " " + entry.family}</b></p>;

}



function PatientBanner(patient) {
    console.log(patient);
    return (
        <div>
            <PatientName name={patient.name} />
            <p >
            Gender: <b>{patient.gender}{" "}</b>
            </p>
            <p>
                DOB: <b>{patient.birthDate}{" "}</b>
            </p>  
            <p>
                Address: <b>{patient.address[0].city}</b>
            </p>   
        </div>
    );
}

export default class Patient extends React.Component {
    static contextType = IsbarClientContext;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            patient: null,
            error: null
        };
    }
    componentDidMount() {
        const client = this.context.client;
        this._loader = client.patient
            .read()
            .then(patient => {
                this.setState({ patient, loading: false, error: null });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }
    render() {
        const { error, loading, patient } = this.state;
        if (loading) {
            return null;
        }
        if (error) {
            return error.message;
        }
        return <PatientBanner {...patient} />;
    }
}
