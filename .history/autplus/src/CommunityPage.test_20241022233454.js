import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommunityPage from './CommunityPage'; // Adjust the import based on your file structure
import { ReportsProvider } from './ReportContext'; // Mock the ReportContext

const renderWithReportsProvider = (ui) => {
  return render(<ReportsProvider>{ui}</ReportsProvider>);
};

describe('CommunityPage', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('firstName', 'John');
    localStorage.setItem('lastName', 'Doe');
    localStorage.setItem('darkMode', 'false');
    localStorage.setItem('points', '0');
  });

  test('renders CommunityPage with user name and post form', () => {
    renderWithReportsProvider(<CommunityPage />);
    
    expect(screen.getByPlaceholderText("What's on your mind, John Doe?")).toBeInTheDocument();
    expect(screen.getByText('Community Posts')).toBeInTheDocument();
  });

  test('allows user to submit a post', () => {
    renderWithReportsProvider(<CommunityPage />);
    
    const postInput = screen.getByPlaceholderText("What's on your mind, John Doe?");
    const submitButton = screen.getByText('Post');

    fireEvent.change(postInput, { target: { value: 'Hello World!' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });

  test('shows an alert when trying to submit an empty post', () => {
    global.alert = jest.fn(); // Mock alert

    renderWithReportsProvider(<CommunityPage />);
    
    const submitButton = screen.getByText('Post');
    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith('Please write something to post.');
  });

  test('allows user to reply to a post', () => {
    renderWithReportsProvider(<CommunityPage />);
    
    const postInput = screen.getByPlaceholderText("What's on your mind, John Doe?");
    const submitButton = screen.getByText('Post');

    fireEvent.change(postInput, { target: { value: 'Hello World!' } });
    fireEvent.click(submitButton);

    const replyInput = screen.getByPlaceholderText('Reply as John Doe');
    const replyButton = screen.getByText('Reply');

    fireEvent.change(replyInput, { target: { value: 'Nice to see this!' } });
    fireEvent.click(replyButton);

    expect(screen.getByText('Nice to see this!')).toBeInTheDocument();
  });

  test('allows user to delete their own post', () => {
    renderWithReportsProvider(<CommunityPage />);
    
    const postInput = screen.getByPlaceholderText("What's on your mind, John Doe?");
    const submitButton = screen.getByText('Post');

    fireEvent.change(postInput, { target: { value: 'Post to be deleted' } });
    fireEvent.click(submitButton);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Post to be deleted')).not.toBeInTheDocument();
  });

  test('allows user to report a post', () => {
    renderWithReportsProvider(<CommunityPage />);
    
    const postInput = screen.getByPlaceholderText("What's on your mind, John Doe?");
    const submitButton = screen.getByText('Post');

    fireEvent.change(postInput, { target: { value: 'Report this post' } });
    fireEvent.click(submitButton);

    const reportButton = screen.getByText('Report');
    fireEvent.click(reportButton);

    expect(screen.getByText('Reported')).toBeInTheDocument();
  });
});
