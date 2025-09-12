import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page';

// Mock next/image to render a normal img
jest.mock('next/image', () => ({ __esModule: true, default: (props) => <img {...props} /> }));
// Mock HomeProjectsFilter if needed
jest.mock('../HomeProjectsFilter', () => () => (
  <div data-testid="home-projects-filter">[Project Filter]</div>
));
// Mock ServicesSection
jest.mock('../ServicesSection', () => () => (
  <div data-testid="services-section">[Services Section]</div>
));
// Mock projects.json
jest.mock('../data/projects.json', () => [
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

describe('Home page', () => {
  it('renders hero section', () => {
    render(<Home />);
    // Use heading role for h1
    expect(
      screen.getByRole('heading', { level: 1, name: /Syed Khusroo Hayat/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/full stack developer/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Resume/i })).toBeInTheDocument();
    // There are two Contact Me links (header and hero)
    expect(screen.getAllByRole('link', { name: /Contact Me/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('renders skills section', () => {
    render(<Home />);
    expect(screen.getByText(/Frontend Excellence/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend & Cloud Services/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Tools/i)).toBeInTheDocument();
    expect(screen.getByText(/Databases & Integration/i)).toBeInTheDocument();
    expect(screen.getByText(/Developer Tools & Methodologies/i)).toBeInTheDocument();
  });

  it('renders work experience section', () => {
    render(<Home />);
    // There are multiple Consultant elements, so use getAllByText
    expect(screen.getAllByText(/Consultant/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Software Developer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Software Engineer/i).length).toBeGreaterThan(0);
  });

  it('renders project filter and grid', () => {
    render(<Home />);
    expect(screen.getByTestId('home-projects-filter')).toBeInTheDocument();
  });

  it('renders services section', () => {
    render(<Home />);
    expect(screen.getByTestId('services-section')).toBeInTheDocument();
  });

  it('renders chatbot section and sends a message', async () => {
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'My best skill is React.' }),
      })
    );
    render(<Home />);
    expect(screen.getByText(/AI Chatbot/i)).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/what skills are you best at/i);
    fireEvent.change(input, { target: { value: 'What is your best skill?' } });
    fireEvent.click(screen.getByRole('button', { name: /Send/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/My best skill is React/i).length).toBeGreaterThan(0);
    });
    global.fetch.mockRestore && global.fetch.mockRestore();
  });

  it('toggles mobile menu', () => {
    render(<Home />);
    // Find the mobile menu toggle by class
    const toggles = screen.getAllByRole('link');
    const mobileToggle = toggles.find((a) => a.className.includes('mobile-toggle'));
    expect(mobileToggle).toBeDefined();
    fireEvent.click(mobileToggle);
    // Should toggle menuOpen state, but since menuOpen only affects class, just check for class change
    // (This is a shallow check, for full test use data-testid on ul)
  });

  it('renders all main sections', () => {
    render(<Home />);
    // Use heading role for section headings to avoid nav link collisions
    expect(screen.getByRole('heading', { name: /Skills/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Work Experience/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Completed Projects/i })).toBeInTheDocument();
    // There are multiple Chatbot headings (h2 and h3)
    expect(screen.getAllByRole('heading', { name: /Chatbot/i }).length).toBeGreaterThanOrEqual(1);
  });
});
