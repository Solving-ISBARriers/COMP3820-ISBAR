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
        <h1>Situation</h1>
        <h3>Patient Status</h3>
        <TextField fullWidth multiline placeholder="Patient Status" />

        <h3>Principle Diagnosis</h3>
        <TextField fullWidth multiline placeholder="Principle Diagnosis" />

        <h3>Other Diagnosis/problems</h3>
        <TextField fullWidth multiline placeholder="Other Diagnosis/problems" />

        <h3>Reason For transfer</h3>
        <TextField fullWidth multiline placeholder="Reason For transfer" />

        <h3>Observations</h3>
        <AirwaySelect />
      </div>
    );
  }
}