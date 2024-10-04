// AdminPage.js
import React from "react";
import { useReports } from "./ReportContext"; // Correct import

const AdminPage = () => {
  const { reports } = useReports(); // Get the reports from context

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>
      <h2>Reported Posts</h2>
      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <ul>
          {reports.map((report, index) => (
            <li key={index}>{report}</li> // Display reported posts
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
