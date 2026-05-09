---
goal: Add dedicated About Me page with professional biography and timeline
version: 1.0
date_created: 2026-05-09
last_updated: 2026-05-09
owner: Khusroo Hayat
status: 'Planned'
tags: [feature, about, biography, timeline, nextjs, portfolio]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This plan describes the implementation of a dedicated About Me page for the portfolio, including a detailed professional biography and a chronological timeline of work experience and education. The goal is to provide visitors with a comprehensive overview of the professional background and career progression.

## 1. Requirements & Constraints

- **REQ-001**: Implement a new About page at `/about` route using Next.js App Router.
- **REQ-002**: Include a detailed professional biography section.
- **REQ-003**: Add a visually clear, accessible timeline of work experience and education.
- **REQ-004**: Use functional React components and CSS Modules for styling.
- **REQ-005**: Ensure accessibility (ARIA, keyboard navigation, color contrast).
- **CON-001**: Do not use Tailwind, Shadcn, or Radix; use only CSS Modules.
- **CON-002**: All static assets (images, icons) must be placed in `/public/imgs/`.
- **GUD-001**: Follow component and data conventions as per `.github/copilot-instructions.md`.
- **PAT-001**: Timeline should be data-driven (map over array of events).

## 2. Implementation Steps

### Implementation Phase 1

- GOAL-001: Scaffold About page and core components

| Task     | Description                                                    | Completed | Date |
| -------- | -------------------------------------------------------------- | --------- | ---- |
| TASK-001 | Create `/app/about/page.js` for the About page route           |           |      |
| TASK-002 | Create `AboutBiography.js` component for biography section     |           |      |
| TASK-003 | Create `AboutTimeline.js` component for timeline               |           |      |
| TASK-004 | Add `/app/about/page.module.css` for About page styles         |           |      |
| TASK-005 | Add `/app/about/about-timeline.module.css` for timeline styles |           |      |
| TASK-006 | Add `/data/about-timeline.json` for timeline data              |           |      |

### Implementation Phase 2

- GOAL-002: Populate content, ensure accessibility, and integrate

| Task     | Description                                                         | Completed | Date |
| -------- | ------------------------------------------------------------------- | --------- | ---- |
| TASK-007 | Populate biography content in `AboutBiography.js`                   |           |      |
| TASK-008 | Populate timeline data in `/data/about-timeline.json`               |           |      |
| TASK-009 | Render timeline dynamically in `AboutTimeline.js`                   |           |      |
| TASK-010 | Add ARIA attributes and keyboard navigation to timeline             |           |      |
| TASK-011 | Add images/assets to `/public/imgs/` as needed                      |           |      |
| TASK-012 | Add link to About page in site navigation (e.g., `Header.js`)       |           |      |
| TASK-013 | Write accessibility and rendering tests for About page and timeline |           |      |

## 3. Alternatives

- **ALT-001**: Hardcode timeline in JSX (not chosen; less maintainable than data-driven approach).
- **ALT-002**: Use third-party timeline libraries (not chosen; violates styling constraints and increases bundle size).

## 4. Dependencies

- **DEP-001**: Next.js App Router
- **DEP-002**: React 18
- **DEP-003**: CSS Modules

## 5. Files

- **FILE-001**: `/app/about/page.js` — About page route
- **FILE-002**: `/app/about/AboutBiography.js` — Biography component
- **FILE-003**: `/app/about/AboutTimeline.js` — Timeline component
- **FILE-004**: `/app/about/page.module.css` — About page styles
- **FILE-005**: `/app/about/about-timeline.module.css` — Timeline styles
- **FILE-006**: `/data/about-timeline.json` — Timeline data
- **FILE-007**: `/public/imgs/` — Images/assets for About page
- **FILE-008**: `/app/Header.js` — Add About link to navigation

## 6. Testing

- **TEST-001**: Render test for `/about` page (page loads, correct content visible)
- **TEST-002**: Accessibility test for About page and timeline (keyboard, ARIA, contrast)
- **TEST-003**: Timeline renders all events from `/data/about-timeline.json`
- **TEST-004**: Navigation link to About page is present and functional

## 7. Risks & Assumptions

- **RISK-001**: Timeline data may become outdated if not maintained
- **RISK-002**: Accessibility issues if ARIA/keyboard not properly implemented
- **ASSUMPTION-001**: All biography and timeline content will be provided or available

## 8. Related Specifications / Further Reading

- [copilot-instructions.md](../.github/copilot-instructions.md)
- [project-plan.md](../project-plan.md)
- [Next.js App Router Docs](https://nextjs.org/docs/app/building-your-application/routing)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
