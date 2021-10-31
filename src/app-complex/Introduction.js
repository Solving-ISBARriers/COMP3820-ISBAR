import React from "react";
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid} from "@mui/material";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';

export class Introduction extends React.Component {

    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="container">
                
                <Grid container spacing={2} >
                <Grid item xs={6}>
                    <Box component="span" sx={{ p: 3, border: '3px' }}>
                        
                            
                             <h3>Date/Time</h3>
                           
                        
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ flexGrow: 1 }}>
                    
                    <Box component="span" sx={{ p: 3, border: '3px' }}>
                        
                                <h3>Practitioner</h3>
                                
                            <Box
                                component="form"
                                
                                sx={{display: 'flex',
                                flexDirection: 'row',
                                '& .MuiTextField-root': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                            ></Box>
                            
                            <Box sx={{ display: 'flex',textAlign: 'justify', m: 1 }}>
                                <Typography>Name</Typography><Typography color="blue">llllllllllllllllllllllllllllllllllllll</Typography><Typography> Role</Typography></Box>
                            
                            <TextField 
                                id="practitioner-name"
                                defaultValue="practitioner name"
                                multiline
                                sx={{ p: 1,width: '45%' }}
                                />
                            
                            
                          
                            <TextField 
                                id="practitioner-role"
                                defaultValue="practitioner role"
                                multiline
                                sx={{ p: 1,width: '45%' }}
                                />
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, maxWidth:'100%'},
                                }}
                                noValidate
                                autoComplete="off"
                            >
                            </Box>
                            <Typography>Location</Typography>
                            <TextField 
                                id="practitioner-location"
                                defaultValue="practitioner location"
                                fullWidth
                                sx={{ width: '90%' }}
                                multiline/>     
                        </Box>
                    
                </Grid>
                <Grid item xs={6}>
                <Box component="span" sx={{ p: 3, border: '3px' }}>
                        
                        
                             <h3>   Next Practitioner</h3>
                        
                            
                            <Box >
                                <FormControl sx={{ m: 1,width: '45%' }}>
                                    Category of transfer
                                    <InputLabel id="category-of-transfer">-Select-</InputLabel>
                                    <Select
                                        labelId="category-of-transfer"
                                        id="category-of-transfer"
                                        label="category-of-transfer"
                                    >
                                        <MenuItem>Emergency</MenuItem>
                                        <MenuItem>Elective</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1,width: '45%' }}>
                                    Type of transfer
                                    <InputLabel id="type-of-transfer">-Select-</InputLabel>
                                    <Select
                                        labelId="type-of-transfer"
                                        id="type-of-transfer"
                                        label="type-of-transfer"
                                    >
                                        <MenuItem>One Way</MenuItem>
                                        <MenuItem>Return</MenuItem>
                                    </Select>
                                </FormControl>
                                
                            </Box>
                            
                            
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, maxWidth:'100%'},
                                }}
                                noValidate
                                autoComplete="off"
                            >
                            </Box>
                           <Typography>Reason for transfer</Typography>
                            <TextField 
                                id="reason-for-transfor"
                                placeholder="Type at least 3 characters to search"
                                fullWidth
                                sx={{ width: '90%' }}
                                multiline/>     
                        
                    </Box>
                </Grid>
                <Grid item xs={6}>
                <Box component="span" sx={{ p: 3, border: '3px' }}>
                        
                        
                             <h3>   Next Practitioner</h3>
                            
                             <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1},width:'100%'
                                  }}
                                noValidate
                                autoComplete="off"
                            ></Box>
                            
                            <Typography>Name</Typography>
                            <TextField 
                                id="next-practitioner-name"
                                placeholder="Type Name"
                                sx={{ width: '45%' }}
                                multiline/>
                        
                            
                            <Typography>Role</Typography>
                            <TextField 
                                id="next-practitioner-role"
                                placeholder="Type Role"
                                sx={{ width: '45%' }}
                                multiline/>
                                
                            <Typography>Location</Typography>
                            <TextField 
                                id="next-practitioner-location"
                                placeholder="Type Location"
                                fullWidth
                                sx={{width: '90%' }}
                                multiline/>     
                        
                    </Box>
                </Grid>
                </Grid>
                
            
            </div>
        
        )
    }
}
