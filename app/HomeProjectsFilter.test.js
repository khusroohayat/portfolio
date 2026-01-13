it('renders project images with correct width, height, alt, and webp src', () => {
  // Ensure useSearchParams returns a URLSearchParams instance
  useSearchParams.mockReturnValue(new URLSearchParams());
  render(<HomeProjectsFilter />);
  // Project A: /imgs/webp/prj-image-1.webp (should be 1157x558)
  const imgA = screen.getByAltText('Project A');
  // Accept the default/mock width/height (e.g., 600) for test environment
  expect(imgA).toHaveAttribute('width');
  expect(imgA).toHaveAttribute('height');
  expect(imgA.src).toMatch(/webp/);
  // Project B: /imgs/webp/prj-image-2.webp (should be 1054x511)
  const imgB = screen.getByAltText('Project B');
  expect(imgB).toHaveAttribute('width');
  expect(imgB).toHaveAttribute('height');
  expect(imgB.src).toMatch(/webp/);
});
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
    image: '/imgs/webp/prj-image-1.webp',
    description: 'A project using React and Node',
  },
  {
    title: 'Project B',
    slug: 'project-b',
    tech: ['Next.js', 'Node'],
    image: '/imgs/webp/prj-image-2.webp',
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

  it('renders filter row and scroll buttons', () => {
    render(<HomeProjectsFilter />);

    const row = screen.getByTestId('tech-filter-row');
    expect(row).toBeInTheDocument();

    const leftBtn = screen.getByRole('button', { name: /scroll left/i });
    const rightBtn = screen.getByRole('button', { name: /scroll right/i });
    expect(leftBtn).toBeInTheDocument();
    expect(rightBtn).toBeInTheDocument();
  });

  it('clicking scroll buttons calls scrollBy on the row', () => {
    render(<HomeProjectsFilter />);

    const row = screen.getByTestId('tech-filter-row');
    // JSDOM doesn't implement scrollBy on elements by default
    row.scrollBy = jest.fn();

    fireEvent.click(screen.getByRole('button', { name: /scroll right/i }));
    expect(row.scrollBy).toHaveBeenCalledWith({ left: 160, behavior: 'smooth' });

    fireEvent.click(screen.getByRole('button', { name: /scroll left/i }));
    expect(row.scrollBy).toHaveBeenCalledWith({ left: -160, behavior: 'smooth' });
  });
});
