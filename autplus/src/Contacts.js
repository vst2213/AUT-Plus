import React from "react";
import "./Contacts.css"; // 스타일 파일을 추가하세요
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const Contacts = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  const classes = [
    {
      name: "COMP602",
      lecturer: "Matthew Kuo",
      email: "matthew.kuo@autuni.ac.nz",
    },
    { name: "COMP602", lecturer: "Jane Jung", email: "ssr1891@autuni.ac.nz" },
    {
      name: "COMP 9999",
      lecturer: "Albert Einstein",
      email: "vst2213@autuni.ac.nz",
    },
  ];

  const handleContact = (email) => {
    window.location.href = `mailto:${email}`; // 이메일 클라이언트 열기
  };

  // Back 버튼 클릭 시 MorePage로 이동
  const handleBackClick = () => {
    navigate("/more");
  };

  return (
    <div className="contacts-container">
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header"></div>
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
        <Link to="/more">
          <FaBars className="nav-icon" />
        </Link>
      </div>

      {/* Back 버튼 추가 */}
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>

      <h2>Contacts</h2>
      <div className="contacts-list">
        {classes.map((classItem, index) => (
          <div key={index} className="contact-item">
            <span>
              {classItem.name} - {classItem.lecturer}
            </span>
            <button onClick={() => handleContact(classItem.email)}>
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;