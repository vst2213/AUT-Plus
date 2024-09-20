import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./ClubPage.css";

const ClubsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubLocation, setClubLocation] = useState("");
  const [clubSchedule, setClubSchedule] = useState("");
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

  const handleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Club Advertisement Submitted:", {
      clubName,
      clubDescription,
      clubLocation,
      clubSchedule
    });
    setIsFormVisible(false); // Hide form after submission
  };

  const handleCancel = () => {
    setIsFormVisible(false); // Hide form and stay on the page
  };

  return (
    <div className={`club-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="path/to/aut-logo.png" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          <img src="path/to/profile-pic.png" alt="Profile" className="profile-pic" />
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
        <Link to="/community">
          <FaCommentDots className="nav-icon" />
        </Link>
        <Link to="/calendar">
          <FaCalendarAlt className="nav-icon" />
        </Link>
        <FaBars className="nav-icon" />
      </div>

      {/* Clubs Actions */}
      <div className="actions">
        <button className="round-button AUT" onClick={handleFormVisibility}>
          Create Club Post
        </button>
        <Link to="/clubs">
          <button className="round-button clubs">
            Joined Clubs
          </button>
        </Link>
      </div>

      {/* Form for Creating Club Advertisement */}
      {isFormVisible && (
        <form className="post-form" onSubmit={handleSubmit}>
          <div>
            <label>
              Club Name:
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Club Description:
              <textarea
                value={clubDescription}
                onChange={(e) => setClubDescription(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Club Location:
              <input
                type="text"
                value={clubLocation}
                onChange={(e) => setClubLocation(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Club Schedule:
              <input
                type="text"
                value={clubSchedule}
                onChange={(e) => setClubSchedule(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-buttons">
            <button type="submit" className="post-submit">Submit</button>
            <button type="button" className="post-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      {/* Example Advertisement */}
      <div className="section posts-section">
        <h2>Advertisements</h2>
        <div className="post">
          <div className="post-header">
            <strong>Club123</strong>
          </div>
          <p>We are the 123 Club.</p>
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;
