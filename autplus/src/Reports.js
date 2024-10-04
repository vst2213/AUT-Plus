import React from "react";
import { useReports } from "./ReportContext";

const Reports = () => {
  const { reports } = useReports(); // Access the reports array

  return (
    <div className="reports-container">
      <h2>Reported Comments</h2>
      <div className="reports-list">
        {reports.length === 0 ? (
          <p>No reports available.</p>
        ) : (
          reports.map((report, index) => (
            <div key={index} className="report-item">
              <strong>User:</strong> {report.user} <br />
              <strong>Comment:</strong> "{report.comment}"
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;
