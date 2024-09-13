import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Homepage from "./Homepage"; // Ensure the name is 'HomePage' with exact casing

import "./App.css"; // Import custom CSS for styling

function App() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(true); // Set the state to true when the button is clicked
  };

  return (
    <Router>
      <div className="container">
        {/* Conditionally render the welcome message and button if the button hasn't been clicked */}
        {!isButtonClicked && (
          <>
            <h1 className="welcome-text">Welcome to The Aut Web App</h1>
            <Link to="/login">
              <button className="enter-button" onClick={handleButtonClick}>
                Enter
              </button>
            </Link>
          </>
        )}

        {/* Routes for navigation */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
