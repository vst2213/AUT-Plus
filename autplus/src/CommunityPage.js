import React, { useState } from "react";
import "./CommunityPage.css";
import { Link } from 'react-router-dom';
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const CommunityPage = () => {
  const [post, setPost] = useState("");

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Handle the submission of the post here
    console.log("Post submitted:", post);
    setPost(""); // Clear the input after submission
  };

  return (
    <div className="community-container">
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

      {/* Community Actions and Input */}
      <div className="actions">
        <button className="round-button AUT">AUT</button>
        <button className="round-button clubs">Clubs</button>
      </div>

      <form className="post-form" onSubmit={handlePostSubmit}>
        <input
          type="text"
          className="post-input"
          placeholder="What's on your mind?"
          value={post}
          onChange={handlePostChange}
        />
        <button type="submit" className="post-submit">Post</button>
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
