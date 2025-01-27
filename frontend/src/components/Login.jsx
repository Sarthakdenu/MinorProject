import React, { useState, useContext } from 'react';
import { FaUserTie, FaPhoneVolume, FaFacebook, FaAddressBook, FaGoogle } from 'react-icons/fa';
import { MdAttachEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Appcontext } from '../context/appcontext';
import './Login.css';

function Login() {
  const { loginData, setLoginData, signupData, setSignupData, user, setuser } = useContext(Appcontext);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOnLogin = () => {
    setIsSignup(false);
  };

  const handleOnSignup = () => {
    setIsSignup(true);
  };

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'login') {
      setLoginData({ ...loginData, [name]: value });
    } else if (type === 'signup') {
      setSignupData({ ...signupData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
          role: signupData.role,
          mobileNo: signupData.phone,
        }),
      });

      const data = await response.json();
      console.log(data.data.token)
      localStorage.setItem('jwt', data.data.token);
      console.log("hello vyas" + localStorage.getItem('jwt'))
      if (response.ok && data.success) {
        toast.success('User registered successfully');
        setuser({
          username: signupData.username,
          email: signupData.email,
          role: signupData.role,
          jwt: data.token || "",
        });
        
        
        
        setSignupData({ username: "", email: "", password: "", phone: "", role: "" }); 
      } else {
        toast.error(data.message || 'Failed to register');
      }
    } catch (error) {
      toast.error('Error during registration');
    }
  };

  const handleloginsubmission = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");
    console.log(token)
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        <Navigate to="/home" />
        toast.success('User logged in successfully');
        setIsLoggedIn(true);
        setuser({
          username: data.user.username,
          email: data.user.email,
          role: data.user.role,
          jwt: data.token,
        });
        localStorage.setItem('jwt', data.token);
        setLoginData({ email: "", password: "" });
        
      } else {
        toast.error(data.message || 'Failed to login');
      }
    } catch (err) {
      toast.error('Error during login');
    }
};

if (isLoggedIn) {
  return <Navigate to="/home" />;
}

  return (
    <div id="mainloginpage">
      <ToastContainer />
      <div id="headingbox">
        <div id="heads">Manit Research System</div>
        <div className='m-3'>
          <img src="images/manit logo.jpg" alt="logo" />
        </div>
        <div className="food-phrase">
          <div className="explore">Explore</div>
          <div className="the">the</div>
          <div className="best">best</div>
          <div className="reserach">research</div>
          <div className="opportunities">opportunities...</div>
        </div>
      </div>

      <div id="loginwinodow">
        <div id="loginsignupoptions">
          <div onClick={handleOnLogin}>Login</div>
          <div onClick={handleOnSignup}>Signup</div>
        </div>
        
        {!isSignup ? (
          <>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <MdAttachEmail />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter the email"
                name="email"
                value={loginData.email}
                onChange={(e) => handleChange(e, 'login')}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <RiLockPasswordFill />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter the password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleChange(e, 'login')}
              />
            </div>
          </>
        ) : (
          <>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <FaUserTie />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Username"
                name="username"
                value={signupData.username}
                onChange={(e) => handleChange(e, 'signup')}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <MdAttachEmail />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter the email"
                name="email"
                value={signupData.email}
                onChange={(e) => handleChange(e, 'signup')}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <RiLockPasswordFill />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Create password"
                name="password"
                value={signupData.password}
                onChange={(e) => handleChange(e, 'signup')}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <FaPhoneVolume />
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the phone number"
                name="phone"
                value={signupData.phone}
                onChange={(e) => handleChange(e, 'signup')}
              />
            </div>
            <select
              className="form-select"
              name="role"
              value={signupData.role}
              onChange={(e) => handleChange(e, 'signup')}
            >
              <option value="" disabled>Select the Role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="Professor">Professor</option>
            </select>
          </>
        )}

        <div id="submitbutton">
          {isSignup ? (
            <button type="button" className="btn btn-danger" onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <button type="button" className="btn btn-danger" onClick={handleloginsubmission}>
              Submit
            </button>
          )}
        </div>

        <div id="extralogin" className='flex-col'>
          <button type="button" className="btn btn-success flex m-2">
            Sign in with Google
          </button>
          <button type="button" className="btn btn-primary flex m-2">
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
