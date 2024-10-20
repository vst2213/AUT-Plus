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
        name: classItem.name,
        date: `${classItem.day}, ${classItem.date} ${classItem.month} ${classItem.year}`,
      };
      setNotificationDetails(notification);
    };

    // Function to handle file upload and read Excel file
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming the timetable is in the first sheet
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // Convert JSON to upcomingClasses format
        const classes = json.map((row) => ({
          name: row[0],
          room: row[1],
          time: row[2],
          day: row[3],
          date: row[4],
          month: row[5],
          year: row[6],
          details: row[7] || "", // Optional details
        }));

        setUpcomingClasses(classes); // Set the state with the imported classes
      };

      reader.readAsArrayBuffer(file); // Read the file
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

        {/* Upload Button */}
        <div className="upload-container">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            style={{ marginBottom: "20px" }} // Style for the upload input
          />
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
