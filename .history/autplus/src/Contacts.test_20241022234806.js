// Contacts.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Contacts from './Contacts';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Contacts Component', () => {
    const mockNavigate = jest.requireMock('react-router-dom').useNavigate;

    beforeEach(() => {
        jest.clearAllMocks();
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

        expect(mockNavigate).toHaveBeenCalledWith('/more');
    });

    test('opens email client when Contact button is clicked', () => {
        // Mock window.location.href
        delete window.location;
        window.location = { href: '' };

        render(
            <MemoryRouter>
                <Contacts />
            </MemoryRouter>
        );

        const contactButtons = screen.getAllByText(/contact/i);
        fireEvent.click(contactButtons[0]);

        expect(window.location.href).toBe('mailto:matthew.kuo@autuni.ac.nz');
    });
});
