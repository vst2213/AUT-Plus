import React from "react";
import "./Homepage.css";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="home-container">
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
        </div>
      </div>

      {/* Navigation Bar as Top Headers */}
      <div className="top-nav">
        <FaHome className="nav-icon" />
        <FaCommentDots className="nav-icon" />
        <FaCalendarAlt className="nav-icon" />
        <FaBars className="nav-icon" />
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