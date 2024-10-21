import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import "./Calendar.css";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCommentDots,
  FaBars,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa";

const Calendar = ({ setNotificationDetails }) => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
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
      name: classItem.className,
      date: `${classItem.day}, ${classItem.starting}`,
    };
    setNotificationDetails(notification);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Remove header and parse the data into the desired format
      const classes = jsonData.slice(2).map((row) => ({
        starting: row[0],
        day: row[1],
        from: row[2],
        to: row[3],
        room: row[4],
        location: row[5],
        className: row[6],
        details: row[7],
      }));

      setUpcomingClasses(classes);
    };

    reader.readAsArrayBuffer(file);
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

      {/* Upload File Button */}
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{ margin: "20px", cursor: "pointer" }}
      />

      <h2>Upcoming Classes</h2>
      <div className="class-schedule">
        {upcomingClasses.map((classItem, index) => (
          <div key={index} className="class-item">
            <div className="class-details">
              <h3>{classItem.className}</h3>
              <p>
                {classItem.day}, {classItem.starting}
              </p>
              <p>Room: {classItem.room}</p>
              <p>Time: {classItem.from} - {classItem.to}</p>
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
