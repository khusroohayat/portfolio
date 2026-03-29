---
goal: Add prominent downloadable PDF resume link/button to all main pages
version: 1.0
date_created: 2026-03-29
last_updated: 2026-03-29
owner: khusroohayat
status: 'Completed'
tags: [feature, resume, accessibility, download, UI]
---

# Introduction

![Status: Completed](https://img.shields.io/badge/status-Completed-brightgreen)

This plan implements a prominent, accessible link or button for downloading the PDF resume on all main pages of the portfolio. The goal is to ensure visitors can easily access and download the most up-to-date resume for reference or applications, meeting visibility and accessibility standards.

## 1. Requirements & Constraints

- **REQ-001**: A prominent link or button to download the PDF resume must be present on all main pages (Home, Projects, Project Detail).
- **REQ-002**: The PDF resume must be up to date and stored in the public directory (e.g., /public/Khusroo-Hayat-CV.pdf).
- **REQ-003**: The download link/button must be accessible (keyboard, ARIA labels, visible focus state).
- **REQ-004**: The link/button must be visually prominent and styled consistently with the site’s design system.
- **CON-001**: No third-party UI libraries (Tailwind, Shadcn, Radix) may be used; use CSS modules only.
- **GUD-001**: Use semantic HTML and Next.js best practices for links and accessibility.
- **PAT-001**: Place static assets in /public/ and reference with root-relative paths.

## 2. Implementation Steps

### Implementation Phase 1

- GOAL-001: Add and verify the PDF resume file in the public directory

| Task     | Description                                                 | Completed | Date       |
| -------- | ----------------------------------------------------------- | --------- | ---------- |
| TASK-001 | Place the latest PDF resume as /public/Khusroo-Hayat-CV.pdf | ✅        | 2026-03-29 |
| TASK-002 | Remove outdated/duplicate resume files from /public/ if any | ✅        | 2026-03-29 |
| TASK-003 | Confirm file is accessible via direct URL                   | ✅        | 2026-03-29 |

### Implementation Phase 2

- GOAL-002: Add prominent, accessible download link/button to all main pages

| Task     | Description                                                          | Completed | Date       |
| -------- | -------------------------------------------------------------------- | --------- | ---------- |
| TASK-004 | Add a prominent download button to the hero section on Home page     | ✅        | 2026-03-29 |
| TASK-005 | Add a prominent download button to the chatbot section on Home page  | ✅        | 2026-03-29 |
| TASK-006 | Ensure the button uses the correct, up-to-date PDF file              | ✅        | 2026-03-29 |
| TASK-007 | Add the same download button to /projects and /projects/[slug] pages | ✅        | 2026-03-29 |
| TASK-008 | Add ARIA labels and keyboard accessibility to all download buttons   | ✅        | 2026-03-29 |
| TASK-009 | Unify button styling and ensure visual prominence and focus state    | ✅        | 2026-03-29 |

## 3. Alternatives

- **ALT-001**: Use a floating/fixed download button on all pages (rejected for design simplicity).
- **ALT-002**: Only provide the download in the chatbot section (rejected for insufficient visibility).

## 4. Dependencies

- **DEP-001**: Next.js App Router
- **DEP-002**: CSS Modules for styling

## 5. Files

- **FILE-001**: /public/Khusroo-Hayat-CV.pdf (PDF resume)
- **FILE-002**: /app/page.js (Home page)
- **FILE-003**: /app/projects/page.js (Projects gallery)
- **FILE-004**: /app/projects/[slug]/page.js (Project detail)
- **FILE-005**: /app/page.module.css (Styling for buttons)

## 6. Testing

- **TEST-001**: Manual QA: Download button is visible and accessible on all main pages
- **TEST-002**: Accessibility audit: Button is keyboard navigable, has ARIA label, and visible focus
- **TEST-003**: File download: Clicking button downloads the correct, up-to-date PDF
  | TEST-004 | Lighthouse/a11y audit: No accessibility or contrast issues (Lighthouse run 2026-03-29: All accessibility and contrast requirements passed; only minor non-blocking warnings) | ✅ | 2026-03-29 |

## 7. Risks & Assumptions

- **RISK-001**: Resume file may become outdated if not maintained
- **RISK-002**: Button/link may be missed if not styled prominently
- **ASSUMPTION-001**: All main pages use a consistent layout and can share button styling

## 8. Related Specifications / Further Reading

- [Next.js Static File Serving](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Portfolio Project Plan](../project-plan.md)
