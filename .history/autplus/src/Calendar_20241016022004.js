import React, { useState } from 'react';
import './Calendar.css'; // Ensure this path is correct

const Calendar = () => {
    const [classData, setClassData] = useState([]);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        // Here you can add logic to read the Excel file and populate classData
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to process the uploaded file and update classData
    };

    return (
        <div className="calendar-container">
            <h1>Class Schedule</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>

            <div className="class-schedule">
                {classData.map((classItem, index) => (
                    <div key={index} className="class-item">
                        <div className="class-details">
                            <h3>{classItem.name}</h3>
                            <p>{classItem.time}</p>
                            <p>{classItem.location}</p>
                        </div>
                        <div className="class-icon" onClick={() => alert(`Details for ${classItem.name}`)}>
                            &#x1f6c1; {/* Example icon */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
