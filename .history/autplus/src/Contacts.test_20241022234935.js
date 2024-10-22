// Contacts.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contacts from './Contacts';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Contacts Component', () => {
    const mockNavigate = require('react-router-dom').useNavigate;

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock calls
    });

    test('renders Contacts component with class list', () => {
        render(
            <MemoryRouter>
                <Contacts />
            </MemoryRouter>
        );

        // Check if header and contact items are rendered
        expect(screen.getByText(/contacts/i)).toBeInTheDocument();
        expect(screen.getByText(/COMP602 - Matthew Kuo/i)).toBeInTheDocument();
        expect(screen.getByText(/COMP602 - Jane Jung/i)).toBeInTheDocument();
        expect(screen.getByText(/COMP 9999 - Albert Einstein/i)).toBeInTheDocument();
    });

    test('navigates to MorePage when Back button is clicked', () => {
        render(
            <MemoryRouter>
                <Contacts />
            </MemoryRouter>
        );

        const backButton = screen.getByText(/back/i);
        fireEvent.click(backButton);

        expect(mockNavigate).toHaveBeenCalledTimes(1); // Check if the navigate function was called
        expect(mockNavigate).toHaveBeenCalledWith('/more'); // Check the argument
    });

    test('opens email client when Contact button is clicked', () => {
        // Mock window.open
        delete window.open; // Delete any existing window.open mock to avoid interference
        window.open = jest.fn(); // Create a new mock for window.open

        render(
            <MemoryRouter>
                <Contacts />
            </MemoryRouter>
        );

        const contactButtons = screen.getAllByText(/contact/i);
        fireEvent.click(contactButtons[0]); // Click on the first contact button

        expect(window.open).toHaveBeenCalledTimes(1); // Check if window.open was called
        expect(window.open).toHaveBeenCalledWith('mailto:matthew.kuo@autuni.ac.nz'); // Check the argument
    });
});
