import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars, FaCog } from "react-icons/fa"; // Import settings icon
import "./Calendar.css";

const Calendar = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCourseSelection, setShowCourseSelection] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load courses from localStorage on component mount
  useEffect(() => {
    const savedCourses = localStorage.getItem("scrapedCourses");
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  const handleCourseSelect = (url) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(url)
        ? prevSelected.filter((course) => course !== url)
        : prevSelected.length < 4
        ? [...prevSelected, url]
        : (alert("You can only select up to 4 courses."), prevSelected)
    );
  };

  const handleSubmit = async () => {
    if (selectedCourses.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/scrape", {
        urls: selectedCourses,
      });
      setCourses(response.data);
      localStorage.setItem("scrapedCourses", JSON.stringify(response.data));
      setShowCourseSelection(false);
    } catch (err) {
      setError("Failed to fetch course data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowCourseSelection(false);
    setSelectedCourses([]);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setSelectedCourses([]);
    setShowCourseSelection(true);
  };

  return (
    <div className="calendar-container">
      <header className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
      </header>

      {/* Updated Navigation Bar with Settings Link */}
      <nav className="top-nav">
        <Link to="/home" aria-label="Home">
          <FaHome className="nav-icon" />
        </Link>
        <Link to="/community" aria-label="Community">
          <FaCommentDots className="nav-icon" />
        </Link>
        <Link to="/calendar" aria-label="Calendar">
          <FaCalendarAlt className="nav-icon" />
        </Link>
        <Link to="/more" aria-label="Settings">
          <FaCog className="nav-icon" />
        </Link>
      </nav>

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
              <h3>
                {isEditing ? "Edit Your Courses" : "Select Up to 4 Courses:"}
              </h3>
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
          <>
            <button className="edit-btn" onClick={handleEditToggle}>
              {isEditing ? "Done" : "Edit"}
            </button>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;