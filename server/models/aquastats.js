import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  pressure: {
    type: Number,
    required: true,
  },
});


const DataModel = mongoose.model("sensordatas", DataSchema);
export default DataModel;

