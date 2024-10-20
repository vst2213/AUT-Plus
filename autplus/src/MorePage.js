import React, { useState, useEffect } from "react";
import "./Morepage.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const MorePage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // 로컬 스토리지에서 다크모드 상태 불러오기
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.className = savedMode ? "dark" : "light";
  }, []);

  // 다크모드 토글 핸들러
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      document.body.className = newMode ? "dark" : "light";
      return newMode;
    });
  };

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
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          <img />
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
        <button onClick={() => navigate("/contacts")}>Contacts</button>
        <button onClick={() => navigate("/notifications")}>Notifications</button>
        <button onClick={() => navigate("/make-booking")}>Make a Booking</button>
        <button onClick={() => navigate("/submit-feedback")}>
          Submit Feedback
        </button>
      </div>

      <button onClick={handleLogout}>Logout</button>

      {/* 다크모드 토글 스위치 */}
      <div className="toggle-container" onClick={toggleDarkMode}>
        <span className="sun-icon">☀️</span>
        <div className={`toggle-switch ${darkMode ? "active" : ""}`}>
          <div className="toggle-circle"></div>
        </div>
        <span className="moon-icon">🌙</span>
      </div>
    </div>
  );
};

export default MorePage;