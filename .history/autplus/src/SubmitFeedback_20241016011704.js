import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "./FeedbackContext"; // Import the feedback context
import "./SubmitFeedback.css"; // Ensure you import the CSS

const SubmitFeedback = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { addFeedback } = useFeedback(); // Use the feedback context

  const handleSubmit = (e) => {
    e.preventDefault();

    // Display a confirmation message
    const confirmSubmission = window.confirm(
      "Are you sure you want to submit this feedback?"
    );

    if (confirmSubmission) {
      // Add the feedback to the global state
      addFeedback({ subject, description });

      // Clear the form after submission
      setSubject("");
      setDescription("");
      alert("Feedback submitted successfully!");

      // Optionally redirect the user
      navigate("/Home"); // Redirect to the main site or another page
    }
  };

  const handleCancel = () => {
    navigate("/Home"); // Redirect to the main site
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h2>Submit Feedback</h2>
      </div>
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
        <div className="button-container">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button> {/* Cancel button */}
        </div>
      </form>
    </div>
  );
};

export default SubmitFeedback;
