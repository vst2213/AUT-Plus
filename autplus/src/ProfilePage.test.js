// ProfilePage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { ProfileContext } from './ProfileContext'; // Import your actual context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for mocking

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Create a mock context provider
const MockProfileContext = ({ children }) => {
  const mockSetProfileImage = jest.fn();
  const mockProfileImage = "/mock-image-url.jpg"; // Mock initial profile image

  return (
    <ProfileContext.Provider value={{ profileImage: mockProfileImage, setProfileImage: mockSetProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

describe('ProfilePage Component', () => {
  beforeEach(() => {
    render(
      <MockProfileContext>
        <ProfilePage />
      </MockProfileContext>
    );
  });

  test('renders profile page', () => {
    expect(screen.getByText(/My Profile Picture/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Profile/i)).toHaveAttribute('src', "/mock-image-url.jpg");
    expect(screen.getByLabelText(/Change Image/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  test('changes profile image on file input', () => {
    const file = new Blob(['dummy content'], { type: 'image/jpeg' });
    const imageUploadInput = screen.getByLabelText(/Change Image/i);

    // Mock the URL.createObjectURL method
    const createObjectURLMock = jest.spyOn(URL, 'createObjectURL').mockReturnValue('/mock-image-url.jpg');

    // Simulate file upload
    fireEvent.change(imageUploadInput, { target: { files: [file] } });

    // Check that setProfileImage was called with the new image URL
    expect(createObjectURLMock).toHaveBeenCalledWith(file);
    
    // Clean up the mock
    createObjectURLMock.mockRestore();
  });

  test('navigates to home on save button click', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    // Click the save button
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    // Check that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});
