import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhoneAlt, FaUserTie, FaUser, FaBriefcase, FaRegBuilding, FaIdCard, FaChalkboardTeacher, FaGraduationCap, FaTools, FaEdit, FaPlusCircle } from 'react-icons/fa';
import './UserProfile.css'; 
import ReportsCard from './ReportsCard';
import Navbar from './Navbar';

const UserProfile = () => {
  const email = localStorage.getItem('email'); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [isCreatingReport, setIsCreatingReport] = useState(false); 
  const [updatedUser, setUpdatedUser] = useState({}); 
  const [newReport, setNewReport] = useState({ heading: '', topic: '', description: '', tags: [] });  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/findUserByEmail', {
          email,
        });
        setUser(response.data.user);
        setUpdatedUser(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleReportChange = (e) => {  
    const { name, value } = e.target;
    setNewReport({
      ...newReport,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3001/api/updateUser', { email, ...updatedUser });
      setUser(updatedUser);  
      setIsEditing(false);   
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating user');
    }
  };

  const handleReportSubmit = async (e) => {  
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/createReport', { email, ...newReport });
      setIsCreatingReport(false);  
      alert("Report created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating report');
    }
  };

  if (loading) return <p>Loading user information...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <><Navbar/>
    <div className="user-profile">
      
      <div className="dashboard-container">
        <div className="profile-header">
          <img
            src={user.imageUrl || 'default-profile.png'}
            alt="User"
            className="profile-image"
          />
          <div className="profile-summary">
            <h2>{user.username}</h2>
         
            <div className="edit-button">
              <button
                className="edit-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FaEdit /> Edit Profile
              </button>
              <button
                className="edit-btn"
                onClick={() => setIsCreatingReport(!isCreatingReport)}  
              >
                <FaPlusCircle /> Create Report
              </button>
            </div>
          </div>
        </div>

        <div className="profile-details">
         
          <div className="profile-card">
            <FaEnvelope className="icon" />
            <div className="card-info">
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
          <div className="profile-card">
            <FaUser className="icon" />
            <div className="card-info">
              <p><strong>Username:</strong> {user.username}</p>
            </div>
          </div>
          <div className="profile-card">
            <FaPhoneAlt className="icon" />
            <div className="card-info">
              <p><strong>Mobile No:</strong> {user.mobileNo}</p>
            </div>
          </div>
          <div className="profile-card">
            <FaBriefcase className="icon" />
            <div className="card-info">
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          </div>
          <div className="profile-card">
            <FaIdCard className="icon" />
            <div className="card-info">
              <p><strong>Aadhar No:</strong> {user.adharNo}</p>
            </div>
          </div>
          <div className="profile-card">
            <FaUserTie className="icon" />
            <div className="card-info">
              <p><strong>Designation:</strong> {user.designation}</p>
            </div>
          </div>
          <div className="profile-card">
            <FaChalkboardTeacher className="icon" />
            <div className="card-info">
              <p><strong>Teaching Sector:</strong> {user.teachingSector}</p>
            </div>
          </div>
          <div className="profile-card">
            <FaGraduationCap className="icon" />
            <div className="card-info">
              <p><strong>Scholar No:</strong> {user.scholarNo}</p>
            </div>
          </div>
          <div className="profile-card">
            <FaTools className="icon" />
            <div className="card-info">
              <p><strong>Skills:</strong> {user.skills}</p>
            </div>
          </div>
          <div className="profile-card">
            <FaRegBuilding className="icon" />
            <div className="card-info">
              <p><strong>Office Location:</strong> {user.officeLocation}</p>
            </div>
          </div>
          <div className="profile-card">
            <FaPhoneAlt className="icon" />
            <div className="card-info">
              <p><strong>Office Phone:</strong> {user.officePhone}</p>
            </div>
          </div>
          <div className="profile-card">
            <div></div>
            <div className="card-info-signoutbtn">
              <p><strong> Sign Out</strong></p>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="update-form-container">
          <h2>Update Profile</h2>
          <form className="update-form" onSubmit={handleSubmit}>
            <label><FaEnvelope /> Email</label>
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              disabled
            />
            <label><FaUser /> Username</label>
            <input
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleChange}
            />
            <label><FaPhoneAlt /> Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              value={updatedUser.mobileNo}
              onChange={handleChange}
            />
            <label><FaBriefcase /> Role</label>
            <input
              type="text"
              name="role"
              value={updatedUser.role}
              onChange={handleChange}
            />
            <label><FaIdCard /> Aadhar No</label>
            <input
              type="text"
              name="adharNo"
              value={updatedUser.adharNo}
              onChange={handleChange}
            />
            <label><FaUserTie /> Designation</label>
            <input
              type="text"
              name="designation"
              value={updatedUser.designation}
              onChange={handleChange}
            />
            <label><FaChalkboardTeacher /> Teaching Sector</label>
            <input
              type="text"
              name="teachingSector"
              value={updatedUser.teachingSector}
              onChange={handleChange}
            />
            <label><FaGraduationCap /> Scholar No</label>
            <input
              type="text"
              name="scholarNo"
              value={updatedUser.scholarNo}
              onChange={handleChange}
            />
            <label><FaTools /> Skills</label>
            <input
              type="text"
              name="skills"
              value={updatedUser.skills}
              onChange={handleChange}
            />
            <label><FaRegBuilding /> Office Location</label>
            <input
              type="text"
              name="officeLocation"
              value={updatedUser.officeLocation}
              onChange={handleChange}
            />
            <label><FaPhoneAlt /> Office Phone</label>
            <input
              type="text"
              name="officePhone"
              value={updatedUser.officePhone}
              onChange={handleChange}
            />
            <button type="submit" className="submit-btn">Update</button>
          </form>
        </div>
      )}
      {isCreatingReport && (
        <div className="create-report-form-container">
          <h2 >Create Report</h2>
          <form className="create-report-form" onSubmit={handleReportSubmit}>
            <label><FaRegBuilding /> Heading</label>
            <input
              type="text"
              name="heading"
              value={newReport.heading}
              onChange={handleReportChange}
            />
            <label><FaChalkboardTeacher /> Topic</label>
            <input
              type="text"
              name="topic"
              value={newReport.topic}
              onChange={handleReportChange}
            />
            <label><FaChalkboardTeacher /> Description</label>
            <textarea
              name="description"
              value={newReport.description}
              onChange={handleReportChange}
            />
            <label><FaTools /> Tags</label>
            <input
              type="text"
              name="tags"
              value={newReport.tags.join(', ')}
              onChange={(e) => handleReportChange({ target: { name: 'tags', value: e.target.value.split(', ') } })}
            />
            <button type="submit" className="submit-btn-report">Create Report</button>
          </form>
        </div>
      )}
      <ReportsCard />
    </div>
    </>
  );
};

export default UserProfile;
