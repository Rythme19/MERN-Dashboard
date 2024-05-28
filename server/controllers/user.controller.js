import express from "express";
import UserModel from "../models/Users.js";

const userController = express.Router();


userController.get("/getUsers", (req, res) => {
  UserModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.json(err));
});

export default userController;