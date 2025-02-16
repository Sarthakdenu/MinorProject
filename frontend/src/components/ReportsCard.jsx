import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReportsCard.css';
import { FaEdit,FaThumbsUp } from 'react-icons/fa';

const ReportsCard = ({ useremail, reportKey }) => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingReport, setEditingReport] = useState(null); 
  const [updatedHeading, setUpdatedHeading] = useState('');
  const [updatedTopic, setUpdatedTopic] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedTags, setUpdatedTags] = useState('');

  const [newComment, setNewComment] = useState('');


  const email = useremail || localStorage.getItem('email');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/getReportsByUserEmail', { email });
        setReports(response.data.reports);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching reports');
        setLoading(false);
      }
    };

    fetchReports();
  }, [email]);

  const handleCommentsToggle = async (reportId) => {
    try {
      if (!comments[reportId]) {
        const response = await axios.post('http://localhost:3001/api/getCommentsByReportId', { reportId });
        setComments((prevComments) => ({
          ...prevComments,
          [reportId]: response.data.comments,
        }));
      } else {
        setComments((prevComments) => ({
          ...prevComments,
          [reportId]: undefined,
        }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching comments');
    }
  };

  const handleEditButtonClick = (report) => {
    setEditingReport(report);
    setUpdatedHeading(report.heading);
    setUpdatedTopic(report.topic);
    setUpdatedDescription(report.description);
    setUpdatedTags(report.tags?.join(', ') || '');
  };
  
  const handleCreateComment = async (reportId) => {
    try {
      const itememail = localStorage.getItem('email'); 
      console.log("fixing bug")
      console.log(itememail)
      if (!newComment.trim()) return;
      const response = await axios.post('http://localhost:3001/api/createComment', {
        reportId,
        description: newComment,
        email:itememail,
      });
      
      setComments((prevComments) => ({
        ...prevComments,
        [reportId]: [...(prevComments[reportId] || []), response.data.comment],
      }));
      setNewComment('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating comment');
    }
  };

  const handleUpdateReport = async (reportId) => {
    try {
      const updatedReport = {
        heading: updatedHeading,
        topic: updatedTopic,
        description: updatedDescription,
        tags: updatedTags.split(',').map(tag => tag.trim())
      };

      await axios.put(`http://localhost:3001/api/updateReport`, {
        reportId,
        ...updatedReport
      });

      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === reportId ? { ...report, ...updatedReport } : report
        )
      );
      setEditingReport(null); 
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating report');
    }
  };
  const handleUpvote = async (commentId, reportId) => {
    const upvotedComments = JSON.parse(localStorage.getItem("upvotedComments")) || [];
  
    if (upvotedComments.includes(commentId)) {
      alert("You have already upvoted this comment!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3001/api/upvoteComment", { commentId });
  
      // Update the UI with the new upvote count
      setComments((prevComments) => ({
        ...prevComments,
        [reportId]: prevComments[reportId].map((comment) =>
          comment._id === commentId ? { ...comment, upvotes: (comment.upvotes || 0) + 1 } : comment
        ).sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0)), // Sort after upvoting
      }));
  
      // Store the upvoted comment ID in localStorage
      upvotedComments.push(commentId);
      localStorage.setItem("upvotedComments", JSON.stringify(upvotedComments));
    } catch (err) {
      console.error("Error upvoting comment:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingReport(null);
  };
 console.log("key is" +reportKey)
  const filteredReports = reportKey
    ? reports.filter(report => report._id === reportKey) 
    : reports;  

  if (loading) return <div>Loading reports...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="reports-container">
      {filteredReports.map((report) => (
        <div key={report._id} className="report-card">
          <div className="report-header">
            <div className="user-info">
              <div className="user-avatar">
                {report.createdBy.imageUrl ? (
                  <img src={report.createdBy.imageUrl} alt="User Avatar" />
                ) : (
                  <div className="default-avatar">U</div>
                )}
              </div>
              <div className="user-details">
                <h4>{report.createdBy.username}</h4>
                <p>{report.createdBy.email}</p>
              </div>
            </div>
            <button
              className="edit-btn"
              onClick={() => handleEditButtonClick(report)}
            >
              <FaEdit /> Edit
            </button>
          </div>
          {editingReport && editingReport._id === report._id ? (
            <div className="edit-form">
              <input
                type="text"
                value={updatedHeading}
                onChange={(e) => setUpdatedHeading(e.target.value)}
                placeholder="Heading"
              />
              <input
                type="text"
                value={updatedTopic}
                onChange={(e) => setUpdatedTopic(e.target.value)}
                placeholder="Topic"
              />
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                placeholder="Description"
              />
              <input
                type="text"
                value={updatedTags}
                onChange={(e) => setUpdatedTags(e.target.value)}
                placeholder="Tags (comma separated)"
              />
              <button className='savebtn' onClick={() => handleUpdateReport(report._id)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <>
              <h3 className="report-heading">{report.heading}</h3>
              <p><strong>Topic:</strong> {report.topic}</p>
              <div className="report-description">
                <strong>Description:</strong>
                <p>{report.description}</p>
              </div>
              <div className="report-tags">
                <strong>Tags:</strong>
                <p>{report.tags?.join(', ')}</p>
              </div>
              <div className="comment-input-container">
  <button onClick={() => handleCreateComment(report._id)}>Create Comment</button>
  <input
    type="text"
    placeholder="Write a comment..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
  />
</div>

              <button
                className="toggle-comments-btn"
                onClick={() => handleCommentsToggle(report._id)}
              >
                {comments[report._id] ? 'Hide Comments' : 'Show Comments'}
              </button>
              {comments[report._id] && (
                <div className="comments-section">
                {comments[report._id] && Array.isArray(comments[report._id]) ? (
  comments[report._id]
    .sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
    .map((comment) => (
      <div key={comment._id} className="comment">
        <div className="comment-avatar">{comment.createdBy?.username?.[0] || "U"}</div>
        <div className="comment-text">
          <p><strong>{comment.createdBy?.username || "Unknown"}:</strong> {comment.description}</p>
        </div>
        <button
          className={`upvote-btn ${JSON.parse(localStorage.getItem("upvotedComments"))?.includes(comment._id) ? "disabled" : ""}`}
          onClick={() => handleUpvote(comment._id, report._id)}
          disabled={JSON.parse(localStorage.getItem("upvotedComments"))?.includes(comment._id)}
        >
          <FaThumbsUp /> {comment.upvotes || 0}
        </button>
      </div>
    ))
) : (
  <p>No comments yet.</p>
)}

              </div>
              
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportsCard;
