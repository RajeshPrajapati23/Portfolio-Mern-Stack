import mongoose from "mongoose";

const Adminregister = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
const Admin = mongoose.model("Admin", Adminregister);
export { Admin };
