import RoleModel from "../models/role.js";

// Get all roles
export const getRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addRole = async (req, res) => {
  const { label } = req.body;

  if (!label) {
    return res.status(400).json({ error: "Label is required" });
  }

  try {
    const newRole = new RoleModel({ label });
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
