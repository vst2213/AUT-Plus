import React from "react";
import "./Notifications.css"; // 스타일 파일 추가
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const Notifications = ({ bookingDetails }) => {
  return (
    <div className="notifications-container">
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

      <h2>Notifications</h2>

      {/* Booking Notification */}
      <div className="booking-notification">
        {bookingDetails ? (
          <p>{`Your booking has been confirmed: ${bookingDetails.room} at ${bookingDetails.time}`}</p>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
