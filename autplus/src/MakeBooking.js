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

const MakeBooking = ({ setBookingDetails }) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showReminderPrompt, setShowReminderPrompt] = useState(false);

  const handleBooking = () => {
    if (selectedRoom && selectedTime) {
      const bookingInfo = `Your booking has been confirmed: ${selectedRoom} at ${selectedTime}`;
      setConfirmation(bookingInfo);
      setBookingDetails({ room: selectedRoom, time: selectedTime }); // 예약 정보를 설정
      setShowReminderPrompt(true); // 알림 설정 프롬프트 표시
    } else {
      setConfirmation("Select Room and Time");
    }
  };

  const handleCancel = () => {
    setSelectedRoom("");
    setSelectedTime("");
    setConfirmation("");
    setShowReminderPrompt(false); // 취소 시 프롬프트 숨기기
  };

  const setReminder = () => {
    // 알림 설정 로직 구현
    alert(`Reminder set for your booking at ${selectedTime} in ${selectedRoom}`);
    setShowReminderPrompt(false); // 프롬프트 숨기기
  };

  return (
    <div className="booking-container">
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

        {/* 알림 설정 프롬프트 */}
        {showReminderPrompt && (
          <div className="reminder-prompt">
            <p>Would you like to set a reminder?</p>
            <button onClick={setReminder}>Yes</button>
            <button onClick={() => setShowReminderPrompt(false)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeBooking;