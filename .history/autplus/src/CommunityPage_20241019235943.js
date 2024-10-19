import React, { useState } from "react";
import "./CommunityPage.css";

const CommunityPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`community-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <header className="header">
        <h1 className="community-title">Community Forum</h1>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Sidebar and Main Content */}
      <div className="content-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <a href="#home">Home</a>
            <a href="#community">Community</a>
            <a href="#calendar">Calendar</a>
            <a href="#more">More</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <section className="posts-section">
            <h2>Community Posts</h2>

            {/* Post Card */}
            <article className="post-card">
              <div className="post-header">
                <strong>Alice </strong>
                <small>2 hours ago</small>
              </div>
              <p>Where can I find the club signup page?</p>
              <button className="report-button">Report</button>
            </article>

            <article className="post-card">
              <div className="post-header">
                <strong>Bob </strong>
                <small>1 hour ago</small>
              </div>
              <p>You can find it under the Clubs section in the navigation.</p>
              <button className="report-button">Report</button>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
