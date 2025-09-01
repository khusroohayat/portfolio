
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectDetailPage from './page';

jest.mock('../../../data/projects.json', () => [
  {
    title: 'Project A',
    slug: 'project-a',
    tech: ['React', 'Jest'],
    image: '/imgs/prj-image-1.png',
    description: 'A project using React',
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/example/project-a',
  },
]);

describe('ProjectDetailPage', () => {
  it('renders project details for a valid slug', () => {
    render(<ProjectDetailPage params={{ slug: 'project-a' }} />);
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('A project using React')).toBeInTheDocument();
    // Tech badges
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
    // Demo button
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute('href', 'https://demo.example.com');
  // GitHub icon link (link name is from image alt)
  const githubLink = screen.getByRole('link', { name: /github/i });
  expect(githubLink).toHaveAttribute('href', 'https://github.com/example/project-a');
    // Back to Projects link at bottom
    expect(screen.getByRole('link', { name: /back to projects/i })).toBeInTheDocument();
  });

  it('renders not found for an invalid slug', () => {
    render(<ProjectDetailPage params={{ slug: 'not-a-real-slug' }} />);
    expect(screen.getByText(/project not found/i)).toBeInTheDocument();
  });
});
