import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from '../page';
import '@testing-library/jest-dom';

describe('AboutPage', () => {
  it('renders the about page heading', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', { level: 1, name: /about me/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the professional biography', () => {
    render(<AboutPage />);
    const bioText = screen.getByText(/passionate software engineer/i);
    expect(bioText).toBeInTheDocument();
  });

  it('renders the professional timeline', () => {
    render(<AboutPage />);
    const timelineHeading = screen.getByRole('heading', { name: /professional timeline/i });
    expect(timelineHeading).toBeInTheDocument();
  });
});
