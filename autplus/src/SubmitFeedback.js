import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "./FeedbackContext"; // Feedback context 가져오기
import "./SubmitFeedback.css"; // 스타일 파일 불러오기

const SubmitFeedback = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // useNavigate 초기화
  const { addFeedback } = useFeedback(); // 피드백 컨텍스트 사용

  // 피드백 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmSubmission = window.confirm(
      "Are you sure you want to submit this feedback?"
    );

    if (confirmSubmission) {
      addFeedback({ subject, description }); // 피드백 추가

      setSubject(""); // 폼 초기화
      setDescription("");
      alert("Feedback submitted successfully!");

      navigate("/home"); // 홈 페이지로 리디렉션
    }
  };

  // 취소 버튼 처리 함수
  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel? Your feedback will not be saved."
    );

    if (confirmCancel) {
      navigate("/more"); // More 페이지로 리디렉션
    }
  };

  return (
    <div className="feedback-container">
      {/* 피드백 헤더 */}
      <div className="feedback-header">
        <h2>Submit Feedback</h2>
      </div>

      {/* 피드백 폼 */}
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* 버튼 컨테이너 */}
        <div className="button-container">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitFeedback;