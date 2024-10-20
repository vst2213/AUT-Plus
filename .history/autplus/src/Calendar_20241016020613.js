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
        id="file-upload"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload">Choose File</label>
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
