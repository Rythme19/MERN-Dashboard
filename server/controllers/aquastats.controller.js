import DataModel from "../models/aquastats.js";

export const getData = (req, res) => {
  DataModel.find()
    .then((data) => {
      res.json(data);
      //console.log(data);
    })
    .catch((err) => res.json(err));
};

