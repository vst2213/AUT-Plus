import React from "react";
import { useReports } from "./ReportContext"; // Correct import
import "./AdminPage.css"; // New CSS file for AdminPage styles

const AdminPage = () => {
  const { reports } = useReports(); // Get the reports from context

  return (
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
  );
};

export default AdminPage;
