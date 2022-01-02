const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String , required: true },
  identification: { type: String, unique : true},
  phone: { type: String, unique : true , required: true },
  address: { type: String },
  gender: { type: String , required: true},
  BDate: { type: String , required: true},
  password: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
