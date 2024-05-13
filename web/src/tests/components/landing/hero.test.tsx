import { Hero } from '@/components/landing/hero';
import { render, screen } from '@testing-library/react';

describe('Hero', () => {
  it('should render with correct text', () => {
    render(<Hero />);

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent(/expert categories/i);
    expect(headings[1]).toHaveTextContent(
      'Manage your job smartly with MyNote',
    );
  });
});
