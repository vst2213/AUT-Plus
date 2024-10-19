import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./CommunityPage.css";
import { useReports } from "./ReportContext";

const CommunityPage = () => {
  const [post, setPost] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const { addReport, reports } = useReports();

  // Load dark mode state from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  // Handle post input change
  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  // Handle post submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log("Post submitted:", post);
    setPost("");
  };

  // Handle reporting a user
  const handleReport = (user, comment) => {
    addReport(user, comment);
    setIsReported(true);
    setTimeout(() => {
      alert(`${user} has been reported for unwanted behavior.`);
      setIsReported(false);
    }, 500);
  };

  return (
    <div className={`community-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <header className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          <div className="dark-mode-toggle">
            <button onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="top-nav">
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
      </nav>

      {/* Community Actions */}
      <div className="actions">
        <button className="round-button AUT">AUT</button>
        <Link to="/clubs">
          <button className="round-button clubs">Clubs</button>
        </Link>
      </div>

      {/* Post Form */}
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

      {/* Community Posts Section */}
      <section className="section posts-section">
        <h2>Community Posts</h2>

        {/* Post 1: Alice */}
        <article className="post">
          <header className="post-header">
            <strong>Alice </strong>
            <small>2 hours ago</small>
          </header>
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
        </article>

        {/* Post 2: Bob */}
        <article className="post">
          <header className="post-header">
            <strong>Bob </strong>
            <small>1 hour ago</small>
          </header>
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
        </article>
      </section>
    </div>
  );
};

export default CommunityPage;
