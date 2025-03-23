import { render, screen } from '@testing-library/react';
import FootballForm from './FootballForm';

test('renders form with Get Standings button', () => {
  render(<FootballForm />);
  const buttonElement = screen.getByText(/Get Standings/i);
  expect(buttonElement).toBeInTheDocument();
});