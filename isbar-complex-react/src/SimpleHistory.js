import React from "react";
import { TableBody, TableContainer, Table, TableHead, TableCell, TableRow, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
// this displays the list of previous simple isbar entries
export const SimpleHistory = () => {
    const entries = [

    ]

    const fields = [
        { field: 'date', headerName: 'Date', width: 70 },
        { field: 'Author', headerName: 'Author', width: 140 },
        { field: 'id', headerName: 'ID', width: 210 },
        { field: 'recipient', headerName: 'Recipient', width: 140 },
        { field: 'action', headerName: 'Action', width: 70 },
    ];


    return (
        <div style={{ height: 400, width: '100%' }}>

            <DataGrid
                rows={entries}
                columns={fields}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}

