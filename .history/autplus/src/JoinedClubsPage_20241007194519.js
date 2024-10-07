import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./ClubPage.css"; // Ensure this includes your styles

const JoinedClubsPage = () => {
  const [joinedClubs, setJoinedClubs] = useState([]);

  // Load joined clubs from localStorage when the component mounts
  useEffect(() => {
    const savedJoinedClubs = JSON.parse(localStorage.getItem("joinedClubs")) || [];
    setJoinedClubs(savedJoinedClubs);
  }, []);

  return (
    <div className="clubs-container">
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
        </div>
      </div>

      {/* Navigation Bar */}
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

      {/* Joined Clubs Section */}
      <div className="posts-section">
        <h2>Joined Clubs</h2>
        {joinedClubs.length > 0 ? (
          joinedClubs.map((club, index) => (
            <div key={index} className="post">
              <div className="post-header">
                <strong>{club.clubName}</strong>
              </div>
              <p>{club.clubDescription}</p>
              <p>
                <strong>Location:</strong> {club.clubLocation}
              </p>
              <p>
                <strong>Schedule:</strong> {club.clubSchedule}
              </p>
            </div>
          ))
        ) : (
          <div className="post">
            <div className="post-header">
              <strong>No Joined Clubs Available</strong>
            </div>
            <p>Join a club to see your joined clubs here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedClubsPage;
