import React from "react";
import { TableBody, TableContainer, Table, TableHead, TableCell, TableRow, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'

// this displays the list of previous simple isbar entries
// takes in the bundle from response
// displays previous entries in data table of mui
export class SimpleHistory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fields: [
                { field: 'date', headerName: 'Date', width: 70 },
                { field: 'author', headerName: 'Author', width: 140 },
                { field: 'id', headerName: 'ID', width: 210 },
                { field: 'recipient', headerName: 'Recipient', width: 140 },
                { field: 'action', headerName: 'Action', width: 70 },
            ],
            entries: null
        }
    }

    componentDidMount() {
        // load all the data from prop
        console.log("history")
        console.log(this.props.data)
        if (this.props.data) {
            this.updateTable()
        }
        else {
            console.error("No data given to history!! did the request fail?")
        }
    }

    updateTable() {
        const newContent = []
        console.log(this.props.data)
        if (this.props.data.total != 0) {
            
            this.props.data.entry.forEach((element, index) => {
                // element is each resource in the bundle
                console.log(element)
                const resource = element.resource
                const entry = {
                    date: '-',
                    id: '-',
                    author: '-',
                    recipient: '-'
                }

                if(resource.hasOwnProperty('authored')){
                    entry.date = resource.authored
                }
                if(resource.hasOwnProperty('id')){
                    entry.id = resource.id
                }
                if(resource.hasOwnProperty('author')){
                    entry.author = resource.author
                }
                if(resource.hasOwnProperty('reviewer')){
                    entry.reviewer = resource.reviewer
                }
                console.log(entry)
                newContent.push(entry)
                // console.log(newContent)
            });
        }
        else {
            console.log("no existing entry")
        }
        this.setState({entries: newContent})
    }


    render() {
        console.log(this.state.entries)
        if(this.state.entries != null){
            
            return (
                <div style={{ height: 400, width: '100%' }}>
    
                    <DataGrid
                        rows={this.state.entries}
                        columns={this.state.fields}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            )
        } else{
            return(
                <div>
                    Loading data..
                </div>
            )
        }
        

    }
}

