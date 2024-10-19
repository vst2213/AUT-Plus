import React, { useState } from "react";
import { useReports } from "./ReportContext"; // Correct import
import "./AdminPage.css"; // New CSS file for AdminPage styles

const AdminPage = () => {
  const { reports } = useReports(); // Get the reports from context
  const [activeSection, setActiveSection] = useState('dashboard'); // State to track active section

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <Students />;
      case 'reports':
        return (
          <div className="reports-section">
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
        );
      case 'feedback':
        return <Feedback />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-nav">
        <button onClick={() => setActiveSection('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveSection('students')}>Students</button>
        <button onClick={() => setActiveSection('reports')}>Reports</button>
        <button onClick={() => setActiveSection('feedback')}>Feedback</button>
      </div>
      <div className="admin-content">
        {renderSection()} {/* Render the current active section */}
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div className="dashboard-section">
    <h2>Welcome to the Admin Dashboard</h2>
    <p>Here you can monitor system activity and metrics.</p>
  </div>
);

const Students = () => (
  <div className="students-section">
    <h2>Manage Students</h2>
    <p>List of students and their details will be shown here.</p>
  </div>
);

const Feedback = () => (
  <div className="feedback-section">
    <h2>User Feedback</h2>
    <p>Here you can review feedback from users.</p>
  </div>
);

export default AdminPage;
