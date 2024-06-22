import React, { useEffect } from 'react';
import { Box, Typography, useTheme, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme'; // Adjust the path as needed
import Header from '../../components/Header'; // Adjust the path as needed
import usersModel from 'model/users.model';
import { observer } from 'mobx-react';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

const Team = observer(() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    usersModel.fetchUsers();
  }, []);

  const handleRoleChange = (id, newRole) => {
    const updatedUser = usersModel.users.find((user) => user._id === id);
    if (updatedUser) {
      updatedUser.role = newRole;
      usersModel.updateUser(updatedUser); // Ensure this method updates the user in your data store
    }
  };

  const renderRoleCell = (params) => {
    const { role } = params.row;
    const icon = role === 'admin' ? <AdminPanelSettingsOutlinedIcon /> : <SecurityOutlinedIcon />;
    const backgroundColor = role === 'admin' ? colors.greenAccent[600] : colors.greenAccent[700];

    return (
      <Box
        width="100%"
        m="0 auto"
        p="5px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor={backgroundColor}
        borderRadius="4px"
      >
        {icon}
        <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
          {role}
        </Typography>
      </Box>
    );
  };

  const renderRoleEditCell = (params) => (
    <Select
      value={params.value}
      onChange={(e) => handleRoleChange(params.row._id, e.target.value)}
      displayEmpty
      fullWidth
    >
      <MenuItem value="admin">Admin</MenuItem>
      <MenuItem value="manager">Manager</MenuItem>
    </Select>
  );

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 1, cellClassName: 'name-column--cell' },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      editable: true,
      renderCell: renderRoleCell,
      renderEditCell: renderRoleEditCell,
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing The Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
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
