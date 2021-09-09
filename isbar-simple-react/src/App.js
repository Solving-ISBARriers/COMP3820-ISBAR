import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class TextInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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

class ISBARSimpleInputField extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <TextInputField name="THis is the name" heading="Heading"/>
    )

  }
}

class PatientInfoField extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){

  }
}

function App() {
  return (
    <div className="App">
      {/* This is where the patient information will be displayed*/}
      <header className="patient-info">
        <h2>Patient name</h2>
        <ISBARSimpleInputField />
      </header>

    </div>
  );
}



export default App;
