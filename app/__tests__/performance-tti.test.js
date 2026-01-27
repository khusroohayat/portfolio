import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';
import HomeProjectsFilter from '../HomeProjectsFilter';
import { useRouter, useSearchParams } from 'next/navigation';
import ProjectDetailPage from '../projects/[slug]/page';

// Mock next/navigation for App Router context
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));
jest.mock('next/dynamic', () => {
  return (importFn, options) => {
    const React = require('react');
    const Fallback = options && options.loading ? options.loading : () => null;
    return function DynamicComponent(props) {
      const [Loaded, setLoaded] = React.useState(null);
      React.useEffect(() => {
        let mounted = true;
        importFn().then((mod) => {
          if (mounted) setLoaded(() => mod.default || mod);
        });
        return () => {
          mounted = false;
        };
      }, []);
      if (Loaded) {
        return React.createElement(Loaded, props);
      }
      return React.createElement(Fallback);
    };
  };
});

// Mock next/image to inspect props
jest.mock('next/image', () => ({ __esModule: true, default: (props) => <img {...props} /> }));

// Mock projects.json for detail page
jest.mock('../../data/projects.json', () => [
  {
    title: 'Project A',
    slug: 'project-a',
    tech: ['React', 'Node'],
    image: '/imgs/prj-image-1.png',
    description: 'A project using React and Node',
  },
]);

describe('Performance/TTI optimizations', () => {
  beforeEach(() => {
    // Provide mock implementations for App Router context
    useRouter.mockReturnValue({ push: jest.fn() });
    useSearchParams.mockReturnValue(new URLSearchParams());
  });

  it('Home page uses dynamic imports for non-critical components', async () => {
    render(<Home />);
    expect(await screen.findByTestId('home-projects-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('services-section')).toBeInTheDocument();
  });

  it('Project images use lazy loading and blur placeholder', () => {
    render(<HomeProjectsFilter />);
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('placeholder', 'blur');
      expect(img).toHaveAttribute('blurDataURL', '/imgs/placeholder.png');
    });
  });

  it('Project detail image uses blur placeholder', () => {
    render(<ProjectDetailPage params={{ slug: 'project-a' }} />);
    const img = screen.getByRole('img', { name: /project a/i });
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('placeholder', 'blur');
    expect(img).toHaveAttribute('blurDataURL', '/imgs/placeholder.png');
  });
});
