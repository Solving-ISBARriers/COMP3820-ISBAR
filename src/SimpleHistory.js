import React from "react";
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
                {
                    field: 'lastUpdated',
                    headerName: 'Last Updated',
                    description: "Time last updated",
                    flex: 2
                },
                {
                    field: 'id',
                    headerName: 'ID',
                    description: "Form ID",
                    flex: 2
                },
                {
                    field: 'author',
                    headerName: 'Author',
                    description: "Author of the form",
                    flex: 3
                },
                {
                    field: 'recipient',
                    headerName: 'Recipient',
                    description: "Receiving party of the form",
                    flex: 3
                },
                {
                    field: 'action',
                    headerName: 'Action',
                    description: "Actions allowed on the form",
                    cellClassName: 'simple-table--cell',
                    align: 'center',
                    headerAlign: 'center',
                    width: 100
                },
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
                // this.context.client.delete("QuestionnaireResponse/"+resource.id)})}

                // default content for the fields.
                // Also displayed while resolving promises
                const entry = {
                    lastUpdated: 'Loading',
                    id: 'Loading',
                    author: 'Loading',
                    recipient: 'Loading',
                    action: null
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
                entry.action = "EDIT"
                newContent.push(entry)
            });

            // resolve the recipients of each.
            // This function was positioned after initialisation of array to enable access
            this.props.data.entry.forEach((element, index) => {
                const resource = element.resource
                if (resource.hasOwnProperty('extension')) {
                    this.context.client.request(resource.extension[0].valueReference.reference)
                        .then((res) => {
                            // console.log(newContent[index])
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

    handleCellClick(cellParam) {
        // handle cell click
        if (cellParam.colDef.field === "action") {
            // edit button is pressed. cell id is the form id
            this.props.editForm(cellParam.id)
        }
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
                        disableColumnMenu={true}
                        disableSelectionOnClick={true}
                        onCellClick={(param) => {
                            if (param.colDef.field === "action") {
                                this.props.editForm(param.id)
                            }
                        }}
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

