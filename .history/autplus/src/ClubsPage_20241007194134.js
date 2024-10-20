import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./ClubPage.css";

const ClubsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubLocation, setClubLocation] = useState("");
  const [clubSchedule, setClubSchedule] = useState("");
  const [advertisements, setAdvertisements] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [joinedClubs, setJoinedClubs] = useState([]);

  // Load dark mode and joined clubs from localStorage when component mounts
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    const savedJoinedClubs = JSON.parse(localStorage.getItem("joinedClubs")) || [];
    setJoinedClubs(savedJoinedClubs);
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
    setAdvertisements([
      ...advertisements,
      { clubName, clubDescription, clubLocation, clubSchedule },
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

  const handleJoinClub = (club) => {
    if (!joinedClubs.some((c) => c.clubName === club.clubName)) {
      const updatedJoinedClubs = [...joinedClubs, club];
      setJoinedClubs(updatedJoinedClubs);
      localStorage.setItem("joinedClubs", JSON.stringify(updatedJoinedClubs));
    }
  };

  const isClubJoined = (clubName) => {
    return joinedClubs.some((club) => club.clubName === clubName);
  };

  return (
    <div className={`clubs-container ${darkMode ? "dark-mode" : ""}`}>
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
          <div className="dark-mode-toggle">
            <button onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
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
        <Link to="/joined-clubs">
          <button className="round-button clubs">Joined Clubs</button>
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
            <button type="submit" className="post-submit">
              Submit
            </button>
            <button
              type="button"
              className="post-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
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
              <p>
                <strong>Location:</strong> {ad.clubLocation}
              </p>
              <p>
                <strong>Schedule:</strong> {ad.clubSchedule}
              </p>
              <button
                onClick={() => handleJoinClub(ad)}
                disabled={isClubJoined(ad.clubName)}
              >
                {isClubJoined(ad.clubName) ? "Already Joined" : "Join Club"}
              </button>
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
