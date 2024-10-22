import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommunityPage from './CommunityPage';
import { ReportsProvider } from './path/to/ReportContext'; // Adjust the path accordingly

const mockAddReport = jest.fn();

const renderWithReportsProvider = (ui) => {
  return render(
    <ReportsProvider value={{ addReport: mockAddReport }}>
      {ui}
    </ReportsProvider>
  );
};

describe('CommunityPage', () => {
  beforeEach(() => {
    // Clear localStorage and set initial values
    localStorage.clear();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => {
          if (key === 'firstName') return 'John';
          if (key === 'lastName') return 'Doe';
          if (key === 'darkMode') return 'false';
          if (key === 'points') return '0';
          return null;
        }),
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  test('renders CommunityPage with user name and post form', () => {
    renderWithReportsProvider(<CommunityPage />);
    
    expect(screen.getByPlaceholderText("What's on your mind, John Doe?")).toBeInTheDocument();
    expect(screen.getByText('Community Posts')).toBeInTheDocument();
  });

  test('allows user to submit a post', async () => {
    renderWithReportsProvider(<CommunityPage />);
    
    const postInput = screen.getByPlaceholderText("What's on your mind, John Doe?");
    const submitButton = screen.getByText('Post');

    fireEvent.change(postInput, { target: { value: 'Hello World!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });
  });

  test('shows an alert when trying to submit an empty post', () => {
    global.alert = jest.fn(); // Mock alert

    renderWithReportsProvider(<CommunityPage />);
    
    const submitButton = screen.getByText('Post');
    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith('Please write something to post.');
  });

  test('allows user to reply to a post', async () => {
    renderWithReportsProvider(<CommunityPage />);
    
    const postInput = screen.getByPlaceholderText("What's on your mind, John Doe?");
    const submitButton = screen.getByText('Post');

    fireEvent.change(postInput, { target: { value: 'Hello World!' } });
    fireEvent.click(submitButton);

    const replyInput = screen.getByPlaceholderText('Reply as John Doe');
    fireEvent.change(replyInput, { target: { value: 'Nice to see this!' } });
    fireEvent.click(screen.getByText('Reply'));

    await waitFor(() => {
      expect(screen.getByText('Nice to see this!')).toBeInTheDocument();
    });
  });

  test('allows user to delete their own post', async () => {
    renderWithReportsProvider(<CommunityPage />);
    
    const postInput = screen.getByPlaceholderText("What's on your mind, John Doe?");
    const submitButton = screen.getByText('Post');

    fireEvent.change(postInput, { target: { value: 'Post to be deleted' } });
    fireEvent.click(submitButton);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('Post to be deleted')).not.toBeInTheDocument();
    });
  });

  test('allows user to report a post', async () => {
    renderWithReportsProvider(<CommunityPage />);
    
    const postInput = screen.getByPlaceholderText("What's on your mind, John Doe?");
    const submitButton = screen.getByText('Post');

    fireEvent.change(postInput, { target: { value: 'Report this post' } });
    fireEvent.click(submitButton);

    const reportButton = screen.getByText('Report');
    fireEvent.click(reportButton);

    expect(mockAddReport).toHaveBeenCalledWith('John', 'Report this post');
    await waitFor(() => {
      expect(screen.getByText('Reported')).toBeInTheDocument();
    });
  });
});
