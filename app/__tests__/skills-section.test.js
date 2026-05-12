import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SkillsSection from '../SkillsSection';

describe('SkillsSection', () => {
  it('renders heading and category tabs', () => {
    render(<SkillsSection />);

    expect(screen.getByRole('heading', { name: /Skills/i })).toBeInTheDocument();
    expect(screen.getByRole('tablist', { name: /Skills categories/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Frontend Engineering/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Backend & Cloud/i })).toBeInTheDocument();
  });

  it('switches active panel when a tab is selected', () => {
    render(<SkillsSection />);

    const backendTab = screen.getByRole('tab', { name: /Backend & Cloud/i });
    fireEvent.click(backendTab);

    expect(backendTab).toHaveAttribute('aria-selected', 'true');

    // Find the visible tabpanel for Backend & Cloud
    const tabpanels = screen.getAllByRole('tabpanel', { hidden: true });
    const visiblePanel = tabpanels.find(
      (panel) =>
        !panel.hasAttribute('hidden') && panel.getAttribute('aria-labelledby') === backendTab.id
    );
    expect(visiblePanel).toBeTruthy();
    // Use within to scope queries to the visible panel
    const { getByRole, getByText } = require('@testing-library/react').within(visiblePanel);
    expect(getByRole('heading', { name: /Backend & Cloud/i })).toBeInTheDocument();
    expect(getByText(/Designing scalable APIs/i)).toBeInTheDocument();
  });

  it('supports keyboard navigation for category tabs', () => {
    render(<SkillsSection />);

    const frontendTab = screen.getByRole('tab', { name: /Frontend Engineering/i });
    frontendTab.focus();

    fireEvent.keyDown(frontendTab, { key: 'ArrowRight' });

    const backendTab = screen.getByRole('tab', { name: /Backend & Cloud/i });
    expect(backendTab).toHaveFocus();
    expect(backendTab).toHaveAttribute('aria-selected', 'true');
  });
});
