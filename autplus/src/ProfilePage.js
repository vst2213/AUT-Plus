import React, { useContext } from "react";
import { ProfileContext } from "./ProfileContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./ProfilePage.css"; // Ensure you have the appropriate CSS styles

const ProfilePage = () => {
  const { profileImage, setProfileImage } = useContext(ProfileContext);
  const navigate = useNavigate(); // Initialize navigate function

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Update the profile image globally
    }
  };

  const handleSave = () => {
    // Navigate back to the homepage
    navigate("/home");
  };

  return (
    <div className="profile-page-container">
      <h1>My Profile Picture</h1>
      <div className="profile-details">
        <div className="profile-picture-section">
          <img
            src={profileImage || "/pictures/pfp.jpeg"} // Fallback to default profile image
            alt="Profile"
            className="profile-picture"
          />
          {/* Change Image Button */}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          <button
            className="change-image-button"
            onClick={() => document.getElementById("imageUpload").click()} // Trigger file input click
          >
            Change Image
          </button>
        </div>
        {/* Add the Save button */}
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
