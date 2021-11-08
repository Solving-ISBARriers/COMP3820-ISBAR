import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { SimplePDF } from "../app-simple/SimplePDF";
import { Button } from '@mui/material'

export default class PrintButton extends React.Component{

    render(){
        if(this.props.simple){
            return(
                <PDFDownloadLink
                    document={
                        <SimplePDF
                            content={this.props.content}
                            author={this.props.author}
                            recipient={this.props.recipient}
                            subject={this.props.patient}
                        />
                    }
                    fileName="isbar-simple.pdf">
                    <Button
                        size="large"
                        variant="outlined"
                        fullWidth={true}
                        sx={{
                            paddingLeft: "5px",
                            marginRight:"5px"
                        }}
                    >
                        Print
                    </Button>
                </PDFDownloadLink>
            )
        } else{
            return(
                <Button
                    size="large"
                    variant="outlined"
                    fullWidth={true}
                    sx={{
                        paddingLeft: "5px",
                        marginRight:"5px"
                    }}
                >
                    Print
                </Button>
            )
        }
    }
}