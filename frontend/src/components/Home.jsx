import React , { useState }from 'react';
import Navbar from './Navbar';
import Filter from './Filter';
import './Home.css';  
import ReportsCard from './ReportsCard';

function Home() {
  const [filters, setFilters] = useState({});

  const applyFilters = (filterData) => {
    setFilters(filterData); 
    console.log("Applied Filters:", filterData);
  };
  return (
    <div className="home-container">
      <Navbar />
      <Filter onApplyFilter={applyFilters} />
      <ReportsCard useremail="sarath@gmail.com"/>
    </div>
  );
}

export default Home;
