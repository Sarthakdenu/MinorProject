import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReportsCard.css';
import { FaEdit } from 'react-icons/fa';  

const ReportsCard = ({useremail}) => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingReport, setEditingReport] = useState(null); 
  const [updatedHeading, setUpdatedHeading] = useState('');
  const [updatedTopic, setUpdatedTopic] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedTags, setUpdatedTags] = useState('');

  const email = useremail|| localStorage.getItem('email'); 

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

  const handleCancelEdit = () => {
    setEditingReport(null);
  };

  if (loading) return <div>Loading reports...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="reports-container">
      {reports.map((report) => (
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
              <button
                className="toggle-comments-btn"
                onClick={() => handleCommentsToggle(report._id)}
              >
                {comments[report._id] ? 'Hide Comments' : 'Show Comments'}
              </button>
              {comments[report._id] && (
                <div className="comments-section">
                  {comments[report._id].map((comment) => (
                    <div key={comment._id} className="comment">
                      <div className="comment-avatar"></div>
                      <div className="comment-text">
                        <p><strong>{comment.createdBy.username}:</strong> {comment.description}</p>
                      </div>
                    </div>
                  ))}
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
