const Comment = require("../models/commentModel"); // Import Comment model
const Report = require("../models/reportModel");   // Import Report model
const User = require("../models/userModel");       // Import User model

const createComment = async (req, res) => {
  const { reportId, description, email } = req.body; 
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Find the report by ID
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Step 3: Create a new comment
    const newComment = new Comment({
      description,
      createdBy: user._id, // Reference to the user
    });

    // Step 4: Save the comment
    const savedComment = await newComment.save();

    // Step 5: Add the comment to the report's comments array
    report.comments.push(savedComment._id);
    await report.save();

    // Step 6: Return the saved comment and the updated report
    res.status(201).json({
      message: "Comment added successfully",
      comment: savedComment,
      updatedReport: report,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createComment };
