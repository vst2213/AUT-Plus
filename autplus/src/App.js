import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Homepage from "./Homepage";
import CommunityPage from "./CommunityPage";
import ClubsPage from "./ClubsPage";
import JoinedClubsPage from "./JoinedClubsPage";
import MorePage from "./MorePage";
import MyDetails from "./MyDetails";
import MakeBooking from "./MakeBooking";
import Notifications from "./Notifications";
import Contacts from "./Contacts";
import Calendar from "./Calendar";

import "./App.css";

function App() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]); // 예약 정보 상태
  const [notificationDetails, setNotificationDetails] = useState([]); // 알림 정보 상태

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  // 예약 정보를 추가하는 함수
  const handleSetBookingDetails = (newBooking) => {
    setBookingDetails((prevDetails) => [...prevDetails, newBooking]);
  };

  // 알림 정보를 추가하는 함수
  const handleSetNotificationDetails = (newNotification) => {
    setNotificationDetails((prevNotifications) => [...prevNotifications, newNotification]);
  };

  return (
    <Router>
      <div className="container">
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

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Homepage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/joined-clubs" element={<JoinedClubsPage />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="/my-details" element={<MyDetails />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/calendar" element={<Calendar setNotificationDetails={handleSetNotificationDetails} />} />
          
          <Route 
            path="/make-booking" 
            element={<MakeBooking setBookingDetails={handleSetBookingDetails} />} 
          />
          <Route 
            path="/notifications" 
            element={<Notifications bookingDetails={bookingDetails} notificationDetails={notificationDetails} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;