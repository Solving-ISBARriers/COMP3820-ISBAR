import React from "react";
import SimpleTextArea from "../common/SimpleTextArea";

export class Recommendation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: "",
        }
    }

    updateField(value) {
        this.setState({ value: value })
    }

    render() {
        return (
            <div className="container">
                <h3>Recommendation</h3>
                <SimpleTextArea
                    initialValue={""}
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Recommendation"
                    label=""
                    visible={true}
                    updateField={(value) => this.updateFieldValue(value)}
                />
                <h3>Medication Request</h3>
                <SimpleTextArea
                    initialValue={""}
                    fullWidth
                    multiline
                    rows={1}
                    placeholder="Medication"
                    label=""
                    visible={true}
                    updateField={(value) => this.updateFieldValue(value)}
                />
                <h3>Service Request</h3>
                <SimpleTextArea
                    initialValue={""}
                    fullWidth
                    multiline
                    rows={1}
                    placeholder="Service"
                    label=""
                    visible={true}
                    updateField={(value) => this.updateFieldValue(value)}
                />
            </div>
        )
    }
}
