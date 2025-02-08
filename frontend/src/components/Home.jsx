import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import Filter from './Filter';
import './Home.css';
import ReportsCard from './ReportsCard';
import { Appcontext } from '../context/appcontext';

function Home() {
  const { reports } = useContext(Appcontext); 
  const [filters, setFilters] = useState(null); 

  const applyFilters = (filterData) => {
    const hasValidFilters = Object.values(filterData).some(value => value.trim() !== "");

    setFilters(hasValidFilters ? filterData : null);
    console.log("Filters Applied:", hasValidFilters ? filterData : "No filters, showing all reports");
  };

  const filteredReports = filters
    ? reports.filter(report => {
        const { topic, tags, username, professorEmail } = filters;
        const topicMatch = topic
          ? report.topic.toLowerCase().includes(topic.toLowerCase()) // Partial match for topic
          : true;

        const usernameMatch = username
          ? report.createdBy.username.toLowerCase().includes(username.toLowerCase())
          : true;

        const emailMatch = professorEmail
          ? report.createdBy.email.toLowerCase().includes(professorEmail.toLowerCase())
          : true;

        const tagsArray = tags ? tags.toLowerCase().split(',').map(tag => tag.trim()) : [];
        const tagsMatch = tagsArray.length > 0
          ? tagsArray.some(tag => report.tags.map(t => t.toLowerCase()).includes(tag))
          : true;

        return topicMatch && usernameMatch && emailMatch && tagsMatch;
      })
    : reports;
  return (
    <div className="home-container">
      <Navbar />
      <Filter onApplyFilter={applyFilters} />
      {filteredReports.length > 0 ? (
        filteredReports.map(report => (
          <ReportsCard reportKey={report._id} useremail={report.createdBy.email} />
        ))
      ) : (
        <p>No reports found.</p>
      )}
    </div>
  );
}

export default Home;
