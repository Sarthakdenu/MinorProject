const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], 
  tags: { type: [String] },
});

module.exports = mongoose.model("Report", reportSchema);
