import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Calendar = () => {
  const [classes, setClasses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const upcomingClasses = parseExcelData(jsonData);
        setClasses(upcomingClasses);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setErrorMessage('Please upload a valid Excel file.');
    }
  };

  const parseExcelData = (data) => {
    const classesList = [];
    // Skip header and parse each row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row.length > 0) {
        const classData = {
          date: row[0],
          day: row[1],
          time: `${row[2]} - ${row[3]}`,
          room: row[4],
          location: row[5],
          subject: row[6],
          description: row[7],
        };
        classesList.push(classData);
      }
    }
    return classesList;
  };

  return (
    <div>
      <h1>Student Timetable</h1>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        {classes.length > 0 && (
          <ul>
            {classes.map((classInfo, index) => (
              <li key={index}>
                <strong>{classInfo.date}</strong> ({classInfo.day}) {classInfo.time} | {classInfo.room}, {classInfo.location} | {classInfo.subject} - {classInfo.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Calendar;
