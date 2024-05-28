import React from 'react';
import { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme'; // Adjust the path as needed
import Header from '../../components/Header'; // Adjust the path as needed
import usersModel from 'model/users.model';
import { observer } from 'mobx-react';

const Team = observer(() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    usersModel.fetchUsers();
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 1, cellClassName: 'name-column--cell' },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="Users" subtitle="List of registered users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid 
          checkboxSelection 
          rows={usersModel.users} 
          columns={columns} 
          getRowId={(row) => row._id} // Ensures the correct key is used for each row
        />
      </Box>
    </Box>
  );
});

export default Team;
