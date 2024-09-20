import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { Link } from 'react-router-dom'; 
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const HomePage = () => {
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
    <div className={`home-container ${darkMode ? "dark-mode" : ""}`}>
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

      {/* Navigation Bar as Top Headers */}
      <div className="top-nav">
        <Link to="/Home">
          <FaHome className="nav-icon" />
        </Link>
        <Link to="/Community">
          <FaCommentDots className="nav-icon" />
        </Link>
        <Link to="/Calendar">
          <FaCalendarAlt className="nav-icon" />
        </Link>
        <Link to="/More"> {/* More page link */}
          <FaBars className="nav-icon" />
        </Link>
      </div>

      {/* What's On Next Section */}
      <div className="section">
        <h2>What's On Next</h2>
        <div className="cards">
          <div className="card event-card">
            <span>September 17th: 8am-2pm</span>
            <p>COMP703/W201A - Research and Development Project Part 2</p>
            <span className="location">offsite</span>
          </div>
          <div className="card event-card">
            <span>September 20th: 8am-2pm</span>
            <p>COMP703/W201A - Research and Development Project Part 2</p>
            <span className="location">WA220</span>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="section news-section">
        <h2>News</h2>
        <div className="news-card">
          <h3>Academic Integrity Important Notice</h3>
          <p>YouTutor Alert: Important notice for students</p>
          <small>3 days ago</small>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
