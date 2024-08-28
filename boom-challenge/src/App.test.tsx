import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title: Boom Challenge', () => {
  render(<App />);
  const linkElement = screen.getByText(/Boom Challenge/i);
  expect(linkElement).toBeInTheDocument();
});
