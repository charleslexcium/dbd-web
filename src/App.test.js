import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login button when not authenticated', () => {
  render(<App />);
  const loginButton = screen.getByText(/login/i);
  expect(loginButton).toBeInTheDocument();
});
