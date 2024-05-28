import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  time: Number,
  temperature: Number,
  pressure: Number,
});

const DataModel = mongoose.model("sensordatas", DataSchema);
export default DataModel;
