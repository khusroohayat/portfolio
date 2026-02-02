it('renders project images with correct width, height, and alt', () => {
  useSearchParams.mockReturnValue(new URLSearchParams());
  render(<HomeProjectsFilter projects={projects} />);
  // Check the first two projects in the real data
  for (let i = 0; i < 2; i++) {
    const project = projects[i];
    const img = screen.getByAltText(project.title);
    expect(img).toHaveAttribute('width', '600');
    expect(img).toHaveAttribute('height', '340');
  }
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

// Use the real projects.json for integration-like tests
import projects from '../data/projects.json';

describe('HomeProjectsFilter', () => {
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
    useSearchParams.mockReturnValue(mockSearchParams);
  });

  it('renders all projects by default', () => {
    render(<HomeProjectsFilter projects={projects} />);
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('filters projects by tech', () => {
    render(<HomeProjectsFilter projects={projects} />);
    // Pick a tech from the first project
    const tech = projects[0].tech[0];
    fireEvent.click(screen.getByRole('button', { name: tech }));
    // Only projects with that tech should be visible
    projects.forEach((project) => {
      if (project.tech.includes(tech)) {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(project.title)).not.toBeInTheDocument();
      }
    });
  });

  it('shows all projects when All is clicked', () => {
    render(<HomeProjectsFilter projects={projects} />);
    const tech = projects[0].tech[0];
    fireEvent.click(screen.getByRole('button', { name: tech }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('links to project detail pages', () => {
    render(<HomeProjectsFilter projects={projects} />);
    const project = projects[0];
    const link = screen.getByRole('link', { name: new RegExp(project.title, 'i') });
    expect(link).toHaveAttribute('href', `/projects/${project.slug}`);
  });

  it('initializes filter from URL query string', () => {
    const tech = projects[0].tech[0];
    const searchParamsWithTech = new URLSearchParams(`tech=${tech}`);
    useSearchParams.mockReturnValue(searchParamsWithTech);

    render(<HomeProjectsFilter projects={projects} />);
    projects.forEach((project) => {
      if (project.tech.includes(tech)) {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(project.title)).not.toBeInTheDocument();
      }
    });
  });

  it('updates URL when tech filter changes', () => {
    render(<HomeProjectsFilter projects={projects} />);
    const tech = projects[0].tech[0];
    fireEvent.click(screen.getByRole('button', { name: tech }));
    expect(mockPush).toHaveBeenCalledWith(`?tech=${tech}`, { scroll: false });
  });

  it('removes tech parameter when All is clicked', () => {
    const tech = projects[0].tech[0];
    const searchParamsWithTech = new URLSearchParams(`tech=${tech}`);
    useSearchParams.mockReturnValue(searchParamsWithTech);

    render(<HomeProjectsFilter projects={projects} />);
    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    // Should remove the query string, so just the pathname
    expect(mockPush).toHaveBeenCalledWith('/', { scroll: false });
  });

  it('ignores invalid tech parameter from URL', () => {
    const searchParamsWithInvalidTech = new URLSearchParams('tech=InvalidTech');
    useSearchParams.mockReturnValue(searchParamsWithInvalidTech);

    render(<HomeProjectsFilter projects={projects} />);
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('renders filter row and scroll buttons', () => {
    render(<HomeProjectsFilter projects={projects} />);

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
