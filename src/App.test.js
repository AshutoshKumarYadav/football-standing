import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Football Standings heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Football Standings/i);
  expect(headingElement).toBeInTheDocument();
});
