import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useReports } from "./ReportContext"; // Correct import
import { useFeedback } from "./FeedbackContext"; // Import the feedback context
import "./AdminPage.css"; // New CSS file for AdminPage styles

const AdminPage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { reports } = useReports(); // Get the reports from context
  const { feedback } = useFeedback(); // Get the feedback from context
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar
  const [activeSection, setActiveSection] = useState("dashboard"); // State to track active section

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clearing tokens)
    console.log("Logging out...");
    // Navigate to login page
    navigate("/login"); // Change this path to your actual login route
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <Students />;
      case "reports":
        return <Reports reports={reports} />;
      case "feedback":
        return <Feedback feedback={feedback} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <img src="/pictures/aut.jpeg" alt="AUT Logo" className="sidebar-logo" />
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "☰"}
        </button>
        {isSidebarOpen && (
          <nav className="sidebar-buttons">
            <button onClick={() => setActiveSection("dashboard")}>Dashboard</button>
            <button onClick={() => setActiveSection("students")}>Students</button>
            <button onClick={() => setActiveSection("reports")}>Reports</button>
            <button onClick={() => setActiveSection("feedback")}>Feedback</button>
          </nav>
        )}
        {/* Logout Button Container */}
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main content */}
      <div className="admin-container">{renderContent()}</div>
    </div>
  );
};

// Other components remain unchanged...

export default AdminPage;
