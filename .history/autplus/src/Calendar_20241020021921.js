import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./Calendar.css";

const courseOptions = [
  // ... (existing courseOptions)
];

const Calendar = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCourseSelection, setShowCourseSelection] = useState(false);

  // ... (existing functions)

  return (
    <div className="calendar-container">
      <header className="header">
        <div className="left-header">
          <img src="aut-logo.png" alt="AUT Logo" className="logo" />
        </div>

        {/* Navigation Bar */}
        <nav className="top-nav">
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
        </nav>
      </header>

      <div className="class-schedule">
        <h2>Class Schedules</h2>

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Loading course schedules...</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && courses.length === 0 && !showCourseSelection && (
          <button
            className="select-courses-btn"
            onClick={() => setShowCourseSelection(true)}
          >
            Select Courses
          </button>
        )}

        {showCourseSelection && (
          <>
            <div className="overlay" onClick={handleCloseModal}></div>
            <div className="course-modal">
              <h3>Select Up to 4 Courses:</h3>
              <div className="course-options">
                {courseOptions.map((course) => (
                  <div
                    key={course.url}
                    className={`course-card ${
                      selectedCourses.includes(course.url) ? "selected" : ""
                    }`}
                    onClick={() => handleCourseSelect(course.url)}
                  >
                    <h4>{course.name}</h4>
                    <p>
                      {selectedCourses.includes(course.url)
                        ? "Deselect"
                        : "Select"}
                    </p>
                  </div>
                ))}
              </div>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
              <button className="close-btn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </>
        )}

        {courses.length > 0 && (
          <div className="scraped-results">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <h3>{`Course ${index + 1}`}</h3>
                <p>Class: {course[0]?.className || "N/A"}</p>
                <p>Day: {course[0]?.day || "N/A"}</p>
                <p>Time: {course[0]?.time || "N/A"}</p>
                <p>Room: {course[0]?.room || "N/A"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
