import express from "express";
import DataModel from "../models/Data.js";

const dataController = express.Router();

dataController.get("/getData", (req, res) => {
  DataModel.find()
    .then((data) => {
      res.json(data);
      //console.log(data);
    })
    .catch((err) => res.json(err));
});

export default dataController;
