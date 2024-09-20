import React from "react";
import "./Morepage.css"; // 경로 확인
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; 
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const MorePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); 
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="more-container">
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

      <h2>More Options</h2>
      <div className="options">
        <button onClick={() => navigate("/my-details")}>My AUT</button>
        <button onClick={() => navigate("/make-booking")}>Make a Booking</button>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MorePage;