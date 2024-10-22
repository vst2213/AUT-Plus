import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from './Signup'; // Adjust the import path as necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Adjust the import path as necessary

// Mock the firebase method
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

describe('Signup Component', () => {
  beforeEach(() => {
    render(<Signup />);
  });

  test('renders Signup form', () => {
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('handles user input correctly', () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits the form successfully', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    
    // Mock successful signup
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { email },
    });

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: email } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    const successMessage = await screen.findByText(/Signup successful!/i);
    expect(successMessage).toBeInTheDocument();
  });

  test('displays an error message on signup failure', async () => {
    const errorMessage = 'Signup failed.';

    // Mock failed signup
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error(errorMessage));

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    const errorMessageElement = await screen.findByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
