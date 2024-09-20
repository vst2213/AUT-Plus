import React from "react";
import "./MyDetails.css";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const MyDetails = () => {
  return (
    <div className="details-container">
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

      <h2>My Details</h2>
      <div className="details-form">
        <label>Title:</label>
        <input type="text" placeholder="Enter your title" />
        <label>First Name:</label>
        <input type="text" placeholder="Enter your first name" />
        <label>Last Name:</label>
        <input type="text" placeholder="Enter your last name" />
        <label>Points:</label>
        <span>100</span> {/* Points 글자 추가 */}
      </div>
    </div>
  );
};

export default MyDetails;
