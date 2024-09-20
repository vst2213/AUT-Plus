import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./ClubPage.css"; // Ensure this includes your styles

const JoinedClubsPage = () => {
  // Replace this array with the actual list of joined clubs
  const joinedClubs = [
    {
      name: "Art Club",
      description: "A club for art lovers.",
      location: "Room 101",
      schedule: "Mondays at 4 PM",
    },
    {
      name: "Science Society",
      description: "Explore scientific wonders.",
      location: "WZ514",
      schedule: "Wednesdays at 5 PM",
    },
  ];

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
                <strong>{club.name}</strong>
              </div>
              <p>{club.description}</p>
              <p>
                <strong>Location:</strong> {club.location}
              </p>
              <p>
                <strong>Schedule:</strong> {club.schedule}
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
