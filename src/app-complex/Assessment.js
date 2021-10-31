
import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));




export class Assessment extends React.Component {

    constructor(props){
        super(props)
    }
    render(){
        return(

            <React.Fragment>
            <CssBaseline />
            <Container fixed>
              <Box sx={{  height: '5vh' }} />
            

          
            <Box
            
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '136ch', },
            }}
            noValidate
            autoComplete="off"
          >
            
            
            
            <h1><p>Assessment</p></h1>

            <div>    
            <h3>Latest clinical assessment:</h3>
            </div>
             
            <TextField fullwidth aria-label="minimum height"
      minRows={4} multiline placeholder ="Latest clinical assessment" spacing={2} id="outlined-search" type="search" />
           
           
           

            <div >    
            <h3>Vital Signs:</h3>
          
          
          
            <div style={{ height: 80, width: '100%' }}>
       <Stack direction="row" spacing={2}>
           
           
            <h3>Resp rate</h3>
            <TextField  fullwidth  multiline placeholder ="" spacing={2} id="outlined-search" type="search"  style={{ width: 300 }}/>
            
            <h3>Temp.</h3>
            <TextField fullwidth multiline placeholder ="" id="outlined-search" type="search" style={{ width: 300 }} />
           
            </Stack>
    </div>
            
           
           
    <div style={{ height: 80, width: '100%' }}>
      <Stack direction="row" spacing={2}>
           
           
            <h3>Pain Score</h3>
            <TextField fullwidth multiline placeholder ="" id="outlined-search" type="search" style={{ width: 300 }} />
            <h3>Pulse</h3>
            <TextField fullwidth multiline placeholder ="" id="outlined-search" type="search" style={{ width: 300 }} />
           
            </Stack>
    </div>
              
           
    <div style={{ height: 80, width: '100%' }}>
      <Stack direction="row" spacing={2}>
            <h3>O2 rate/device</h3>
            <TextField fullwidth multiline placeholder ="" id="outlined-search" type="search" style={{ width: 300 }}/>
            <h3>B.P.</h3>
            <TextField fullwidth multiline placeholder ="" id="outlined-search" type="search" style={{ width: 300 }}/>
           
            </Stack>
    </div>  
           
           
    <div style={{ height: 80, width: '100%' }}>
      <Stack direction="row" spacing={2}> 
            <h3>Urine output </h3>
            <TextField fullwidth multiline placeholder ="" id="outlined-search" type="search" style={{ width: 300 }} />
            <h3>SpO2</h3>
            <TextField fullwidth multiline placeholder ="" id="outlined-search" type="search" style={{ width: 300 }}/>
            </Stack>
    </div>   
           
           
    <div style={{ height: 80, width: '100%' }}>
      <Stack direction="row" spacing={2}> 
      <h3>Patient anxiety </h3>
            <TextField fullwidth multiline placeholder =" " id="outlined-search" type="search" style={{ width: 300 }} />
            <h3>Hb</h3>
            <TextField  fullwidth multiline placeholder ="" id="outlined-search" type="search" style={{ width: 300 }}/>
            </Stack>
    </div>      
      
            </div>
            

          </Box>
       
          </Container>
    </React.Fragment>

        )
    }
}
