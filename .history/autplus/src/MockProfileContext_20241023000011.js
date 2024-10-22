// MockProfileContext.js
import React from 'react';
import { ProfileContext } from './ProfileContext'; // Ensure this import points to your actual context file

export const MockProfileContext = ({ children }) => {
  const mockValue = {
    // Mock any values that your context might use
    profileImage: "mock-image-url", // Example mock value
    // Add more properties as needed for your tests
  };

  return (
    <ProfileContext.Provider value={mockValue}>
      {children}
    </ProfileContext.Provider>
  );
};
