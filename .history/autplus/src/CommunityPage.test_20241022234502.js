import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommunityPage from './CommunityPage';
import { ReportProvider } from './ReportContext'; // Ensure the correct provider is used

const renderWithReportProvider = (ui) => {
    return render(
        <ReportProvider>
            {ui}
        </ReportProvider>
    );
};

describe('CommunityPage', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        // Set default user data in localStorage for testing
        localStorage.setItem("firstName", "John");
        localStorage.setItem("lastName", "Doe");
    });

    test('renders CommunityPage with user name and post form', () => {
        renderWithReportProvider(<CommunityPage />);
        
        // Check if the placeholder contains the user name
        expect(screen.getByPlaceholderText(/What's on your mind, John Doe?/)).toBeInTheDocument();
    });

    test('allows user to submit a post', () => {
        renderWithReportProvider(<CommunityPage />);
        
        const input = screen.getByPlaceholderText(/What's on your mind, John Doe?/);
        const submitButton = screen.getByText('Post');

        // Input a post
        fireEvent.change(input, { target: { value: 'Hello, world!' } });
        fireEvent.click(submitButton);

        // Check if the post appears in the document
        expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    });

    test('shows an alert when trying to submit an empty post', () => {
        renderWithReportProvider(<CommunityPage />);
        
        const submitButton = screen.getByText('Post');

        // Mock window alert
        window.alert = jest.fn();

        // Attempt to submit an empty post
        fireEvent.click(submitButton);

        // Check if the alert was called
        expect(window.alert).toHaveBeenCalledWith("Please write something to post.");
    });

    test('allows user to reply to a post', () => {
        renderWithReportProvider(<CommunityPage />);

        // Submit a post first
        const input = screen.getByPlaceholderText(/What's on your mind, John Doe?/);
        fireEvent.change(input, { target: { value: 'Hello, world!' } });
        fireEvent.click(screen.getByText('Post'));

        // Now reply to the post
        const replyInput = screen.getByPlaceholderText(/Reply as John/);
        fireEvent.change(replyInput, { target: { value: 'This is a reply.' } });
        fireEvent.click(screen.getByText('Reply'));

        // Check if the reply appears under the post
        expect(screen.getByText('This is a reply.')).toBeInTheDocument();
    });

    test('allows user to delete their own post', () => {
        renderWithReportProvider(<CommunityPage />);
        
        // Submit a post first
        const input = screen.getByPlaceholderText(/What's on your mind, John Doe?/);
        fireEvent.change(input, { target: { value: 'Post to delete.' } });
        fireEvent.click(screen.getByText('Post'));

        // Delete the post
        fireEvent.click(screen.getByText('Delete'));

        // Check that the post is no longer in the document
        expect(screen.queryByText('Post to delete.')).not.toBeInTheDocument();
    });

    test('allows user to report a post', () => {
        renderWithReportProvider(<CommunityPage />);
        
        // Submit a post first
        const input = screen.getByPlaceholderText(/What's on your mind, John Doe?/);
        fireEvent.change(input, { target: { value: 'Post to report.' } });
        fireEvent.click(screen.getByText('Post'));

        // Mock window alert
        window.alert = jest.fn();

        // Report the post
        fireEvent.click(screen.getByText('Report'));

        // Check that addReport function was called
        expect(window.alert).toHaveBeenCalledWith('John has been reported.');
    });
});
