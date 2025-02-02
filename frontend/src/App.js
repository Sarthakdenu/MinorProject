import React from 'react'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home'
import UserProfile from './components/UserProfile';
import ReportsCard from './components/ReportsCard';
function App() {
  return (
   
    <Router>
      <div >
        <nav id='navbar'>
          <ul>
            <li>
              <Link to="/">LOGIN</Link>
            </li>
            <li>
              <Link to="/home">HOME</Link></li>
              <li>
              <Link to="/profile">PROFILE</Link></li>
              <li>
              <Link to="/report">REPORT</Link></li>
              
             
          </ul>
        </nav>
        

         <Routes>
        <Route path="/"  element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<UserProfile/>} />
        <Route path='/report' element={<ReportsCard/>}/>
       
        </Routes>
        <div class="footer">
        <p>&copy; 2024 Your App. All rights reserved.</p>
    </div>
      </div>
    </Router>

  )
}

export default App
