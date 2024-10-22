// MockProfileContext.js
import React from 'react';
import { ProfileContext } from './ProfileContext'; // Adjust this import according to your actual ProfileContext file

export const MockProfileContext = ({ children }) => {
  const mockValue = {
    // Provide any mock values that your context might need
    profileImage: "mock-image-url", // Example mock value
    // Add more properties as needed for your tests
  };

  return (
    <ProfileContext.Provider value={mockValue}>
      {children}
    </ProfileContext.Provider>
  );
};
