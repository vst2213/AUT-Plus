import React from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./Header.css"; // 필요한 스타일을 추가해

const Header = () => {
  return (
    <div className="header">
      <div className="left-header">
        <img src="path/to/aut-logo.png" alt="AUT Logo" className="logo" />
      </div>
      <div className="right-header">
        <img src="path/to/profile-pic.png" alt="Profile" className="profile-pic" />
      </div>
      {/* Navigation Bar as Top Headers */}
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
        <Link to="/more">
          <FaBars className="nav-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
