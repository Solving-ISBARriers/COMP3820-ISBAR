import React from "react";
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

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

    // clear timeout when user is in different screen
    componentWillUnmount() {
        clearTimeout(this.state.timeout)
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
                <Stack spacing={1}>
                    <Typography variant='p'>
                        {this.props.label}
                    </Typography>

                    <TextField fullWidth multiline
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </Stack>
            )
        } else {
            return (
                <Stack spacing={1} 
                sx={{
                    display: 'none'
                }}>
                    <Typography variant='h5'>
                        {this.props.label}
                    </Typography>
                    <TextField fullWidth multiline
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </Stack>
            )
        }
    }
}