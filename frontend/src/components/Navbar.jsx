import React, { useState } from "react";
import "./Navbar.css";  
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("professor");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
    
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    console.log("Filter by:", e.target.value);
  
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo-container">
        <img
          src="images/manit logo.jpg"  
          alt="Logo"
          className="navbar-logo"
        />
        <div className="navbar-logo-text">MANIT</div>
      </div>

      <div className="navbar-items">
       
        <form onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <select
          className="filter-dropdown"
          onChange={handleFilterChange}
          value={selectedFilter}
        >
          <option className="filter-option" value="professor">Professor</option>
          <option className="filter-option" value="topic">Topics</option>
          <option className="filter-option" value="comments">Comments</option>
          <option className="filter-option" value="leaderboard">Leaderboard</option>
        </select>
        <button className="nav-button" onClick={() => console.log("Finding Professors")}>Find Professors</button>
        <button className="nav-button" onClick={() => console.log("View Research Topics")}>Topics</button>
        <button className="nav-button" onClick={() => console.log("View Comments")}>Comments</button>
        <button className="nav-button" onClick={() => console.log("Leaderboard")}>Leaderboard</button>
      </div>
    </div>
  );
};

export default Navbar;
