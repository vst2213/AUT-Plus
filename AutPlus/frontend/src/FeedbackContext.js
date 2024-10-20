import React, { createContext, useState, useContext } from "react";

// Create the Feedback Context
const FeedbackContext = createContext();

// Create a provider component
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]); // Initialize an empty array to store feedback

  const addFeedback = (newFeedback) => {
    setFeedback((prevFeedback) => [...prevFeedback, newFeedback]);
  };

  return (
    <FeedbackContext.Provider value={{ feedback, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

// Custom hook to use the FeedbackContext
export const useFeedback = () => useContext(FeedbackContext);
