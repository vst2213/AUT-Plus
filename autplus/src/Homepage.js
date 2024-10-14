import React, { useState, useEffect, useContext } from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import { ProfileContext } from "./ProfileContext";

const HomePage = () => {
  const { profileImage } = useContext(ProfileContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

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
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          <Link to="/ProfilePage">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-pic clickable"
            />
          </Link>
          <div className="dark-mode-toggle">
            <button onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <Link to="/home" className="nav-item">
          <FaHome className="nav-icon" />
        </Link>
        <Link to="/community" className="nav-item">
          <FaCommentDots className="nav-icon" />
        </Link>
        <Link to="/calendar" className="nav-item">
          <FaCalendarAlt className="nav-icon" />
        </Link>
        <Link to="/more" className="nav-item">
          <FaBars className="nav-icon" />
        </Link>
      </div>

      {/* Content Section */}
      <div className="content">
        <h2>What's On Next</h2>
        <div className="cards">
          <div className="card">
            <span>September 17th: 8am-2pm</span>
            <p>COMP703/W201A - Research and Development Project Part 2</p>
            <span className="location">Offsite</span>
          </div>
          <div className="card">
            <span>September 20th: 8am-2pm</span>
            <p>COMP703/W201A - Research and Development Project Part 2</p>
            <span className="location">WA220</span>
          </div>
        </div>

        <div className="news-section">
          <h2>News</h2>
          <div className="news-card">
            <h3>Academic Integrity Important Notice</h3>
            <p>YouTutor Alert: Important notice for students</p>
            <small>3 days ago</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;