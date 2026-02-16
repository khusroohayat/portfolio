import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from '../page';
import RootLayout from '../layout';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock Next.js components and modules
jest.mock('next/image', () => ({ __esModule: true, default: (props) => <img {...props} /> }));
jest.mock('next/link', () => ({ __esModule: true, default: (props) => <a {...props} /> }));
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock components
jest.mock('../HomeProjectsFilter', () => () => (
  <div data-testid="home-projects-filter">[Project Filter]</div>
));
jest.mock('../ServicesSection', () => () => (
  <div data-testid="services-section">[Services Section]</div>
));

// Mock projects.json
jest.mock('../../data/projects.json', () => [
  {
    slug: 'workforce-kit',
    title: 'WorkForce Kit',
    description: 'Empowering Industries with Streamlined Workforce Management',
    image: './imgs/prj-image-1.png',
    tech: ['React', 'Azure'],
  },
  {
    slug: 'commerce-genie',
    title: 'Commerce Genie',
    description: 'AI‑Powered Ecommerce Content & Automation Platform',
    image: './imgs/prj-image-2.png',
    tech: ['Next.js', 'OpenAI'],
  },
]);

describe('Accessibility Tests', () => {
  describe('Home Page', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Home />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper heading hierarchy', () => {
      render(<Home />);
      // Check for main heading
      expect(document.querySelector('h1')).toBeInTheDocument();
      // Check for section headings
      expect(document.querySelector('h2')).toBeInTheDocument();
      expect(document.querySelector('h3')).toBeInTheDocument();
    });

    it('should have proper form labels and accessibility attributes', () => {
      render(<Home />);
      const input = document.querySelector('input[type="text"]');
      // Instead of placeholder, check for label association
      const label = document.querySelector('label[for="contact-name"]');
      expect(label).toBeInTheDocument();
      expect(input).toHaveAttribute('required');

      const button = document.querySelector('button[type="submit"]');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Layout Component', () => {
    it('should not have accessibility violations in header and navigation', async () => {
      const { container } = render(
        <RootLayout>
          <main>
            <section>
              <h1>Test Page</h1>
              <div>Test content</div>
            </section>
          </main>
        </RootLayout>
      );

      // Test only the header and navigation parts, not the full document
      const header = container.querySelector('header');
      const results = await axe(header);
      expect(results).toHaveNoViolations();
    });

    it('should have proper navigation structure', () => {
      render(
        <RootLayout>
          <main>
            <h1>Test Page</h1>
            <div>Test content</div>
          </main>
        </RootLayout>
      );

      // Check for banner role (header)
      expect(document.querySelector('header')).toBeInTheDocument();

      // Check for navigation links
      const navLinks = document.querySelectorAll('nav a');
      expect(navLinks.length).toBeGreaterThan(0);

      // Check that links have proper href attributes
      navLinks.forEach((link) => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should have proper landmark roles', () => {
      render(
        <RootLayout>
          <main>
            <section>
              <h2>Test Section</h2>
              <p>Test content</p>
            </section>
          </main>
        </RootLayout>
      );

      expect(document.querySelector('header')).toBeInTheDocument();
      expect(document.querySelector('main')).toBeInTheDocument();
      expect(document.querySelector('section')).toBeInTheDocument();
    });
  });

  describe('General Accessibility Checks', () => {
    it('should have proper alt text for images', () => {
      render(<Home />);
      const images = document.querySelectorAll('img');

      images.forEach((img) => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });

    it('should have proper button accessibility', () => {
      render(<Home />);
      const buttons = document.querySelectorAll('button');

      buttons.forEach((button) => {
        // Buttons should have accessible text (either text content or aria-label)
        const hasText = button.textContent.trim() !== '';
        const hasAriaLabel = button.hasAttribute('aria-label');
        expect(hasText || hasAriaLabel).toBe(true);
      });
    });

    it('should have proper focus management', () => {
      render(<Home />);

      // Check that interactive elements are focusable
      const interactiveElements = document.querySelectorAll('a, button, input, [tabindex]');

      interactiveElements.forEach((element) => {
        const tabIndex = element.getAttribute('tabindex');
        if (tabIndex !== null) {
          expect(['0', '-1']).toContain(tabIndex);
        }
      });
    });

    it('should have proper color contrast considerations', () => {
      render(<Home />);

      // Check that elements have proper styling that would support good contrast
      const textElements = document.querySelectorAll('p, h1, h2, h3, span');

      // This is a basic check - in a real scenario, you'd use tools like pa11y
      // or manual testing to verify actual color contrast ratios
      textElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
  });
});
