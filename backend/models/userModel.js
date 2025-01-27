const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  mobileNo: { type: Number, required: true },
  password: String,
  role: { type: String },
  imageUrl: { type: String },
  adharNo: { type: String }, 
  designation: { type: String }, 
  teachingSector: { type: String },
  scholarNo: { type: String }, 
  skills: { type: String }, 
  officeLocation: { type: String }, 
  officePhone: { type: String }, 
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }]

});

module.exports = mongoose.model("User", userSchema);
