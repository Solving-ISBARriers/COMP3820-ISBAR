import React from "react";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "medblocks-ui";
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
import { FormGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

function createData(airway, breathing, skinColour, mentalState, behaviour) {
  return { airway, breathing, skinColour, mentalState, behaviour };
}

const rows = [
  createData(
    <FormControlLabel control={<Checkbox />} label="Patent" />,
    <FormControlLabel control={<Checkbox />} label="Unremarkable" />,
    <FormControlLabel control={<Checkbox />} label="Unremarkable" />,
    <FormControlLabel control={<Checkbox />} label="Cognitive impairment" />,
    <FormControlLabel control={<Checkbox />} label="Verbal aggression" />
  ),
  createData(
    <FormControlLabel control={<Checkbox />} label="Compromised" />,
    <FormControlLabel control={<Checkbox />} label="Shallow" />,
    <FormControlLabel control={<Checkbox />} label="Pale" />,
    <FormControlLabel control={<Checkbox />} label="Depression" />,
    <FormControlLabel control={<Checkbox />} label="Harm to others" />
  ),
  createData(
    <FormControlLabel control={<Checkbox />} label="Ventilated" />,
    <FormControlLabel control={<Checkbox />} label="Deep" />,
    <FormControlLabel control={<Checkbox />} label="Flushed" />,
    <FormControlLabel control={<Checkbox />} label="Dementia" />,
    <FormControlLabel control={<Checkbox />} label="Harm to self" />
  ),
  createData(
    "",
    <FormControlLabel control={<Checkbox />} label="Slow" />,
    <FormControlLabel control={<Checkbox />} label="Cyanotic" />,
    "",
    <FormControlLabel control={<Checkbox />} label="Sleep disturbance" />
  ),
  createData(
    "",
    <FormControlLabel control={<Checkbox />} label="Audible Wheeze" />,
    "",
    "",
    ""
  ),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Airway</TableCell>
            <TableCell>Breathing</TableCell>
            <TableCell>Skin Colour</TableCell>
            <TableCell>Mental State</TableCell>
            <TableCell>Behaviour</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" align="left" scope="row">
                {row.airway}
              </TableCell>
              <TableCell>{row.breathing}</TableCell>
              <TableCell>{row.skinColour}</TableCell>
              <TableCell>{row.mentalState}</TableCell>
              <TableCell>{row.behaviour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
        <BasicTable />

        {/* <div class="table-container">
          <h3>Observations</h3>
          <table>
            <tr>
              <th>Airway</th>
              <th>Breathing</th>
              <th>Skin Colour</th>
              <th>Mental</th>
              <th>Behaviour</th>
            </tr>
            <tr>
              <td>
                <sl-checkbox>Patent</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Unremarkable</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Unremarkable</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Cognitive impairment</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Verbal aggression</sl-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <sl-checkbox>Compromised</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Shallow</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Pale</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Depression</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Harm to others</sl-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <sl-checkbox>Ventilated</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Deep</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Flushed</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Dementia</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Harm to self</sl-checkbox>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <sl-checkbox>Rapid</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Mottled</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Delirium</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Sleep disturbance</sl-checkbox>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <sl-checkbox>Slow</sl-checkbox>
              </td>
              <td>
                <sl-checkbox>Cyanotic</sl-checkbox>
              </td>
              <td></td>
              <td>
                <sl-checkbox>Sleep disturbance</sl-checkbox>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <sl-checkbox>Audible Wheeze</sl-checkbox>
              </td>
              <td></td>
            </tr>
          </table>
        </div> */}
        <div>
          <h3>Vitals</h3>
          <table>
            <th>Temp</th>
            <th>Pulse</th>
            <th>Resp Rate</th>
            <th>Blood Pressure</th>
            <tr>
              <td>
                <sl-input placeholder="Temp celcius "></sl-input>
              </td>
              <td>
                <sl-input placeholder="Beats/minuite"></sl-input>
              </td>
              <td>
                <sl-input placeholder="Resp Rate "></sl-input>
              </td>
              <td>
                <sl-input placeholder="mm Hg "></sl-input>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
