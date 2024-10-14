import React, { useState, useEffect } from "react";
import "./Morepage.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars, FaSun, FaMoon } from "react-icons/fa";

const MorePage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);
    localStorage.setItem("darkMode", newDarkModeState);
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
    <div className={`more-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
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

      <h2>More Options</h2>
      <div className="options">
        <button onClick={() => navigate("/my-details")}>My AUT</button>
        <button onClick={() => navigate("/contacts")}>Contacts</button>
        <button onClick={() => navigate("/notifications")}>Notifications</button>
        <button onClick={() => navigate("/make-booking")}>Make a Booking</button>
        <button onClick={() => navigate("/submit-feedback")}>
          Submit Feedback
        </button>

        <button onClick={handleLogout}>Logout</button>

        {/* Dark mode toggle placed below Logout */}
        <div className="dark-mode-toggle">
          <FaSun className="icon sun-icon" />
          <div className={`toggle-container ${darkMode ? "active" : ""}`} onClick={toggleDarkMode}>
            <div className="toggle-switch"></div>
          </div>
          <FaMoon className="icon moon-icon" />
        </div>
      </div>
    </div>
  );
};

export default MorePage;