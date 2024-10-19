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

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log("Post submitted:", post);
    setPost("");
  };

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
        <div className="header-content">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
          <h1 className="community-title">Community Forum</h1>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      {/* Sidebar and Main Content Layout */}
      <div className="content-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <Link to="/home">
              <FaHome className="nav-icon" /> Home
            </Link>
            <Link to="/community">
              <FaCommentDots className="nav-icon" /> Community
            </Link>
            <Link to="/calendar">
              <FaCalendarAlt className="nav-icon" /> Calendar
            </Link>
            <Link to="/more">
              <FaBars className="nav-icon" /> More
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Post Form */}
          <form className="post-form" onSubmit={handlePostSubmit}>
            <textarea
              className="post-input"
              placeholder="What's on your mind?"
              value={post}
              onChange={handlePostChange}
            />
            <button type="submit" className="post-submit">
              Post
            </button>
          </form>

          {/* Forum Posts */}
          <section className="posts-section">
            <h2>Community Posts</h2>

            {/* Post from Alice */}
            <article className="post-card">
              <div className="post-header">
                <strong>Alice </strong>
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
            </article>

            {/* Post from Bob */}
            <article className="post-card">
              <div className="post-header">
                <strong>Bob </strong>
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
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
