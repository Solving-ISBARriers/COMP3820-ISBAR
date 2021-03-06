// React script for input fields
import React from "react";

// This is the class for single unit of text input. this incldes textarea and the label.
// props contain questionnaireresponse object.
// props:
//
//
export default class TextAreaField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.item.hasOwnProperty("answer")) {
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
    return this.state.value;
  }

  render() {
    return (
      <div className="row">
        <div className="col-25">
          <label htmlFor={this.props.formID}>{this.props.label}</label>
        </div>

        <div className="col-75">
          <textarea
            style={{ resize: "none" }}
            id={this.props.formID}
            name={this.props.formID}
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
