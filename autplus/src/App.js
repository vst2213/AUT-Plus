import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Homepage from "./Homepage";
import CommunityPage from "./CommunityPage";
import ClubsPage from "./ClubsPage"; // Import ClubsPage
import MorePage from "./MorePage"; // Import MorePage
import MyDetails from "./MyDetails";
import MakeBooking from "./MakeBooking";
import Notifications from "./Notifications";
import Contacts from "./Contacts"; // Import Contacts

import "./App.css"; // Import custom CSS for styling

function App() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

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
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/clubs" element={<ClubsPage />} /> {/* Add route for ClubsPage */}
          <Route path="/more" element={<MorePage />} /> {/* Add route for MorePage */}
          <Route path="/my-details" element={<MyDetails />} /> 
          <Route path="/contacts" element={<Contacts />} /> {/* Add route for Contacts */}
          <Route 
            path="/make-booking" 
            element={<MakeBooking setBookingDetails={setBookingDetails} />} 
          />
          <Route 
            path="/notifications" 
            element={<Notifications bookingDetails={bookingDetails} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;