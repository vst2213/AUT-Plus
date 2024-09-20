import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./MakeBooking.css";

const MakeBooking = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    room: "",
    date: "",
    time: "",
    purpose: ""
  });

  // Load dark mode state from localStorage when the component mounts
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  // Save dark mode state to localStorage when it changes
  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);
    localStorage.setItem("darkMode", newDarkModeState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", bookingDetails);
    // Reset form after submission
    setBookingDetails({
      room: "",
      date: "",
      time: "",
      purpose: ""
    });
  };

  return (
    <div className={`make-booking-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="path/to/aut-logo.png" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          <img src="path/to/profile-pic.png" alt="Profile" className="profile-pic" />
          {/* Dark Mode Toggle Button */}
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

      {/* Make a Booking Form */}
      <div className="booking-section">
        <h2>Make a Booking</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="room">Room:</label>
            <input
              type="text"
              id="room"
              name="room"
              value={bookingDetails.room}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={bookingDetails.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="purpose">Purpose:</label>
            <textarea
              id="purpose"
              name="purpose"
              value={bookingDetails.purpose}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">Submit</button>
            <button type="reset" className="reset-button">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeBooking;
