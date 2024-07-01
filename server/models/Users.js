import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
  role: String,
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
