

export default class BackgroundField extends React.Component{

    render(){

        <Grid item xs={8}>
        <Item>                                   
            {/* <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            > */}
                 <FormControlLabel
                    value={this.props.labelValue}
                    control={<Checkbox />}
                    label={this.props.labelValue}  
                    labelPlacement="start"
                    sx={{flexGrow:1}}                                  
                    />
                <TextField 
                sx={{flexGrow: 1}}
                id="detial-basic" 
                label={this.props.textFieldLabel}
                variant="standard" />
            {/* </Box> */}
        </Item>
    </Grid>
    }
}