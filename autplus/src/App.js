import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Homepage from "./Homepage"; // Ensure the name is 'Homepage' with exact casing
import NotificationPage from "./NotificationPage"; // 추가된 NotificationPage
import SettingsPage from "./SettingsPage"; // 추가된 SettingsPage

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
          <Route path="/home" element={<Homepage />} />
          <Route path="/notifications" element={<NotificationPage />} /> {/* Notification 페이지 추가 */}
          <Route path="/settings" element={<SettingsPage />} /> {/* Settings 페이지 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;