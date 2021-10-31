import React from "react";
import SimpleTextArea from "../common/SimpleTextArea";

export class Recommendation extends React.Component {

    constructor(props) {
        super(props)
        this.state ={
            value: "",
        }
    }

    updateField(value){
        this.setState({value: value})
    }

    render() {
        return (
            <SimpleTextArea
              initialValue={""}
              placeholder="Recommendation"
              label="Recommendation"
              visible={true}
              updateField={(value) => this.updateFieldValue(value)}
            />
        )
    }
}
