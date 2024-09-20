import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./CommunityPage.css";

const CommunityPage = () => {
  const [post, setPost] = useState("");
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

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log("Post submitted:", post);
    setPost(""); // Clear the input after submission
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
        <Link to="/more">
          {" "}
          {/* "More" 페이지로 링크 추가 */}
          <FaBars className="nav-icon" />
        </Link>
      </div>

      {/* Community Actions and Input */}
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

      {/* Example User Posts */}
      <div className="section posts-section">
        <h2>Community Posts</h2>
        <div className="post">
          <div className="post-header">
            <strong>Alice</strong>
            <small>2 hours ago</small>
          </div>
          <p>Hello, where can I join clubs?</p>
        </div>
        <div className="post">
          <div className="post-header">
            <strong>Bob</strong>
            <small>1 hour ago</small>
          </div>
          <p>Welcome Alice! You can find clubs within the "Clubs" button.</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
