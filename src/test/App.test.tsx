import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../page/App';

test('renders learn react link', () => {
  render(<App />);
  const h1Element = screen.getByText(/Hello Tailwind CSS!/i);
  expect(h1Element).toBeInTheDocument();
});
