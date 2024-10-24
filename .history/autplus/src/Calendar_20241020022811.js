import React, { useState } from "react";
import axios from "axios";
import "./Calendar.css";

const courseOptions = [
  {
    name: "COMP507",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42220&id2=5012",
  },
  {
    name: "DIGD507",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=41815&id2=5012",
  },
  {
    name: "MATH503",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42198&id2=5012",
  },
  {
    name: "COMP504",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42741&id2=5012",
  },
  {
    name: "COMP503",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=43600&id2=5012",
  },
  {
    name: "COMP500",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42737&id2=5012",
  },
  {
    name: "COMP610",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42749&id2=5012",
  },
  {
    name: "COMP604",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42573&id2=5012",
  },
  {
    name: "COMP602",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42744&id2=5012",
  },
  {
    name: "COMP603",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42745&id2=5012",
  },
  {
    name: "COMP719",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42768&id2=5012",
  },
  {
    name: "ENSE701",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42935&id2=5012",
  },
  {
    name: "COMP721",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42577&id2=5012",
  },
  {
    name: "COMP702",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42754&id2=5012",
  },
  {
    name: "COMP703",
    url: "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42576&id2=5012",
  },
];

const Calendar = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCourseSelection, setShowCourseSelection] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

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
    } catch (err) {
      setError("Failed to fetch course data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowCourseSelection(false);
    setSelectedCourses([]); // Reset selection
  };

  return (
    <div className={`calendar-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="left-header">
          <img src="aut-logo.png" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          <div className="dark-mode-toggle">
            <button onClick={toggleDarkMode}>
              Toggle Dark Mode
            </button>
          </div>
          <img src="profile-pic.png" alt="Profile" className="profile-pic" />
        </div>
      </header>
      <nav className="top-nav">
        <i className="nav-icon fa fa-home"></i>
        <i className="nav-icon fa fa-calendar"></i>
        <i className="nav-icon fa fa-comment-dots"></i>
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
                      {selectedCourses.includes(course.url) ? "Deselect" : "Select"}
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
