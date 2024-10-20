import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./MyDetails.css";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const MyDetails = () => {
  const navigate = useNavigate(); 

  // State to manage user details
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Load saved details from localStorage when component mounts
  useEffect(() => {
    const savedTitle = localStorage.getItem("title") || "";
    const savedFirstName = localStorage.getItem("firstName") || "";
    const savedLastName = localStorage.getItem("lastName") || "";
    setTitle(savedTitle);
    setFirstName(savedFirstName);
    setLastName(savedLastName);
  }, []);

  // Save details to localStorage
  const handleSave = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    alert("Details saved successfully!");
  };

  // Navigate back to the MorePage
  const handleBackClick = () => {
    navigate("/more");
  };

  return (
    <div className="details-container">
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          {/* Optional Profile Picture */}
          <img src="/pictures/profile-pic.jpeg" alt="Profile" className="profile-pic" />
        </div>
      </div>

      {/* Top Navigation Bar */}
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

      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>

      {/* User Details Form */}
      <h2>My Details</h2>
      <div className="details-form">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your title"
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />

        <label>Points:</label>
        <span>100</span>

        {/* Save Button */}
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default MyDetails;