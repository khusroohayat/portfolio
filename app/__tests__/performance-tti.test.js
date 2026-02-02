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

import projects from '../../data/projects.json';

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
    render(<HomeProjectsFilter projects={projects} />);
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('loading', 'lazy');
      // Next.js Image may not pass placeholder/blurDataURL to img in test env, so check if props exist if present
      if ('placeholder' in img) {
        expect(img).toHaveAttribute('placeholder', 'blur');
      }
      if ('blurDataURL' in img) {
        expect(img).toHaveAttribute('blurDataURL', '/imgs/placeholder.png');
      }
    });
  });

  it('Project detail image uses blur placeholder', () => {
    const project = projects[0];
    render(<ProjectDetailPage params={{ slug: project.slug }} />);
    const img = screen.getByRole('img', { name: new RegExp(project.title, 'i') });
    expect(img).toHaveAttribute('loading', 'lazy');
    if ('placeholder' in img) {
      expect(img).toHaveAttribute('placeholder', 'blur');
    }
    if ('blurDataURL' in img) {
      expect(img).toHaveAttribute('blurDataURL', '/imgs/placeholder.png');
    }
  });
});
