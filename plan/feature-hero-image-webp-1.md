---
goal: Resize and compress hero image to WebP for performance
version: 1.0
date_created: 2026-05-13
last_updated: 2026-05-13
owner: khusroohayat
status: 'Completed'
tags: [feature, optimization, image, performance]
---

# Introduction

![Status: Completed](https://img.shields.io/badge/status-Completed-green)

This plan details the steps to resize and compress `khusroo-hero-image.png` to a maximum width of 1000px, convert it to WebP format, and update all code references to use the optimized image for improved performance and modern standards.

## 1. Requirements & Constraints

- **REQ-001**: The hero image must be resized to a maximum width of 1000px.
- **REQ-002**: The image must be converted to WebP format with lossless or medium compression.
- **REQ-003**: All code references to `khusroo-hero-image.png` must be updated to use the new `.webp` file.
- **REQ-004**: Use `next/image` for all hero image rendering where possible.
- **SEC-001**: Ensure no sensitive data is exposed in image metadata.
- **CON-001**: The original `.png` may be retained for fallback/legacy unless otherwise decided.
- **GUD-001**: Alt text and accessibility attributes must remain correct after update.
- **PAT-001**: Follow Next.js and project conventions for static assets and imports.

## 2. Implementation Steps

### Implementation Phase 1

- GOAL-001: Prepare and export optimized hero image

| Task     | Description                                                        | Completed | Date |
| -------- | ------------------------------------------------------------------ | --------- | ---- |
| TASK-001 | Locate `khusroo-hero-image.png` in `public/imgs/`                  |           |      |
| TASK-002 | Resize image to max width 1000px using an image editor or CLI tool |           |      |
| TASK-003 | Export as `khusroo-hero-image.webp` with medium compression        |           |      |
| TASK-004 | Add `khusroo-hero-image.webp` to `public/imgs/`                    |           |      |

### Implementation Phase 2

- GOAL-002: Update codebase to use optimized image

| Task     | Description                                                  | Completed | Date |
| -------- | ------------------------------------------------------------ | --------- | ---- |
| TASK-005 | Search all code for references to `khusroo-hero-image.png`   |           |      |
| TASK-006 | Update imports/paths to use `.webp` version in all files     |           |      |
| TASK-007 | Ensure `next/image` is used for hero image rendering         |           |      |
| TASK-008 | Verify alt text and accessibility attributes remain correct  |           |      |
| TASK-009 | (Optional) Remove original `.png` if not needed for fallback |           |      |

## 3. Alternatives

- **ALT-001**: Use JPEG or AVIF instead of WebP (not chosen due to WebP's broad support and balance of quality/size).
- **ALT-002**: Keep both PNG and WebP and use `<picture>` for fallback (not chosen for simplicity unless legacy browser support is required).

## 4. Dependencies

- **DEP-001**: Image processing tool (e.g., Photoshop, GIMP, Squoosh CLI, Sharp, or similar)
- **DEP-002**: Next.js built-in `next/image` component

## 5. Files

- **FILE-001**: `public/imgs/khusroo-hero-image.png` (source image)
- **FILE-002**: `public/imgs/khusroo-hero-image.webp` (optimized image)
- **FILE-003**: All files referencing the hero image (e.g., `app/page.js`, components)

## 6. Testing

- **TEST-001**: Verify the `.webp` image loads correctly on all devices and browsers supported by the project
- **TEST-002**: Confirm image is rendered using `next/image` and is responsive
- **TEST-003**: Check that alt text and ARIA attributes are present and correct
- **TEST-004**: Run Lighthouse audit to confirm improved image performance

## 7. Risks & Assumptions

- **RISK-001**: Some legacy browsers may not support WebP (assume project does not require IE11 support)
- **ASSUMPTION-001**: Medium compression is acceptable for visual quality and performance
- **ASSUMPTION-002**: The original PNG can be retained unless storage or bandwidth is a concern

## 8. Related Specifications / Further Reading

- [Next.js Image Optimization Docs](https://nextjs.org/docs/pages/api-reference/components/image)
- [WebP Format Overview](https://developers.google.com/speed/webp)
- [Lighthouse Performance Audits](https://web.dev/performance-scoring/)
