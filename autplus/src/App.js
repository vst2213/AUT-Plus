import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import "./App.css"; // Import custom CSS for styling

function App() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(true); // Set the state to true when the button is clicked
  };

  return (
    <Router>
      <div className="container">
        <h1 className="welcome-text">Welcome to The Aut Web App</h1>
        {!isButtonClicked && ( // Conditionally render the button if it's not clicked
          <Link to="/login">
            <button className="enter-button" onClick={handleButtonClick}>
              Enter
            </button>
          </Link>
        )}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
