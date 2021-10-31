
import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { experimentalStyled as styled } from '@mui/material/styles';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    
    color: theme.palette.text.secondary,
  }));




export class Assessment extends React.Component {

    constructor(props){
        super(props)
    }
    render(){
        return(
          <div className="container">                     
            <div>    
              <h3>Latest clinical assessment:</h3>
            </div>             
            <TextField style ={{width: '100%'}} aria-label="minimum height" minRows={4} multiline placeholder ="Latest clinical assessment" spacing={2} id="outlined-search" type="search" />         
            <div>    
              <h3>Vital Signs:</h3>
              <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <Item>
                      <div>                                                
                        <TextField fullWidth label="Resp rate" id="resprate" />
                      </div>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>                      
                      <TextField fullWidth label="Temp" id="temp" />          
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item><TextField fullWidth label="Pain Score" id="painscore" /></Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item><TextField fullWidth label="Pulse" id="pulse" /></Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item><TextField fullWidth label="O2 rate/device" id="O2rate" /></Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item><TextField fullWidth label="Blood Pressure" id="BP" /></Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item><TextField fullWidth label="Urine Output" id="UO" /></Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item><TextField fullWidth label="SpO2" id="SpO2" /></Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item><TextField fullWidth label="Patient Anxiety" id="anxiety" /></Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item><TextField fullWidth label="Hb" id="Hb" /></Item>
                  </Grid>              
                </Grid>
              </Box>                
            </div>         
          </div>

        )
        
    }
}
