import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '../layout';

function renderWithChildren(children = <div>Test Content</div>) {
  return render(<RootLayout>{children}</RootLayout>);
}

describe('RootLayout', () => {
  it('renders the global header and nav', () => {
    renderWithChildren();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithChildren();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/#skills');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Contact Me' })).toHaveAttribute('href', 'mailto:khusroo.hayat@gmail.com');
  });

  it('renders children content', () => {
    renderWithChildren(<div>Test Content</div>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders the logo', () => {
    renderWithChildren();
    expect(screen.getByText('K')).toBeInTheDocument();
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument();
  });

  it('renders the contact button', () => {
    renderWithChildren();
    expect(screen.getByRole('link', { name: 'Contact Me' })).toBeInTheDocument();
  });
});
