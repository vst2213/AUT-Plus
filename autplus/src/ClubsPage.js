import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./ClubPage.css"; // Make sure the styles are in ClubPage.css

const ClubsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubLocation, setClubLocation] = useState("");
  const [clubSchedule, setClubSchedule] = useState("");
  const [advertisements, setAdvertisements] = useState([]);

  const handleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdvertisements([
      ...advertisements,
      { clubName, clubDescription, clubLocation, clubSchedule }
    ]);
    setClubName("");
    setClubDescription("");
    setClubLocation("");
    setClubSchedule("");
    setIsFormVisible(false);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="clubs-container"> {/* Updated class name for styling */}
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="path/to/aut-logo.png" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          <img src="path/to/profile-pic.png" alt="Profile" className="profile-pic" />
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

      {/* Advertisements Section */}
      <div className="posts-section">
        <h2>Club Advertisements</h2>
        {advertisements.length > 0 ? (
          advertisements.map((ad, index) => (
            <div key={index} className="post">
              <div className="post-header">
                <strong>{ad.clubName}</strong>
              </div>
              <p>{ad.clubDescription}</p>
              <p><strong>Location:</strong> {ad.clubLocation}</p>
              <p><strong>Schedule:</strong> {ad.clubSchedule}</p>
            </div>
          ))
        ) : (
          <div className="post">
            <div className="post-header">
              <strong>No Advertisements Available</strong>
            </div>
            <p>Create a new club post to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubsPage;
