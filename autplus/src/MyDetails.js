import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./MyDetails.css";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const MyDetails = () => {
  const navigate = useNavigate();

  // Input 상태 관리
  const [titleInput, setTitleInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  // 디스플레이 상태 관리
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [points, setPoints] = useState(0); // 포인트 상태

  // Edit 모드 상태 관리
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isFirstNameEditing, setIsFirstNameEditing] = useState(false);
  const [isLastNameEditing, setIsLastNameEditing] = useState(false);

  // 초기 로딩 시 로컬 스토리지에서 정보와 포인트 가져오기
  useEffect(() => {
    const savedTitle = localStorage.getItem("title") || "";
    const savedFirstName = localStorage.getItem("firstName") || "";
    const savedLastName = localStorage.getItem("lastName") || "";
    const savedPoints = parseInt(localStorage.getItem("points")) || 0;

    setTitle(savedTitle);
    setFirstName(savedFirstName);
    setLastName(savedLastName);
    setPoints(savedPoints);

    // Check for dark mode in localStorage and apply it
    const savedMode = localStorage.getItem("darkMode") === "true";
    document.body.className = savedMode ? "dark" : "light";
  }, []);

  // 제목 제출 핸들러
  const handleTitleSubmit = () => {
    setTitle(titleInput);
    localStorage.setItem("title", titleInput);
    setIsTitleEditing(false); // Edit 모드 종료
  };

  // 이름 제출 핸들러
  const handleFirstNameSubmit = () => {
    setFirstName(firstNameInput);
    localStorage.setItem("firstName", firstNameInput);
    setIsFirstNameEditing(false); // Edit 모드 종료
  };

  // 성 제출 핸들러
  const handleLastNameSubmit = () => {
    setLastName(lastNameInput);
    localStorage.setItem("lastName", lastNameInput);
    setIsLastNameEditing(false); // Edit 모드 종료
  };

  const handleBackClick = () => {
    navigate("/more");
  };

  return (
    <div className="details-container">
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
      </div>

      <div className="top-nav">
        <Link to="/home">
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

      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>

      <h2>My Details</h2>

      <div className="details-form">
        {/* Title Section */}
        <div className="input-row">
          <label>Title: </label>
          <span className="output-text">{title}</span>
          <button
            className="edit-button"
            onClick={() => setIsTitleEditing(true)}
          >
            Edit
          </button>
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
          <button
            className="edit-button"
            onClick={() => setIsFirstNameEditing(true)}
          >
            Edit
          </button>
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
          <button
            className="edit-button"
            onClick={() => setIsLastNameEditing(true)}
          >
            Edit
          </button>
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
        <div className="points-section">
          <h3>Points: {points}</h3>
        </div>
      </div>
    </div>
  );
};

export default MyDetails;
