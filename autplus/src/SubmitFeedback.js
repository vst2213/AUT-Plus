import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "./FeedbackContext"; 
import "./SubmitFeedback.css"; 

const SubmitFeedback = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // useNavigate 초기화
  const { addFeedback } = useFeedback(); 

  // Apply dark mode if set in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    document.body.className = savedMode ? "dark" : "light";
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmSubmission = window.confirm(
      "Are you sure you want to submit this feedback?"
    );

    if (confirmSubmission) {
      addFeedback({ subject, description }); 

      setSubject(""); 
      setDescription("");
      alert("Feedback submitted successfully!");

      navigate("/home"); 
    }
  };

  
  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel? Your feedback will not be saved."
    );

    if (confirmCancel) {
      navigate("/more"); 
    }
  };

  return (
    <div className="feedback-container">
      {/* feedback header  */}
      <div className="feedback-header">
        <h2>Submit Feedback</h2>
      </div>

      {/* feedback foam */}
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

        {/* button */}
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
