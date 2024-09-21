import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./MakeBooking.css";
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

const MakeBooking = ({ setBookingDetails }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showReminderPrompt, setShowReminderPrompt] = useState(false);

  const handleBooking = () => {
    if (selectedRoom && selectedTime) {
      const bookingInfo = `Your booking has been confirmed: ${selectedRoom} at ${selectedTime}`;
      setConfirmation(bookingInfo);
      setBookingDetails({ room: selectedRoom, time: selectedTime });
      setShowReminderPrompt(true);

      // Navigate to Notifications page after setting booking details
      navigate("/notifications");
    } else {
      setConfirmation("Select Room and Time");
    }
  };

  const handleCancel = () => {
    setSelectedRoom("");
    setSelectedTime("");
    setConfirmation("");
    setShowReminderPrompt(false);
  };

  const setReminder = () => {
    alert(
      `Reminder set for your booking at ${selectedTime} in ${selectedRoom}`
    );
    setShowReminderPrompt(false);
  };

  return (
    <div className="booking-container">
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

        {showReminderPrompt && (
          <div className="reminder-prompt">
            <p>Would you like to set a reminder?</p>
            <button onClick={setReminder}>Yes</button>
            <button onClick={() => setShowReminderPrompt(false)}>No</button>
          </div>
        )}
      </div>

      {/* Back button to return to MorePage.js */}
      <div className="back-button-container">
        <Link to="/more">
          <button className="back-button">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default MakeBooking;
