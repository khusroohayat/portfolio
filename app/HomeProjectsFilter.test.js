import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeProjectsFilter from './HomeProjectsFilter';

jest.mock('../data/projects.json', () => [
  {
    title: 'Project A',
    slug: 'project-a',
    tech: ['React', 'Node'],
    image: '/imgs/prj-image-1.png',
    description: 'A project using React and Node',
  },
  {
    title: 'Project B',
    slug: 'project-b',
    tech: ['Next.js', 'Node'],
    image: '/imgs/prj-image-2.png',
    description: 'A project using Next.js and Node',
  },
]);

describe('HomeProjectsFilter', () => {
  it('renders all projects by default', () => {
    render(<HomeProjectsFilter />);
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('Project B')).toBeInTheDocument();
  });

  it('filters projects by tech', () => {
    render(<HomeProjectsFilter />);
    fireEvent.click(screen.getByRole('button', { name: 'React' }));
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.queryByText('Project B')).not.toBeInTheDocument();
  });

  it('shows all projects when All is clicked', () => {
    render(<HomeProjectsFilter />);
    fireEvent.click(screen.getByRole('button', { name: 'React' }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('Project B')).toBeInTheDocument();
  });

  it('links to project detail pages', () => {
    render(<HomeProjectsFilter />);
    const link = screen.getByRole('link', { name: /Project A/i });
    expect(link).toHaveAttribute('href', '/projects/project-a');
  });
});
