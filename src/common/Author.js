import React from "react";
import { Stack, Grid, Typography} from '@mui/material'

// is supposed to be put in a grid
export default class Author extends React.Component{
    
    static contextType = IsbarClientContext;
    
    constructor(props){
        super(props)
        this.state = {
            xs: this.props.xs,
            author: this.props.practitioner
        }
    }
    
    render(){
        <Grid item xs={this.props.xs}>
            <Stack>
                <Typography variant="h3">Author</Typography>
                <Typography variant="h4"></Typography>
            </Stack>

        </Grid>
    }

}