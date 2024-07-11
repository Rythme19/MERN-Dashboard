import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const register = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({
      ...req.body,
      password: hashedPass,
      createdBy: req.userId,
    });
    const result = await newUser.save();
    res.status(201).send({
      message: "User created successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error hashing password",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await UserModel.findOne({ email: req.body.email });
    console.log("result: ", result);
    if (!result) {
      return res.status(404).send({
        message: 'User not found'
      });
    }

    const passChecked = await bcrypt.compare(req.body.password, result.password);
    
    if (!passChecked) {
      return res.status(403).send({
        message: 'Wrong password'
      });
    }

    const secretKey = process.env.JWT_SECRET_KEY || "mySuperSecretKey123!@#";
    const token = jwt.sign(
      {
        userId: result._id,
        email: result.email,
        role: result.role // Add user role to the token payload
      },
      secretKey,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Token created successfully",
      token: token,
      role: result.role // Include user role in the response
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: "Cannot generate a token",
      error
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    
    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: 'You need to authenticate',
      error: error
    });
  }
};
