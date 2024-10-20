import React, { useState } from "react";
import { useReports } from "./ReportContext"; // Correct import
import { useFeedback } from "./FeedbackContext"; // Import the feedback context
import "./AdminPage.css"; // New CSS file for AdminPage styles

const AdminPage = () => {
  const { reports } = useReports(); // Get the reports from context
  const { feedback } = useFeedback(); // Get the feedback from context
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar
  const [activeSection, setActiveSection] = useState("dashboard"); // State to track active section

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          {isSidebarOpen ? "Close" : "Open"}
        </button>
        {isSidebarOpen && (
          <div className="sidebar-buttons">
            <button onClick={() => setActiveSection("dashboard")}>
              Dashboard
            </button>
            <button onClick={() => setActiveSection("students")}>
              Students
            </button>
            <button onClick={() => setActiveSection("reports")}>
              Reports
            </button>
            <button onClick={() => setActiveSection("feedback")}>
              Feedback
            </button>
          </div>
        )}
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
    <p>Welcome to the admin dashboard. Here you can manage all aspects of the platform.</p>
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
      <p>No feedback submitted yet.</p>
    ) : (
      <ul>
        {feedback.map((item, index) => (
          <li key={index}>
            <strong>{item.subject}</strong>: {item.description}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default AdminPage;
