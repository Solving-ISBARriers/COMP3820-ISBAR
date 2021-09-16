// React script for input fields
import React from "react";

// This is the class for single unit of text input. this incldes textarea and the label.
export default class TextInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.setState({value: this.props.value});
    
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="isbar-text-input-container">
        <label>{this.props.heading}</label>
        <textarea
          id={this.props.name}
          rows="4"
          value={this.state.value}
          onChange={this.handleChange} />
      </div>
    )

  }
}
