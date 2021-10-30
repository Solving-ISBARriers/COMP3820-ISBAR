import React from "react";
import TextField from '@mui/material/TextField'

// this text area calls parent callback 5 secs after no button press.
// updateField callback function given as the prop will fire when 
// there is no input for specified timeout duration.
// this was added to optimise the update process.
export default class SimpleTextArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            timeout: null,
            // timeout delay
            delay: 5000
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({ value: this.props.initialValue })
    }
    handleChange(event) {

        // set the value of this field
        this.setState({ value: event.target.value });
        // clear the timeout
        clearTimeout(this.state.timeout)
        // set the timeout
        this.setState({
            timeout: setTimeout(() => { this.props.updateField(this.state.value) },
                this.state.delay)
        })
    }

    render() {
        if (this.props.visible) {
            return (
                <TextField fullWidth multiline
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            )
        } else {
            return (<div></div>)
        }
    }
}