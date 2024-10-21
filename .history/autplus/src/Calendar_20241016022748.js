import React, { useState, useEffect, useRef } from "react";
import "./Calendar.css";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaBars, FaBook, FaCalendarAlt } from "react-icons/fa";
import * as XLSX from "xlsx"; // Import the xlsx library

const Calendar = ({ setNotificationDetails }) => {
  // State for upcoming classes and file upload
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [activeClassIndex, setActiveClassIndex] = useState(null);
  const [enhancedInfo, setEnhancedInfo] = useState(null);
  const popupRef = useRef(null);

  // Handle file upload and parse Excel data
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      // Map the JSON data to the expected structure for upcomingClasses
      const classes = json.map((item) => ({
        starting: item.Starting || 'N/A',   // Corresponds to the Starting column
        day: item.Day || 'N/A',             // Corresponds to the Day column
        from: item.From || 'N/A',           // Corresponds to the From column
        to: item.To || 'N/A',               // Corresponds to the To column
        room: item.Room || 'N/A',           // Corresponds to the Room column
        location: item.Location || 'N/A',   // Corresponds to the Location column
        class: item.Class || 'N/A',         // Corresponds to the Class column
        description: item.Description || 'No additional details available', // Corresponds to the Description column
      }));

      setUpcomingClasses(classes); // Update upcomingClasses with structured data
    };

    reader.readAsArrayBuffer(file);
  };

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
    setEnhancedInfo(classItem.description);
  };

  const handleSetNotification = (classItem) => {
    const notification = {
      name: classItem.class,
      date: `${classItem.day}, From ${classItem.from} to ${classItem.to}`,
    };
    setNotificationDetails(notification);
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
      <div className="upload-container">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ margin: '20px', padding: '10px' }} // Adjust styles as needed
        />
      </div>

      <h2>Upcoming Classes</h2>
      <div className="class-schedule">
        {upcomingClasses.map((classItem, index) => (
          <div key={index} className="class-item">
            <div className="class-details">
              <h3>{classItem.class}</h3>
              <p>
                Starting: {classItem.starting}, {classItem.day}
              </p>
              <p>From: {classItem.from} To: {classItem.to}</p>
              <p>Room: {classItem.room}</p>
              <p>Location: {classItem.location}</p>
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
