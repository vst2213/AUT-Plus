// ProfileContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const ProfileContext = createContext();

// Create the provider component
export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "/path/to/default-image.png"
  );

  // Save profile image to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("profileImage", profileImage);
  }, [profileImage]);

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};
