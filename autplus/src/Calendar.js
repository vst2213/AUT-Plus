import React, { useState, useEffect, useRef } from "react";
import "./Calendar.css";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCommentDots,
  FaBars,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa"; // FaCalendarAlt 추가

const Calendar = ({ setNotificationDetails }) => {
  // Sample data for upcoming classes
  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      name: "Data Structure and Algorithm",
      room: "Lecture WZ213",
      time: "9:00 AM",
      day: "Sunday",
      date: "22",
      month: "September",
      year: "2024",
      details:
        "This course focuses on advanced algorithms and their applications.",
    },
    {
      name: "French",
      room: "Lecture WZ718",
      time: "11:00 AM",
      day: "Monday",
      date: "23",
      month: "September",
      year: "2024",
      details: "Learn basic French communication skills in this course.",
    },
    {
      name: "Computer Science",
      room: "Lecture WZ213",
      time: "2:00 PM",
      day: "Tuesday",
      date: "24",
      month: "September",
      year: "2024",
      details: "Introduction to computer science concepts and programming.",
    },
  ]);

  const [activeClassIndex, setActiveClassIndex] = useState(null);
  const [enhancedInfo, setEnhancedInfo] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveClassIndex(null);
        setEnhancedInfo(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopup = (index) => {
    if (activeClassIndex === index) {
      setActiveClassIndex(null);
      setEnhancedInfo(null);
    } else {
      setActiveClassIndex(index);
      setEnhancedInfo(null);
    }
  };

  const handleEnhancedInfo = (classItem) => {
    setEnhancedInfo(classItem.details);
  };

  const handleSetNotification = (classItem) => {
    const notification = {
      name: classItem.name,
      date: `${classItem.day}, ${classItem.date} ${classItem.month} ${classItem.year}`,
    };
    setNotificationDetails(notification); // 알림 추가
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
        {upcomingClasses.map((classItem, index) => (
          <div key={index} className="class-item">
            <div className="class-details">
              <h3>{classItem.name}</h3>
              <p>
                {classItem.day}, {classItem.date} {classItem.month}{" "}
                {classItem.year}
              </p>
              <p>Room: {classItem.room}</p>
              <p>Time: {classItem.time}</p>
            </div>
            <FaBook className="class-icon" onClick={() => togglePopup(index)} />
            {activeClassIndex === index && (
              <div className="popup" ref={popupRef}>
                {!enhancedInfo ? (
                  <>
                    <h4>Options</h4>
                    <ul>
                      <li>Navigate</li>
                      <li onClick={() => handleEnhancedInfo(classItem)}>
                        Enhanced Information
                      </li>
                      <li onClick={() => handleSetNotification(classItem)}>
                        Set Notification
                      </li>
                    </ul>
                  </>
                ) : (
                  <div className="enhanced-info-popup">
                    <h4>Class Details</h4>
                    <p>{enhancedInfo}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
