import UserModel from "../models/Users.js";

export const getUsers = (req, res) => {
  UserModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};


export const updateRole = async (req, res) => {
  const { id, role } = req.body;
  if (!id || !role) {
    return res.status(400).json({ error: 'Invalid input: Expected an ID and a role' });
  }

  try {
    const user = await UserModel.findById(id);


    if (!user) {
      return res.status(404).json({ error: 'No user found with the given ID' });
    }
    user.role = role;
    const updatedUser = await user.save();
    console.log(`User updated: ${JSON.stringify(updatedUser)}`);
    res.json({ message: 'Role updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const deleteUsers = (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: 'Invalid input: Expected an array of IDs' });
  }

  UserModel.deleteMany({ _id: { $in: ids } })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'No users found with the given IDs' });
      }
      res.json({ message: `${result.deletedCount} users deleted successfully` });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
    
};