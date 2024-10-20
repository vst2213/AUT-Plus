import React, { useState, useEffect, useRef } from "react";
import "./Calendar.css";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaBars, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import * as cheerio from "cheerio";

const Calendar = ({ setNotificationDetails }) => {
  // Sample data for all available courses
  const allCourses = [
    { code: "COMP501", description: "Software Engineering" },
    { code: "COMP517", description: "Advanced Software Engineering" },
    { code: "COMP508", description: "Human-Computer Interaction" },
    { code: "INFS502", description: "Information Systems" },
  ];

  const courseLinks = {
    COMP501:
      "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42738&id2=5012",
    COMP517:
      "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42196&id2=5012",
    COMP508:
      "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42221&id2=5012",
    INFS502:
      "https://arion.aut.ac.nz/ArionMain/CourseInfo/Information/Qualifications/Details/PaperDetails.aspx?actiontype=2&id=42197&id2=5012",
  };

  const [activeClassIndex, setActiveClassIndex] = useState(null);
  const [enhancedInfo, setEnhancedInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [classDetails, setClassDetails] = useState({});
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      const details = {};

      await Promise.all(
        Object.entries(courseLinks).map(async ([courseCode, url]) => {
          try {
            const response = await axios.post(`http://localhost:5000/scrape`, {
              urls: [url],
            });

            // Log the HTML response to inspect the structure
            console.log(`Response for ${courseCode}:`, response.data);

            const $ = cheerio.load(response.data);

            // Scrape the required details
            const classSchedule = $("table tr")
              .map((i, el) => {
                const className = $(el).find("td").eq(0).text().trim();
                const day = $(el).find("td").eq(2).text().trim();
                const time = $(el).find("td").eq(3).text().trim();
                const room = $(el).find("td").eq(4).text().trim();

                // Debugging log to check extracted values
                console.log(
                  `Class Name: ${className}, Day: ${day}, Time: ${time}, Room: ${room}`
                );

                // Only return non-empty values
                if (day && time) {
                  return { day, time, room, className }; // Use className from the map context
                }
                return null; // Return null for empty rows
              })
              .get()
              .filter((item) => item !== null); // Filter out null entries

            details[courseCode] = {
              name: classSchedule.length ? classSchedule[0].className : "N/A", // Assign class name from the first schedule entry
              schedule: classSchedule.length
                ? classSchedule
                : [{ day: "N/A", time: "N/A", room: "N/A" }],
            };
          } catch (error) {
            console.error(`Error fetching data for ${courseCode}:`, error);
            details[courseCode] = {
              name: "N/A",
              schedule: [{ day: "N/A", time: "N/A", room: "N/A" }],
            };
          }
        })
      );

      console.log("Scraped Details:", details); // Log all scraped details
      setClassDetails(details);
    };

    fetchClassDetails();
  }, []);

  const togglePopup = (index) => {
    if (activeClassIndex === index) {
      setActiveClassIndex(null);
    } else {
      setActiveClassIndex(index);
    }
  };

  const handleSetNotification = (classDetail) => {
    setNotificationDetails(classDetail);
    alert(
      `Notification set for ${classDetail.className} on ${classDetail.day} at ${classDetail.time} in ${classDetail.room}`
    );
  };

  const handleEnhancedInfo = (details) => {
    setEnhancedInfo(details);
    setIsModalOpen(true); // Open modal to show enhanced info
  };

  const handleCourseSelect = (courseCode) => {
    setSelectedCourses((prevSelected) => {
      if (prevSelected.includes(courseCode)) {
        return prevSelected.filter((code) => code !== courseCode);
      }
      return [...prevSelected, courseCode];
    });
  };

  const handleSubmitCourses = () => {
    // Handle the submission of selected courses here
    alert(`Selected courses: ${selectedCourses.join(", ")}`);
    setIsModalOpen(false);
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header"></div>
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
        <Link to="/more">
          <FaBars className="nav-icon" />
        </Link>
      </div>

      <h2>Upcoming Classes</h2>
      <div className="class-schedule">
        <button
          className="select-courses-button"
          onClick={() => setIsModalOpen(true)}
          disabled={selectedCourses.length >= 4}
        >
          Select Courses
        </button>

        {Object.entries(classDetails).map(([courseCode, details], index) => (
          <div
            key={courseCode}
            className="course-card"
            onClick={() => togglePopup(index)}
          >
            <h3>{details.name}</h3>
            <p>Course Code: {courseCode}</p>
            <div>
              {details.schedule.map((item, i) => (
                <div key={i}>
                  <p>{`Day: ${item.day}, Time: ${item.time}, Room: ${item.room}`}</p>
                  <button
                    onClick={() =>
                      handleSetNotification({ ...item, name: details.name })
                    }
                  >
                    Set Notification
                  </button>
                </div>
              ))}
            </div>
            {activeClassIndex === index && (
              <div className="popup" ref={popupRef}>
                <h3>Details for {details.name}</h3>
                <button onClick={() => handleEnhancedInfo(details)}>
                  View Enhanced Info
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Up to 4 Courses</h2>
            <div className="course-grid">
              {allCourses.map((course) => (
                <div
                  key={course.code}
                  className={`course-card ${
                    selectedCourses.includes(course.code) ? "selected" : ""
                  }`}
                  onClick={() => handleCourseSelect(course.code)}
                >
                  <h3>{course.code}</h3>
                  <p>{course.description}</p>
                </div>
              ))}
            </div>
            <button onClick={handleSubmitCourses}>
              Submit Selected Courses
            </button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
