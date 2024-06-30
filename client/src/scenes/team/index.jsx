import React, { useEffect, useRef } from "react";
import { Box, Typography, useTheme, Select, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"; // Adjust the path as needed
import Header from "../../components/Header"; // Adjust the path as needed
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { observer } from "mobx-react";
import usersModel from "model/UserModel";

const Team = observer(() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState({ name: "", email: "", phone: "" });
  const firstInputRef = useRef(null);

  React.useEffect(() => {
    usersModel.fetchUsers();
  }, []);

  useEffect(() => {
    if (open && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [open]);

  const handleDeleteUsers = () => {
    usersModel.deleteUsers(selectedIds);
    setSelectedIds([]);
  };

  const handleOpenDialog = () => {
    if (selectedIds.length === 1) {
      const user = usersModel.users.find(user => user._id === selectedIds[0]);
      setSelectedUser(user);
      setOpen(true);
    } else {
      alert("Please select exactly one user to update.");
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSaveUser = () => {
    usersModel.updateUser(selectedUser._id, selectedUser);
    setOpen(false);
  };

  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const renderRoleCell = (params) => {
    const { role } = params.row;
    const icon = role === "admin" ? <AdminPanelSettingsOutlinedIcon /> : <SecurityOutlinedIcon />;
    const backgroundColor = role === "admin" ? colors.greenAccent[600] : colors.greenAccent[700];

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
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          {role}
        </Typography>
      </Box>
    );
  };

  const renderRoleEditCell = (params) => {
    const handleChange = (e) => {
      usersModel.updateRole(params.row._id, e.target.value);
      window.location.reload();
    };

    return (
      <Select
        value={params.value}
        onChange={handleChange}
        displayEmpty
        fullWidth
      >
        {usersModel.roles.map((role) => (
          <MenuItem key={role.id} value={role.label}>
            {role.label}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      editable: true,
      renderCell: renderRoleCell,
      renderEditCell: renderRoleEditCell,
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing The Team Members" />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteUsers}
        disabled={selectedIds.length === 0}
        sx={{ mb: 2, mr: 2 }}
      >
        Delete Selected
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        disabled={selectedIds.length !== 1}
        sx={{ mb: 2 }}
      >
        Update User Information
      </Button>
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
          getRowId={(row) => row._id}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelectedIds(newRowSelectionModel);
          }}
          rowSelectionModel={selectedIds}
        />
      </Box>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Update User Information</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={selectedUser.name}
            onChange={handleChange}
            inputRef={firstInputRef}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={selectedUser.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={selectedUser.phone}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default Team;
