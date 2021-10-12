import React from "react";


export class IsbrSimpleInput extends React.Component {

    constructor(props) {
        super(props)

    }
    render() {
        if (this.props.isobar) {
            return (
                <div>
                    <TextInputField
                        index="0"
                        formID="introduction"
                        label="Introduction"
                        placeholder="Introduction"
                        item={this.state.questionnaireResponse.item[0]}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <TextInputField
                        index="1"
                        formID="situation"
                        label="Situation"
                        placeholder="Situation"
                        item={this.state.questionnaireResponse.item[1]}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <TextInputField
                        index="2"
                        formID="Observation"
                        label="Observation"
                        placeholder="Observation"
                        item={this.state.questionnaireResponse.item[2]}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <TextInputField
                        index="3"
                        formID="background"
                        label="Background"
                        placeholder="Background"
                        item={this.state.questionnaireResponse.item[3]}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <TextInputField
                        index="4"
                        formID="assessment"
                        label="Assessment"
                        placeholder="Assessment"
                        item={this.state.questionnaireResponse.item[4]}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <TextAreaField
                        index="5"
                        formID="recommendation"
                        label="Recommendation"
                        placeholder="Recommendation"
                        item={this.state.questionnaireResponse.item[5]}
                        handleChange={this.handleChange.bind(this)}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <TextInputField
                        index="0"
                        formID="introduction"
                        label="Introduction"
                        placeholder="Introduction"
                        item={this.state.questionnaireResponse.item[0]}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <TextInputField
                        index="1"
                        formID="situation"
                        label="Situation"
                        placeholder="Situation"
                        item={this.state.questionnaireResponse.item[1]}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <TextInputField
                        index="3"
                        formID="background"
                        label="Background"
                        placeholder="Background"
                        item={this.state.questionnaireResponse.item[3]}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <TextInputField
                        index="4"
                        formID="assessment"
                        label="Assessment"
                        placeholder="Assessment"
                        item={this.state.questionnaireResponse.item[4]}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <TextAreaField
                        index="5"
                        formID="recommendation"
                        label="Recommendation"
                        placeholder="Recommendation"
                        item={this.state.questionnaireResponse.item[5]}
                        handleChange={this.handleChange.bind(this)}
                    />
                </div>
            )
        }
    }
}