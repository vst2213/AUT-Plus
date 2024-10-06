import React from "react";
import { useReports } from "./ReportContext"; // Use the hook

const Reports = () => {
  const { reports } = useReports(); // Access reports via the hook

  return (
    <div>
      <h2>Reported Comments</h2>
      <ul>
        {reports.length > 0 ? (
          reports.map((report, index) => (
            <li key={index}>
              {/* Display the user and comment */}
              <strong>User:</strong> {report.user} <br />
              <strong>Comment:</strong> "{report.comment}"
            </li>
          ))
        ) : (
          <p>No reported comments yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Reports;
