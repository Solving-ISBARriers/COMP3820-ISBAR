import React from "react";
import { IsbarClientContext } from "../IsbarFhirClient";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';



export default function CheckboxesGroup() {
    const [state, setState] = React.useState({
      impairment: false,
      jason: false,
      antoine: false,
      aggression: false,
      others: false,
      resistive: false, 
      dementia: false,
      depression: false,
      self: false,
      noissues: false,
      faecalcontinence: false,
      urinarycontinence: false,

    });
  
    const handleChange = (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    };
  
    const {impairment, aggression, others, resistive, dementia, depression, self, noissues, faecalcontinence, urinarycontinence } = state;
    
  
    return (
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend"><h5>Mental Behaviour</h5></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={impairment} onChange={handleChange} name="impairment" />
              }
              label="Cognitive impairment"
            />
            <FormControlLabel
              control={
                <Checkbox checked={aggression} onChange={handleChange} name="aggression" />
              }
              label="Verbal Aggression"
            />
             <FormControlLabel
              control={
                <Checkbox checked={dementia} onChange={handleChange} name="dementia" />
              }
              label="Dementia"
            />
            <FormControlLabel
              control={
                <Checkbox checked={depression} onChange={handleChange} name="depression" />
              }
              label="Depression"
            />
            
            <FormControlLabel
              control={
                <Checkbox checked={resistive} onChange={handleChange} name="resistive" />
              }
              label="Resistive to care"
            />
          </FormGroup>
        </FormControl>
        <FormControl          
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel   component="legend"><h5>Mental Behaviour</h5></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={self} onChange={handleChange} name="self" />
              }
              label="Harm to self"
            />
            <FormControlLabel
              control={
                <Checkbox checked={others} onChange={handleChange} name="others" />
              }
              label="Harm to others"
            />           
          </FormGroup>
        </FormControl>
        <FormControl          
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel   component="legend"><h5>Continence</h5></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={noissues} onChange={handleChange} name="noissues" />
              }
              label="No Issues"
            />
            <FormControlLabel
              control={
                <Checkbox checked={faecalcontinence} onChange={handleChange} name="faecalcontinence" />
              }
              label="Faecal continence"
            /> 
            <FormControlLabel
              control={
                <Checkbox checked={urinarycontinence} onChange={handleChange} name="urinarycontinence" />
              }
              label="Urinary continence"
            />              
          </FormGroup>
        </FormControl>
      </Box>
    );
  }

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
      <div className="container  ">
        
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

        <CheckboxesGroup />

        
      </div>
    );
  }
}