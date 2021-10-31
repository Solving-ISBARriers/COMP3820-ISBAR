import React from "react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export class Background extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <FormControl Component="fieldset">
            <h3>Alerts</h3>
                <FormGroup aria-label="position" row={4}>

                    <FormControlLabel
                        value="Forensic"
                        control={<Checkbox />}
                        label="Forensic"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '34ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                <FormControlLabel
                        value="Microbiological"
                        control={<Checkbox />}
                        label="Microbiological"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '29ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                </FormGroup>
                
                <FormGroup aria-label="position" row>

                    <FormControlLabel
                        value="Bariatric Patient"
                        control={<Checkbox />}
                        label="Bariatric Patient"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '29ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                <FormControlLabel
                        value="Falls Risk"
                        control={<Checkbox />}
                        label="Falls Risk"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '32ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                </FormGroup>

                <FormGroup aria-label="position" row>

                    <FormControlLabel
                        value="Infectious Risk"
                        control={<Checkbox />}
                        label="Infectious Risk"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '30ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                <FormControlLabel
                        value="Pressure Ulcer Risk"
                        control={<Checkbox />}
                        label="Pressure Ulcer Risk"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                </FormGroup>

                <FormGroup aria-label="position" row>

                    <FormControlLabel
                        value="Smoker"
                        control={<Checkbox />}
                        label="Smoker"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                </FormGroup>

                <FormLabel component="legend">Mental Health Act:</FormLabel>
                <FormGroup aria-label="position" row>

                    <FormControlLabel
                        value="Voluntary"
                        control={<Checkbox />}
                        label="Voluntary"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '34ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                <FormControlLabel
                        value="Involuntary"
                        control={<Checkbox />}
                        label="Involuntary"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '31ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                </FormGroup>

                <FormGroup aria-label="position" row>

                    <FormControlLabel
                        value="Risk Assessment"
                        control={<Checkbox />}
                        label="Risk Assessment"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '28ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                </FormGroup>

                <FormLabel component="legend">Drug Allergy</FormLabel>
                <FormGroup aria-label="position" row>

                    <FormControlLabel
                        value="State Drug/Reaction"
                        control={<Checkbox />}
                        label="State Drug/Reaction"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '26ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                </FormGroup>

                <FormGroup aria-label="position" row>

                    <FormControlLabel
                        value="Other"
                        control={<Checkbox />}
                        label="Other"
                        labelPlacement="start"
                    />
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '37ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>
                </FormGroup>


                <h3>Current Episode Medications:</h3>
                <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 0.1, width: '90ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>

                <h3>Investigations:</h3>
                <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 0.1, width: '90ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>

                <h3>Specialty-Specific Information:</h3>
                <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 0.1, width: '90ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="detial-basic" label="detial" variant="outlined" />
                </Box>

            </FormControl>
        )
    }


}

