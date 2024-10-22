// HomePage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import { ProfileContext } from "./ProfileContext";

// Mock the ProfileContext to provide a mock profile image
const mockProfileImage = "/pictures/mock-profile.jpg"; // Use a mock profile image

const renderWithContext = (ui) => {
    return render(
        <ProfileContext.Provider value={{ profileImage: mockProfileImage }}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </ProfileContext.Provider>
    );
};

describe("HomePage Component", () => {
    beforeEach(() => {
        // Reset localStorage before each test
        localStorage.clear();
    });

    test("renders HomePage with profile image and navigation links", () => {
        renderWithContext(<HomePage />);

        // Check if profile image is rendered
        expect(screen.getByAltText(/profile/i)).toHaveAttribute("src", mockProfileImage);
        
        // Check if navigation icons are rendered
        expect(screen.getByLabelText(/home/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/community/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/calendar/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/more/i)).toBeInTheDocument();
    });

    test("toggles dark mode state", () => {
        // Initially, dark mode should be off
        renderWithContext(<HomePage />);
        expect(screen.getByText("What's On Next").closest("div")).not.toHaveClass("dark-mode");

        // Set dark mode in localStorage and re-render the component
        localStorage.setItem("darkMode", "true");
        renderWithContext(<HomePage />);
        
        // Check if dark mode class is applied
        expect(screen.getByText("What's On Next").closest("div")).toHaveClass("dark-mode");
        
        // Toggle dark mode off
        const toggleButton = screen.getByRole("button", { name: /toggle dark mode/i }); // Assuming you have a toggle button
        fireEvent.click(toggleButton); // Simulate a click event
        expect(screen.getByText("What's On Next").closest("div")).not.toHaveClass("dark-mode");
        
        // Check localStorage to see if the state is saved
        expect(localStorage.getItem("darkMode")).toBe("false");
    });
    
    test("renders events and news sections", () => {
        renderWithContext(<HomePage />);

        // Check if events are rendered
        expect(screen.getByText(/September 17th: 8am-2pm/i)).toBeInTheDocument();
        expect(screen.getByText(/COMP703\/W201A - Research and Development Project Part 2/i)).toBeInTheDocument();
        
        // Check if news section is rendered
        expect(screen.getByText(/Academic Integrity Important Notice/i)).toBeInTheDocument();
        expect(screen.getByText(/YouTutor Alert: Important notice for students/i)).toBeInTheDocument();
    });
});
