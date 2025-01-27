const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  description: { type: String, required: true }, 
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }, 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
});

module.exports = mongoose.model("Comment", commentSchema);
