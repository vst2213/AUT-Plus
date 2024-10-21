import React, { useState, useEffect, useContext } from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import { ProfileContext } from "./ProfileContext"; // Import ProfileContext for profile picture

const HomePage = () => {
  const { profileImage } = useContext(ProfileContext); // Access profile image from context
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
      <header className="header">
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
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="top-nav">
        <Link to="/home" aria-label="Home">
          <FaHome className="nav-icon" />
        </Link>
        <Link to="/community" aria-label="Community">
          <FaCommentDots className="nav-icon" />
        </Link>
        <Link to="/calendar" aria-label="Calendar">
          <FaCalendarAlt className="nav-icon" />
        </Link>
        <Link to="/more" aria-label="More">
          <FaBars className="nav-icon" />
        </Link>
      </nav>

      {/* What's On Next Section */}
      <section className="section">
        <h2>What's On Next</h2>
        <div className="cards">
          <Link
            to="/calendar"
            className="card event-card"
            aria-label="Event on September 17th"
          >
            <span>September 17th: 8am-2pm</span>
            <p>COMP703/W201A - Research and Development Project Part 2</p>
            <span className="location">Offsite</span>
          </Link>
          <Link
            to="/calendar"
            className="card event-card"
            aria-label="Event on September 20th"
          >
            <span>September 20th: 8am-2pm</span>
            <p>COMP703/W201A - Research and Development Project Part 2</p>
            <span className="location">WA220</span>
          </Link>
        </div>
      </section>

      {/* News Section */}
      <section className="section news-section">
        <h2>News</h2>
        <div className="news-card">
          <h3>Academic Integrity Important Notice</h3>
          <p>YouTutor Alert: Important notice for students</p>
          <small>3 days ago</small>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
