import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../page/App';

test('main要素がある', () => {
  render(<App />);
  const mainEl = screen.getByRole("main");
  expect(mainEl).toBeInTheDocument();
});
