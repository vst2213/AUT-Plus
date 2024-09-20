import React, { useState } from "react";
import "./MakeBooking.css"; // 스타일 파일을 추가하세요
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const rooms = [
  "WZ Building",
  "WS Building",
  "WF Building",
  "WG Building",
  "WA Building",
];

const timeSlots = [
  "08:00 AM",
  "10:00 AM",
  "12:00 PM",
  "02:00 PM",
  "04:00 PM",
  "06:00 PM",
  "08:00 PM",
  "10:00 PM",
];

const MakeBooking = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleBooking = () => {
    if (selectedRoom && selectedTime) {
      setConfirmation(
        `Your booking has been confirmed: ${selectedRoom} at ${selectedTime}`
      );
    } else {
      setConfirmation("Select Room and Time");
    }
  };

  const handleCancel = () => {
    setSelectedRoom("");
    setSelectedTime("");
    setConfirmation("");
  };

  return (
    <div className="booking-container">
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

      <h2>Make a Booking</h2>

      {/* Room Booking System */}
      <div className="booking-form">
        <label>Room:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">Select a room</option>
          {rooms.map((room, index) => (
            <option key={index} value={room}>
              {room}
            </option>
          ))}
        </select>

        <label>Time:</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Select a time</option>
          {timeSlots.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <button onClick={handleBooking}>Book</button>
        <button onClick={handleCancel}>Cancel</button>

        {confirmation && <p>{confirmation}</p>}
      </div>
    </div>
  );
};

export default MakeBooking;
