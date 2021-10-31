import React from "react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    
    
  }));
  


export class Background extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="container">
            <FormControl Component="fieldset">
            <h3>Alerts</h3>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4} columns={16}>
                    <Grid item xs={8}>
                        <Item>                                   
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                 <FormControlLabel
                                    value="Forensic"
                                    control={<Checkbox />}
                                    label="Forensic"  
                                    labelPlacement="start"                                  
                                    />
                                <TextField id="detial-basic" label="Details" variant="standard" />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>                            
                            <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m:1 },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <FormControlLabel
                                    value="Microbiological"
                                    control={<Checkbox />}
                                    label="Microbiological"
                                    labelPlacement="start"
                                />
                                <TextField id="detial-basic" label="Details" variant="standard" labelPlacement="end"/>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>                            
                            <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m:1 },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <FormControlLabel
                                    value="Bariatric Patient"
                                    control={<Checkbox />}
                                    label="Bariatric Patient"
                                    labelPlacement="start"
                                />
                                <TextField id="detial-basic" label="Details" variant="standard" />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>                            
                            <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m:1 },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <FormControlLabel
                                    value="Fall Risk"
                                    control={<Checkbox />}
                                    label="Fall Risk"
                                    labelPlacement="start"
                                />
                                <TextField id="detial-basic" label="Details" variant="standard" />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>                            
                            <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m:1 },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <FormControlLabel
                                    value="Infectious Risk"
                                    control={<Checkbox />}
                                    label="Infectious Risk"
                                    labelPlacement="start"
                                />
                                <TextField id="detial-basic" label="Details" variant="standard" />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>                            
                            <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m:1 },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <FormControlLabel
                                    value="Pressure Ulcer Risk"
                                    control={<Checkbox />}
                                    label="Pressure Ulcer Risk"
                                    labelPlacement="start"
                                />
                                <TextField id="detial-basic" label="Details" variant="standard" />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>                            
                            <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m:1 },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <FormControlLabel
                                    value="Smoker"
                                    control={<Checkbox />}
                                    label="Smoker"
                                    labelPlacement="start"
                                />
                                <TextField id="detial-basic" label="Details" variant="standard" />
                            </Box>
                        </Item>
                    </Grid>                    
                </Grid>
                </Box>
                //Split
                <Box sx={{ flexGrow: 1 }}>
                    <h4>Mental Health Act:</h4>
                <Grid container spacing={4} columns={16}>
                    <Grid item xs={8}>
                        <Item>                                   
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                 <FormControlLabel
                                    value="Voluntary"
                                    control={<Checkbox />}
                                    label="Voluntary"  
                                    labelPlacement="start"                                  
                                    />
                                <TextField id="detial-basic" label="Details" variant="standard" />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>                            
                            <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m:1 },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <FormControlLabel
                                    value="Involuntary"
                                    control={<Checkbox />}
                                    label="Involuntary"
                                    labelPlacement="start"
                                />
                                <TextField id="detial-basic" label="Details" variant="standard" labelPlacement="end"/>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>                            
                            <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m:1 },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <FormControlLabel
                                    value="Risk Assessment"
                                    control={<Checkbox />}
                                    label="Risk Assessment"
                                    labelPlacement="start"
                                />
                                <TextField id="detial-basic" label="Details" variant="standard" />
                            </Box>
                        </Item>
                    </Grid>                   
                </Grid>
                </Box>
                

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
            </div>
        )
    }


}

