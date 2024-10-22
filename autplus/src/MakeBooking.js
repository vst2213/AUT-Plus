import React, { useState, useEffect } from "react";
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
  const navigate = useNavigate(); 
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showReminderPrompt, setShowReminderPrompt] = useState(false);

  // Apply dark mode if set in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    document.body.className = savedMode ? "dark" : "light";
  }, []);

  const handleBooking = () => {
    if (selectedRoom && selectedTime) {
      const bookingInfo = `Your booking has been confirmed: ${selectedRoom} at ${selectedTime}`;
      setConfirmation(bookingInfo);
      setBookingDetails({ room: selectedRoom, time: selectedTime });
      setShowReminderPrompt(true);

      // Booking 완료 후 Notifications 페이지로 이동
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

  const handleBackClick = () => {
    navigate("/more"); 
  };

  return (
    <div className="booking-container">
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header"></div>
      </div>

      {/* Navigation Bar */}
      <div className="top-nav">
        <Link to="/home">
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

      {/* Back */}
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
      </div>
    </div>
  );
};

export default MakeBooking;
