// ProfilePage.js
import React, { useContext } from "react";
import "./ProfilePage.css";
import { ProfileContext } from "./ProfileContext"; // Import ProfileContext

const ProfilePage = () => {
  const { profileImage, setProfileImage } = useContext(ProfileContext); // Access and set profile image

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Update profile image globally
    }
  };

  return (
    <div className="profile-page-container">
      <h1>My Profile</h1>
      <div className="profile-details">
        {/* Profile picture and image change button */}
        <div className="profile-picture-section">
          <img src={profileImage} alt="Profile" className="profile-picture" />
          <label htmlFor="imageUpload" className="image-upload-button">
            Change Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        {/* Student Information */}
        <div className="profile-info">
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Student ID:</strong> 123456789
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
