import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./Homepage.css";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";

const HomePage = () => {
  const [profilePic, setProfilePic] = useState(
    "path/to/default-profile-pic.png"
  ); // Default profile picture
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setProfilePic(
            userDoc.data().profilePicture || "path/to/default-profile-pic.png"
          );
        }
      }
    };

    fetchProfilePic();
  }, [user]);

  return (
    <div className="home-container">
      <div className="header">
        <div className="left-header">
          <img src="path/to/aut-logo.png" alt="AUT Logo" className="logo" />
        </div>
        <div className="right-header">
          <Link to="/profile">
            <img src={profilePic} alt="Profile" className="profile-pic" />
          </Link>
        </div>
      </div>
      <div className="top-nav">
        <FaHome className="nav-icon" />
        <FaCommentDots className="nav-icon" />
        <FaCalendarAlt className="nav-icon" />
        <FaBars className="nav-icon" />
      </div>
      <div className="section">
        <h2>What's On Next</h2>
        <div className="cards">
          <div className="card event-card">
            <span>September 17th: 8am-2pm</span>
            <p>COMP703/W201A - Research and Development Project Part 2</p>
            <span className="location">offsite</span>
          </div>
          <div className="card event-card">
            <span>September 20th: 8am-2pm</span>
            <p>COMP703/W201A - Research and Development Project Part 2</p>
            <span className="location">WA220</span>
          </div>
        </div>
      </div>
      <div className="section news-section">
        <h2>News</h2>
        <div className="news-card">
          <h3>Academic Integrity Important Notice</h3>
          <p>YouTutor Alert: Important notice for students</p>
          <small>3 days ago</small>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
