import React, { createContext, useContext, useState } from "react";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  const addReport = (user, comment) => {
    const newReport = { user, comment };
    setReports((prevReports) => [...prevReports, newReport]);
  };

  return (
    <ReportContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => {
  return useContext(ReportContext);
};
