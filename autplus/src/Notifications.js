import React, { useEffect } from "react";
import "./Notifications.css"; 
import { Link, useNavigate } from "react-router-dom"; 
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const Notifications = ({ bookingDetails, notificationDetails }) => {
  const navigate = useNavigate(); 

  // Check for dark mode preference on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    document.body.className = savedMode ? "dark" : "light";
  }, []);

 
  const handleBackClick = () => {
    navigate("/more");
  };

  return (
    <div className="notifications-container">
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header"></div>
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
        <Link to="/more">
          <FaBars className="nav-icon" />
        </Link>
      </div>

      {/* Back 버튼 */}
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>

      <h2>Notifications</h2>

      {/* Booking Notifications */}
      <div className="booking-notification">
        {bookingDetails.length > 0 ? (
          bookingDetails.map((booking, index) => (
            <p key={index}>
              {`Your booking has been confirmed: ${booking.room} at ${booking.time}`}
            </p>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>

      {/* Class Notifications */}
      <h3>Class Notifications</h3>
      <div className="class-notification">
        {notificationDetails.length > 0 ? (
          notificationDetails.map((notification, index) => (
            <p key={index}>
              {`Upcoming Class: ${notification.name} on ${notification.date}`}
            </p>
          ))
        ) : (
          <p>No class notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
