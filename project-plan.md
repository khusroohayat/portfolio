<!-- Project Plan — PRD-aligned: full rewrite -->

# Project Plan — Khusroo Hayat Portfolio (PRD-aligned)

Version: 1.0
Date: August 17, 2025

This project plan maps directly to the Product Requirements Document (`PRD.md`). It translates the PRD into an actionable, timeboxed plan with milestones, deliverables, success criteria, verification steps, and a current progress checklist based on the repository.

## Goals (from PRD)

- Create a professional, modern, responsive portfolio that showcases Khusroo's skills, projects, and experience.
- Demonstrate expertise in React/Next.js and modern web practices.
- Generate professional leads via contact & chatbot flows.
- Achieve high performance, accessibility, and SEO metrics.

## Scope (v1.0)

Included

- Home page (Hero, Featured Projects, Skills summary, About blurb)
- Projects gallery and external/demo links
- Dedicated project detail pages (dynamic) — planned for v1.0
- About / Experience / Skills sections
- Contact options: mailto link, contact form (front-end), and AI Chatbot (client + serverless backend)
- Resume PDF download
- SEO metadata, sitemap, and basic verification

Out of scope (v1.0)

- Full CMS or blog
- Multi-language support
- Large-scale backend (only serverless endpoints where needed)
- Complex WebGL experiences

---

## Timeline & Milestones (7 weeks)

Week 1 — Planning & Setup

- Finalize PRD (done)
- Project plan (done)
- Dev environment, repo hygiene, and branch strategy
- Choose libraries (analytics, monitoring, a11y)

Week 2 — Core UI

- Implement responsive layout and global styles
- Navigation, Hero, and Footer
- Projects grid (static data)

Week 3 — Content & Components

- Skills, About, Work Experience sections
- Services section and contact CTA
- Placeholders for project detail pages and project manifest

Week 4 — Interactivity

- Chatbot client + serverless route (secure + limited)
- Project detail pages (dynamic routes using projects manifest)
- Project filtering UI (by tech/category)

Week 5 — QA & Optimization

- Lighthouse audit and performance fixes
- Accessibility (a11y) audit and fixes
- Image optimization, lazy loading, and critical CSS tuning

Week 6 — CI/CD & Tests

- Add linting, basic unit tests, and accessibility checks to CI
- Configure deployments (Netlify/Vercel) and environment variables

Week 7 — Finalize & Launch

- Final content polish and proofreading
- Run final performance & SEO checks
- Deploy to production and verify monitoring/analytics

---

## Deliverables

1. Production-ready portfolio site hosted on Netlify/Vercel.
2. Dynamic project pages sourced from a `data/projects.json` (or MDX) manifest.
3. Chatbot with a secure serverless API route and CV-aware responses.
4. CI pipeline with linting, tests, and accessibility checks.
5. Documentation: README, deployment notes, and content editing guide.
6. Performance & accessibility report (Lighthouse key scores and remediation list).

---

## Technical Approach

Stack

- Next.js (app router)
- React
- CSS Modules or Tailwind (choose one; repository currently uses global CSS)
- Serverless functions via Next.js API routes (or Netlify/Vercel functions)
- Optional: TypeScript conversion (recommended but optional for v1)

Data & Content

- Use a single `data/projects.json` manifest for all projects (title, description, tech tags, images, demoUrl, repoUrl, slug).
- Dynamic project pages created with file-based routing (Next.js dynamic routes) reading the manifest.

Chatbot

- Client UI implemented; serverless endpoint should call Azure/OpenAI (keys in env variables).
- Implement input validation, request rate-limiting, and response sanitization.

SEO & Performance

- Add meta tags per page, sitemap, and robots file.
- Optimize images (responsive srcsets, WebP where possible).
- Lazy-load offscreen images and use `next/image` where practical.

Testing & CI

- Add ESLint + Prettier
- Add simple Jest tests for utilities / data parsing
- Add axe-core or pa11y for automated accessibility checks in CI

Monitoring & Analytics

- Minimal analytics (Plausible or GA4) and error tracking (Sentry) configured for production only.

Security

- Do not commit secrets. Use `.env.local` and CI secrets. Ensure serverless endpoints validate inputs and throttle requests.

---

## Success Criteria (aligned to PRD KPIs)

- Lead Generation: measurable increase in contact messages (track via form submissions or email link clicks).
- Performance: Lighthouse score >= 90 (desktop & mobile target).
- Accessibility: WCAG 2.1 AA compliance for core pages.
- SEO: site indexable, with correct meta tags and sitemap; rank for name search.
- Launch: site deployed and reachable via chosen domain.

---

## Progress Checklist (current repo snapshot)

Source inspected: `PRD.md`, `package.json`, `app/page.js`, `app/layout.js`, `public/` assets.

Done (already in repo)

- Next.js app scaffold using the `app` router.
- `app/page.js` implements Hero, Skills, Projects grid, Work Experience, ServicesSection, and Chatbot UI.
- `app/layout.js` contains SEO metadata, google verification, and fonts.
- Resume PDF exists in `public/` and download links are wired.
- Images are present in `public/imgs/` and referenced in pages.
- `package.json` contains Next.js and `@azure/openai` dependency and basic scripts.
- Netlify and Next config files exist (`netlify.toml`, `next.config.mjs`).

Needs verification / immediate tasks

- Confirm `app/api/route.js` exists and securely handles chatbot requests (server-side code not inspected yet).
- Create `data/projects.json` and implement dynamic project detail pages and filtering.
- Add `next/image` usage or responsive image optimization.
- Add CI (lint/tests/a11y) and deployment checks.

Planned / backlog

- Run Lighthouse and a11y audits; fix top issues.
- Add analytics and monitoring.
- Harden chatbot serverless route (rate limiting, secret management).
- Add project manifest and dynamic pages.

---

## Risks & Mitigations

1. API keys exposure — store keys in CI environment and use server-side routes to proxy calls.
2. Performance regressions from large images — implement image optimization and lazy loading.
3. Accessibility gaps — run automated checks early and fix critical issues during Week 5.

---

## Acceptance & Verification Plan

- QA checklist per page (Content, Links, Images, SEO tags, Accessibility, Performance).
- Run Lighthouse and produce a remediation list; fix top 5 before launch.
- Manual accessibility spot-checks and automated a11y CI.
- Smoke test the contact/chat flows and verify messages are delivered or proxied correctly.

---

## Next concrete actions I can take now (pick one)

1. Verify or implement the chatbot server route (`app/api/route.js`) and test a secure end-to-end chat flow.
2. Create `data/projects.json` and implement dynamic project pages + client-side filtering.
3. Run a Lighthouse/a11y audit locally and produce the top-5 remediation list.
4. Add CI workflow (GitHub Actions) to run lint and basic accessibility checks on PRs.

Tell me which to start and I will implement it and report progress.
