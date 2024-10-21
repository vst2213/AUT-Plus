import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyDetails.css";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const MyDetails = () => {
  const navigate = useNavigate();

  // State to manage input values
  const [titleInput, setTitleInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  // State to manage display values
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // State to toggle edit mode
  const [isTitleEditing, setIsTitleEditing] = useState(true);
  const [isFirstNameEditing, setIsFirstNameEditing] = useState(true);
  const [isLastNameEditing, setIsLastNameEditing] = useState(true);

  const handleBackClick = () => {
    navigate("/more");
  };

  // Handlers to submit and toggle editing for Title
  const handleTitleSubmit = () => {
    setTitle(titleInput);
    setIsTitleEditing(false); // Hide input field and show edit button
  };
  const handleTitleEdit = () => setIsTitleEditing(true); // Show input field again

  // Handlers for First Name
  const handleFirstNameSubmit = () => {
    setFirstName(firstNameInput);
    setIsFirstNameEditing(false);
  };
  const handleFirstNameEdit = () => setIsFirstNameEditing(true);

  // Handlers for Last Name
  const handleLastNameSubmit = () => {
    setLastName(lastNameInput);
    setIsLastNameEditing(false);
  };
  const handleLastNameEdit = () => setIsLastNameEditing(true);

  return (
    <div className="details-container">
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
      </div>

      {/* Top Navigation Bar */}
      <div className="top-nav">
        <Link to="/Home">
          <FaHome className="nav-icon" />
        </Link>
        <Link to="/community">
          <FaCommentDots className="nav-icon" />
        </Link>
        <Link to="/calendar">
          <FaCalendarAlt className="nav-icon" />
        </Link>
        <FaBars className="nav-icon" />
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>

      <h2>My Details</h2>

      <div className="details-form">
        {/* Title Section */}
        <div className="input-row">
          <label>Title: </label>
          <span className="output-text">{title}</span>
          {!isTitleEditing && (
            <button className="edit-button" onClick={handleTitleEdit}>
              Edit
            </button>
          )}
        </div>
        {isTitleEditing && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <button onClick={handleTitleSubmit}>Submit</button>
          </div>
        )}

        {/* First Name Section */}
        <div className="input-row">
          <label>First Name: </label>
          <span className="output-text">{firstName}</span>
          {!isFirstNameEditing && (
            <button className="edit-button" onClick={handleFirstNameEdit}>
              Edit
            </button>
          )}
        </div>
        {isFirstNameEditing && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
            />
            <button onClick={handleFirstNameSubmit}>Submit</button>
          </div>
        )}

        {/* Last Name Section */}
        <div className="input-row">
          <label>Last Name: </label>
          <span className="output-text">{lastName}</span>
          {!isLastNameEditing && (
            <button className="edit-button" onClick={handleLastNameEdit}>
              Edit
            </button>
          )}
        </div>
        {isLastNameEditing && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
            />
            <button onClick={handleLastNameSubmit}>Submit</button>
          </div>
        )}

        {/* Points Section */}
        <div className="input-row">
          <label>Points: </label>
          <span>100</span>
        </div>
      </div>
    </div>
  );
};

export default MyDetails;
