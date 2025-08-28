import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectDetailPage from './page';

jest.mock('../../../data/projects.json', () => [
  {
    title: 'Project A',
    slug: 'project-a',
    tech: ['React'],
    image: '/imgs/prj-image-1.png',
    description: 'A project using React',
  },
]);

describe('ProjectDetailPage', () => {
  it('renders project details for a valid slug', () => {
    render(<ProjectDetailPage params={{ slug: 'project-a' }} />);
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('A project using React')).toBeInTheDocument();
  });

  it('renders not found for an invalid slug', () => {
    // You may need to mock the notFound function or test the error boundary
    // This is a placeholder for your actual not-found logic
  });
});
