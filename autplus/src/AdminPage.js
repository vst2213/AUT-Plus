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
        <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "☰"}
        </button>
        {isSidebarOpen && (
          <nav className="sidebar-buttons">
            <button onClick={() => setActiveSection("dashboard")}>
              Dashboard
            </button>
            <button onClick={() => setActiveSection("students")}>
              Students
            </button>
            <button onClick={() => setActiveSection("reports")}>Reports</button>
            <button onClick={() => setActiveSection("feedback")}>
              Feedback
            </button>
          </nav>
        )}
        {/* Logout Button at the bottom left */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="admin-container">{renderContent()}</div>
    </div>
  );
};

// Dashboard component
const Dashboard = () => (
  <div>
    <h1 className="admin-title">Admin Dashboard</h1>
    <p>
      Welcome to the admin dashboard. Here you can manage all aspects of the
      platform.
    </p>
  </div>
);

// Students component
const Students = () => (
  <div>
    <h1 className="admin-title">Students</h1>
    <p>Here is the list of students enrolled on the platform.</p>
  </div>
);

// Reports component
const Reports = ({ reports }) => (
  <div>
    <h1 className="reports-title">Reported Posts</h1>
    {reports.length === 0 ? (
      <p className="no-reports">No reports available.</p>
    ) : (
      <ul className="reports-list">
        {reports.map((report, index) => (
          <li key={index} className="report-item">
            <div className="report-header">
              <strong>User:</strong> {report.user}
            </div>
            <div className="report-comment">
              <strong>Comment:</strong> {report.comment}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// Feedback component
const Feedback = ({ feedback }) => (
  <div>
    <h1 className="admin-title">Feedback</h1>
    {feedback.length === 0 ? (
      <p className="no-feedback">No feedback submitted yet.</p>
    ) : (
      <ul className="feedback-list">
        {feedback.map((item, index) => (
          <li key={index}>
            <div className="feedback-item">
              <strong>{item.subject}</strong>: {item.description}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default AdminPage;
