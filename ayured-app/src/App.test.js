import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page CTAs', () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1, name: /ayurbalance/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /start your journey/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /patient login/i })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /doctor login/i }).length).toBeGreaterThan(0);
});
