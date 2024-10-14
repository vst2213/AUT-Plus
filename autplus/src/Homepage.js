import React, { useState, useEffect, useContext } from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import { ProfileContext } from "./ProfileContext"; // Import ProfileContext for profile picture

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
      {/* Header with Navigation */}
      <div className="header-nav">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          <Link to="/ProfilePage">
            <img src={profileImage} alt="Profile" className="profile-pic" />
          </Link>
          <div className="dark-mode-toggle">
            <button onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        <div className="nav-links">
          <Link to="/home">
            <FaHome className="nav-icon" />
          </Link>
          <Link to="/community">
            <FaCommentDots className="nav-icon" />
          </Link>
          <Link to="/calendar">
            <FaCalendarAlt className="nav-icon" />
          </Link>
          <Link to="/more">
            <FaBars className="nav-icon" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="section">
          <h2>What's On Next</h2>
          <div className="cards">
            <div className="card event-card">
              <span>September 17th: 8am-2pm</span>
              <p>COMP703/W201A - Research and Development Project Part 2</p>
              <span className="location">Offsite</span>
            </div>
            <div className="card event-card">
              <span>September 20th: 8am-2pm</span>
              <p>COMP703/W201A - Research and Development Project Part 2</p>
              <span className="location">WA220</span>
            </div>
          </div>
        </div>

        <div className="section news-section">
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