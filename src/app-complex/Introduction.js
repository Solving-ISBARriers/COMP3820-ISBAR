import React from "react";
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack'
import FormHeader from "../common/FormHeader";

export class Introduction extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <Grid container spacing={5} >
                    <Grid item xs={12}>
                        <FormHeader
                            recipient={this.props.recipient}
                            onRecipientSelect={(value) => this.props.onRecipientSelect(value)}
                            content={this.props.carePlan}
                            patient={this.props.patient}
                            published={this.props.published}
                            publishForm={this.props.publishForm}
                            isSimple={false}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={2}>
                            <h3>Date/Time</h3>
                            <TextField id="date" label="Date of transfer" variant="standard" />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={2}>
                            <h3>Patient Transfer Details</h3>

                            <FormControl sx={{ m: 1, width: '100%' }}>
                                Category of transfer
                                <InputLabel sx={{ m: 1 }} id="category-of-transfer"></InputLabel>
                                <Select
                                    labelId="category-of-transfer"
                                    id="category-of-transfer"
                                    label="category-of-transfer"
                                >
                                    <MenuItem>Emergency</MenuItem>
                                    <MenuItem>Elective</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '100%' }}>
                                Type of transfer
                                <InputLabel id="type-of-transfer"></InputLabel>
                                <Select
                                    labelId="type-of-transfer"
                                    id="type-of-transfer"
                                    label="type-of-transfer"
                                >
                                    <MenuItem>One Way</MenuItem>
                                    <MenuItem>Return</MenuItem>
                                </Select>
                            </FormControl>

                        </Stack>
                    </Grid>
                    
                </Grid>


            </div>

        )
    }
}
