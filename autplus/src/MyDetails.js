import React, { useState, useEffect } from "react";
import "./MyDetails.css"; 
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const MyDetails = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode state from localStorage when the component mounts
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  // Save dark mode state to localStorage when it changes
  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);
    localStorage.setItem("darkMode", newDarkModeState);
  };

  return (
    <div className={`details-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="path/to/aut-logo.png" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          <img
            src="path/to/profile-pic.png"
            alt="Profile"
            className="profile-pic"
          />
          {/* Dark Mode Toggle Button */}
          <div className="dark-mode-toggle">
            <button onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <div className="top-nav">
        <Link to="/Home">
          <FaHome className="nav-icon" />
        </Link>
        <Link to="/community">
          <FaCommentDots className="nav-icon" />
        </Link>
        <Link to="/calendar">
          <FaCalendarAlt className="nav-icon" />
        </Link>
        <FaBars className="nav-icon" />
      </div>

      <h2>My Details</h2>
      <div className="details-form">
        <label>Title:</label>
        <input type="text" placeholder="Enter your title" />
        
        <label>First Name:</label>
        <input type="text" placeholder="Enter your first name" />
        
        <label>Last Name:</label>
        <input type="text" placeholder="Enter your last name" />

        <label>Points:</label>
        <span>100</span> {/* Display Points */}
      </div>
    </div>
  );
};

export default MyDetails;
