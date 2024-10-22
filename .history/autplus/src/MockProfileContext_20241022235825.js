// MockProfileContext.js
import React from 'react';
import { ProfileContext } from './ProfileContext'; // Adjust this import according to your actual ProfileContext file

export const MockProfileContext = ({ children }) => {
  const mockValue = {
    profileImage: "mock-image-url", // Mock value
  };

  return (
    <ProfileContext.Provider value={mockValue}>
      {children}
    </ProfileContext.Provider>
  );
};
