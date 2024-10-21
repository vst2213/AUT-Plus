import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './alendar.css';

const Calendar = () => {
    const [classes, setClasses] = useState([]);
    const [upcomingClasses, setUpcomingClasses] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const classData = jsonData.map((row) => ({
                date: row[0],
                class: row[1],
                location: row[2],
            }));

            setClasses(classData);
            filterUpcomingClasses(classData);
        };

        reader.readAsBinaryString(file);
    };

    const filterUpcomingClasses = (classData) => {
        const today = new Date();
        const upcoming = classData.filter((cls) => new Date(cls.date) >= today);
        setUpcomingClasses(upcoming);
    };

    return (
        <div className="calendar-container">
            <h1>Class Calendar</h1>
            <input type="file" accept=".xlsx" onChange={handleFileUpload} />
            <div className="class-schedule">
                <h2>Upcoming Classes</h2>
                <ul className="upcoming-classes-list">
                    {upcomingClasses.length > 0 ? (
                        upcomingClasses.map((cls, index) => (
                            <li key={index} className="class-item">
                                <div className="class-details">
                                    <h3>{cls.class}</h3>
                                    <p>{cls.date} at {cls.location}</p>
                                </div>
                                <span className="class-icon" onClick={() => alert('Popup functionality here!')}>ℹ️</span>
                            </li>
                        ))
                    ) : (
                        <li>No upcoming classes found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Calendar;
