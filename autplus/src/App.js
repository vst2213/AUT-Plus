import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Homepage from "./Homepage";
import CommunityPage from "./CommunityPage";
import ClubsPage from "./ClubsPage";
import ProfilePage from "./ProfilePage"; // Make sure this import is correct
import "./App.css"; // Import custom CSS for styling

function App() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  return (
    <Router>
      <div className="container">
        {!isButtonClicked && (
          <>
            <h1 className="welcome-text">Welcome to The AUT Web App</h1>
            <Link to="/login">
              <button className="enter-button" onClick={handleButtonClick}>
                Enter
              </button>
            </Link>
          </>
        )}

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/profile" element={<ProfilePage />} />{" "}
          {/* Correct ProfilePage route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
