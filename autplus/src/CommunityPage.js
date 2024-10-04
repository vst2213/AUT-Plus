import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./CommunityPage.css";
import { useReports } from "./ReportContext"; // Import the context

const CommunityPage = () => {
  const [post, setPost] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const { addReport } = useReports(); // Get addReport from context

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

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log("Post submitted:", post);
    setPost(""); // Clear the input after submission
  };

  // Handle reporting a user
  const handleReport = (user, comment) => {
    addReport(user, comment); // Pass both user and comment
    setIsReported(true);
    setTimeout(() => {
      alert(`${user} has been reported for unwanted behavior.`);
      setIsReported(false); // Reset the state for further reports
    }, 500);
  };

  return (
    <div className={`community-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
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

      {/* Navigation Bar */}
      <div className="top-nav">
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

      {/* Community Actions */}
      <div className="actions">
        <button className="round-button AUT">AUT</button>
        <Link to="/clubs">
          <button className="round-button clubs">Clubs</button>
        </Link>
      </div>

      <form className="post-form" onSubmit={handlePostSubmit}>
        <input
          type="text"
          className="post-input"
          placeholder="What's on your mind?"
          value={post}
          onChange={handlePostChange}
        />
        <button type="submit" className="post-submit">
          Post
        </button>
      </form>

      {/* Community Posts Section with Report Buttons */}
      <div className="section posts-section">
        <h2>Community Posts</h2>

        {/* Post from Alice */}
        <div className="post">
          <div className="post-header">
            <strong>Alice</strong>
            <small>2 hours ago</small>
          </div>
          <p>Hello, where can I join clubs?</p>
          <button
            className="report-button"
            onClick={() =>
              handleReport("Alice", "Hello, where can I join clubs?")
            }
            disabled={isReported}
          >
            {isReported ? "Reported" : "Report"}
          </button>
        </div>

        {/* Post from Bob */}
        <div className="post">
          <div className="post-header">
            <strong>Bob</strong>
            <small>1 hour ago</small>
          </div>
          <p>Welcome Alice! You can find clubs within the "Clubs" button.</p>
          <button
            className="report-button"
            onClick={() =>
              handleReport(
                "Bob",
                "Welcome Alice! You can find clubs within the 'Clubs' button."
              )
            }
            disabled={isReported}
          >
            {isReported ? "Reported" : "Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
