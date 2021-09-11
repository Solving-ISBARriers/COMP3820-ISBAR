// React script for input fields


// This is the class for single unit of text input.
class TextInputField extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '' }
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({ value: event.target.value });
    }
  
    render() {
      return (
        <div class="isbar-text-input-container">
          <label for={this.props.name}>{this.props.heading}</label>
          <textarea
            id={this.props.name}
            rows="4"
            value={this.state.value}
            onChange={this.handleChange} />
        </div>
      )
  
    }
  }
  
  // Class for the input field group.
  class ISBARSimpleInputField extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // used true if data is loaded
        loaded: false,
        // Array to store questionnaire.. name??
        names: []
      };
    }
  
    // Load the text fields after the questionnaire and questionnaire responses are loaded.
    render() {
      if (this.state.loaded) {
        return (<TextInputField name="THis is the name" heading="Heading" />)
      } else {
        return (
          <div class="ISBAR-loading">
            Loading...
          </div>
        )
      }
    }
  }
  