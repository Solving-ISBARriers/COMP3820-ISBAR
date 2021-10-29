import React from "react";
import { TableBody, TableContainer, Table, TableHead, TableCell, TableRow, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { getSimpleName, getDateTimeString } from "./common/DisplayHelper";
import { IsbarClientContext } from "./IsbarFhirClient";

// this displays the list of previous simple isbar entries
// takes in the bundle from response
// displays previous entries in data table of mui
export class SimpleHistory extends React.Component {

    static contextType = IsbarClientContext;
    constructor(props) {
        super(props)
        this.state = {
            fields: [
                { field: 'lastUpdated', headerName: 'Last Updated', width: 200 },
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

    // manually resolve the recipient..
    updateTable() {
        const newContent = []
        // console.log(this.props.data)
        if (this.props.data.total != 0) {

            this.props.data.entry.forEach((element) => {
                // element is each resource in the bundle
                // console.log(element)
                const resource = element.resource
                // default content for the fields.
                // Also displayed while resolving promises
                const entry = {
                    lastUpdated: 'Loading',
                    id: 'Loading',
                    author: 'Loading',
                    recipient: 'Loading'
                }
                // set new content??
                if (resource.meta.hasOwnProperty('lastUpdated')) {
                    entry.lastUpdated = getDateTimeString(resource.meta.lastUpdated)
                }
                if (resource.hasOwnProperty('id')) {
                    entry.id = resource.id
                }
                if (resource.hasOwnProperty('author')) {
                    entry.author = getSimpleName(resource.author.name[0])
                }
                newContent.push(entry)
            });

            // resolve the recipients of each.
            // This function was positioned after initialisation of array to enable access
            this.props.data.entry.forEach((element, index) => {
                const resource = element.resource
                if (resource.hasOwnProperty('extension')) {
                    this.context.client.request(resource.extension[0].valueReference.reference)
                        .then((res) => {
                            console.log(newContent[index])
                            newContent[index].recipient = getSimpleName(res.name[0])
                            // force component update
                            this.forceUpdate()
                        })
                }
            })
        }
        else {
            console.log("no existing entry")
        }
        this.setState({ entries: newContent })
    }

    render() {
        // console.log(this.state.entries)
        if (this.state.entries != null) {

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
        } else {
            return (
                <div>
                    Loading data..
                </div>
            )
        }


    }
}

