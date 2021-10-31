import React from "react";
import { IsbarClientContext } from "../IsbarFhirClient";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

export function AirwaySelect() {
  const [options, setAirway] = React.useState("");

  const handleChange = (event) => {
    setAirway(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="airwaySelect">Airway</InputLabel>
        <Select
          labelId="Airway"
          id="airwaySelect"
          value={options}
          label="Options"
          onChange={handleChange}
        >
          <MenuItem value={10}>Patent</MenuItem>
          <MenuItem value={20}>Compromised</MenuItem>
          <MenuItem value={30}>Ventilated</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export function BreathingSelect() {
    const [options, setBreathing] = React.useState("");
  
    const handleChange = (event) => {
      setBreathing(event.target.value);
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="breathingSelect">Breathing</InputLabel>
          <Select
            labelId="Breathing"
            id="breathingSelect"
            value={options}
            label="Options"
            onChange={handleChange}
          >
            <MenuItem value={10}>Unremarkable</MenuItem>
            <MenuItem value={20}>Shallow</MenuItem>
            <MenuItem value={30}>Deep</MenuItem>
            <MenuItem value={40}>Rapid</MenuItem>
            <MenuItem value={50}>Slow</MenuItem>
            <MenuItem value={60}>Laboured</MenuItem>
            <MenuItem value={70}>Audible wheeze</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

export function PulseSelect() {
    const [options, setPulse] = React.useState("");
  
    const handleChange = (event) => {
      setPulse(event.target.value);
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="pulseSelect">Pulse</InputLabel>
          <Select
            labelId="Pulse"
            id="pulseSelect"
            value={options}
            label="Options"
            onChange={handleChange}
          >
            <MenuItem value={10}>Unremarkable</MenuItem>
            <MenuItem value={20}>Regular</MenuItem>
            <MenuItem value={30}>Slow</MenuItem>
            <MenuItem value={40}>Strong</MenuItem>
            <MenuItem value={50}>Weak</MenuItem>
            <MenuItem value={60}>Rapid</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

export class Situation extends React.Component {
  static contextType = IsbarClientContext;

  constructor(props) {
    super(props);
    this.state = {
      // used true if data is loaded
      loaded: false,
      error: null,
      // true if questionnaireResponse exists
      responseExist: false,
      patient: null,
      // questionnaire object that will be stored or created
      questionnaire: null,
      // questionnaire response object
      questionnaireResponse: null,
      // turns true if it's isobar
      isIsobar: false,
      // indicates saved state
      saveState: "edited",
      // type of current form
      formState: "ISOBAR",
      // would be good if we have a array of question-answer pair.
    };
  }

  componentDidMount() {
    // load client from the client context
    const client = this.context.client;
  }

  render() {
    return (
      <div className="container  mx-auto px-10 sm:px-8 max-w-7xl py-10">
        
        <h3>Patient Status</h3>
        <TextField fullWidth multiline placeholder="Patient Status" />

        <h3>Principle Diagnosis</h3>
        <TextField fullWidth multiline placeholder="Principle Diagnosis" />

        <h3>Other Diagnosis/problems</h3>
        <TextField fullWidth multiline placeholder="Other Diagnosis/problems" />

        <h3>Reason For transfer</h3>
        <TextField fullWidth multiline placeholder="Reason For transfer" />

        <h3>Observations</h3>

        <h5>Airway</h5>
        <AirwaySelect />

        <h5>Breathing</h5>
        <BreathingSelect />

        <h5>Pulse</h5>
        <PulseSelect />

        
      </div>
    );
  }
}