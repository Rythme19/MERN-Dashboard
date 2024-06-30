import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  label: String,
});

const RoleModel = mongoose.model("roles", RoleSchema);
export default RoleModel;
