// React script for input fields
import React from "react";

// This is the class for single unit of text input. this incldes textarea and the label.
// props contain questionnaireresponse object.
// props: 
// 
// 
export default class TextInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (!this.props.item.hasOwnProperty('answer')) {
      // if there is no answer field for current response object
      this.setState({ value: "" });
    } else {
      this.setState({ value: this.props.item.answer[0].valueString });
    }
  }

  handleChange(event) {

    // update the field
    this.setState({ value: event.target.value });
    this.props.handleChange(event, this.props.index);
  }

  // value of this text area
  getValue() {
    return this.state.value
  }

  render() {
    if (this.props.render === false) {
      
      return (<div></div>)
    } else {
      return (
        <div className="simple-textarea-container">
          <div className="simple-textarea-label">
            <label htmlFor={this.props.formID}>{this.props.label}</label>
          </div>

          <div className="simple-textarea-content">
            <textarea
              style={{ resize: "auto" }}
              id={this.props.formID}
              name={this.props.formID}
              placeholder={this.props.placeholder}
              value={this.state.value}
              onChange={this.handleChange} />

          </div>
        </div>
      )
    }
  }
}
