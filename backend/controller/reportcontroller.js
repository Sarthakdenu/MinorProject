const User = require("../models/userModel"); 
const Report = require("../models/reportModel"); 
const Comment = require("../models/commentModel");
const createReport = async (req, res) => {
  const { email, heading, topic, description, tags } = req.body; 

  try {
    if (!email || !heading || !topic || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReport = new Report({
      heading,
      topic,
      description,
      tags,
      createdBy: user._id,
    });
    await newReport.save();

    res.status(201).json({ message: "Report created successfully", report: newReport });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getCommentsByReportId = async (req, res) => {
    const { reportId } = req.body;
  
    try {
      const report = await Report.findById(reportId);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
  
      const comments = await Comment.find({ _id: { $in: report.comments } })
        .populate("createdBy", "username email"); 
      if (comments.length === 0) {
        return res.status(404).json({ message: "No comments found for this report" });
      }
  
      res.status(200).json({ message: "Comments fetched successfully", comments });
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  const updateReport = async (req, res) => {
    
    const { reportId,heading, topic, description, tags } = req.body; 
    
    try {
      const report = await Report.findById(reportId);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
  
      if (heading) report.heading = heading;  
      if (topic) report.topic = topic;        
      if (description) report.description = description;  
      if (tags) report.tags = tags;  
  
      await report.save();
      res.status(200).json({ message: "Report updated successfully", report });
    } catch (error) {
      console.error("Error updating report:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  const getAllReports =  async (req, res) => {
    try {
        const reports = await Report.find()
            .populate("createdBy", "username email") 
            .exec();

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reports" });
    }
  }

module.exports = { createReport,getCommentsByReportId,updateReport,getAllReports };
