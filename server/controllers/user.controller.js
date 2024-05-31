import UserModel from "../models/Users.js";

export const getUsers = (req, res) => {
  UserModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
