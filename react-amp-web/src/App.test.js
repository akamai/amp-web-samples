import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello React+AMP! link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello React\+AMP!/i);
  expect(linkElement).toBeInTheDocument();
});
