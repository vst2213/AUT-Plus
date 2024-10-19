import React, { useState } from "react";
import { useReports } from "./ReportContext"; // Correct import
import "./AdminPage.css"; // New CSS file for AdminPage styles

const AdminPage = () => {
  const { reports } = useReports(); // Get the reports from context
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "Open"}
        </button>
        {isSidebarOpen && (
          <div className="sidebar-buttons">
            <button>Dashboard</button>
            <button>Students</button>
            <button>Reports</button>
            <button>Feedback</button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>
        <h2 className="reports-title">Reported Posts</h2>
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
    </div>
  );
};

export default AdminPage;
