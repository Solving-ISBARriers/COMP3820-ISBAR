// React script for input fields
import React, { useRef } from "react";

// This is the class for single unit of text input. this incldes textarea and the label.
// props contain questionnaireresponse object.
// props: 
// 
// 
export default class TextInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows:3,
      minRows: 2,
      maxRows: 10
    }

    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(event){
    
    this.props.handleChange(event)
		const textareaLineHeight = 20;
		const { minRows, maxRows } = this.state;
		const prevRows = event.target.rows;
  	event.target.rows = minRows; 
		
		const curRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
    if (curRows === prevRows) {
    	event.target.rows = curRows;
    }
		
		if (curRows >= maxRows) {
			event.target.rows = maxRows;	
		}
    
  	this.setState({
      rows: curRows < maxRows ? curRows : maxRows,
    });
    
  }

  render() {
    if (this.props.render === false) {
      
      return (<div></div>)
    } else {
      return (
        <div className="simple-textarea-container">
          <div className="simple-textarea-label">
            <label>{this.props.label}</label>
          </div>

          <div className="simple-textarea-content">
            <textarea
              ref={this.textArea}
              rows={this.state.rows}
              style={{resize:"none"}}
              placeholder={this.props.placeholder}
              value={this.props.value}
              onChange={this.handleChange} />
          </div>
        </div>
      )
    }
  }
}
