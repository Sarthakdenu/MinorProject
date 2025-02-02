import React, { useState } from 'react';
import './Filter.css'; 
import { FaUser, FaTag, FaSearch, FaEnvelope } from 'react-icons/fa';  

const Filter = ({ onApplyFilter }) => {
  const [filters, setFilters] = useState({
    professorEmail: '',
    topic: '',
    tags: '',
    username: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleApply = () => {
    onApplyFilter(filters);  
  };

  return (
    <div className="filter-container">
      
      <div className="filter-item">
        <FaEnvelope className="filter-icon" />
        <input
          type="text"
          name="professorEmail"
          value={filters.professorEmail}
          onChange={handleChange}
          placeholder="Filter by Professor (Email)"
        />
      </div>

    
      <div className="filter-item">
        <FaSearch className="filter-icon" />
        <input
          type="text"
          name="topic"
          value={filters.topic}
          onChange={handleChange}
          placeholder="Filter by Topic"
        />
      </div>

      <div className="filter-item">
        <FaTag className="filter-icon" />
        <input
          type="text"
          name="tags"
          value={filters.tags}
          onChange={handleChange}
          placeholder="Filter by Tags (comma separated)"
        />
      </div>

      <div className="filter-item">
        <FaUser className="filter-icon" />
        <input
          type="text"
          name="username"
          value={filters.username}
          onChange={handleChange}
          placeholder="Filter by Username"
        />
      </div>

      <button className="apply-filters-btn" onClick={handleApply}>
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
