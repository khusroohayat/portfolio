import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import HomeProjectsFilter from './HomeProjectsFilter';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

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
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
    useSearchParams.mockReturnValue(mockSearchParams);
  });

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

  it('initializes filter from URL query string', () => {
    const searchParamsWithTech = new URLSearchParams('tech=React');
    useSearchParams.mockReturnValue(searchParamsWithTech);

    render(<HomeProjectsFilter />);
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.queryByText('Project B')).not.toBeInTheDocument();
  });

  it('updates URL when tech filter changes', () => {
    render(<HomeProjectsFilter />);
    fireEvent.click(screen.getByRole('button', { name: 'React' }));

    expect(mockPush).toHaveBeenCalledWith('?tech=React', { scroll: false });
  });

  it('removes tech parameter when All is clicked', () => {
    const searchParamsWithTech = new URLSearchParams('tech=React');
    useSearchParams.mockReturnValue(searchParamsWithTech);

    render(<HomeProjectsFilter />);
    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    expect(mockPush).toHaveBeenCalledWith('/', { scroll: false });
  });

  it('ignores invalid tech parameter from URL', () => {
    const searchParamsWithInvalidTech = new URLSearchParams('tech=InvalidTech');
    useSearchParams.mockReturnValue(searchParamsWithInvalidTech);

    render(<HomeProjectsFilter />);
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('Project B')).toBeInTheDocument();
  });
});
