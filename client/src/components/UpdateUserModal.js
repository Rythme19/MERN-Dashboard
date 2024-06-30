import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const UpdateUserModal = ({ open, onClose, user, updateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleUpdate = () => {
    updateUser(user._id, { name, email, phone });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, bgcolor: "background.paper", p: 3 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateUserModal;
