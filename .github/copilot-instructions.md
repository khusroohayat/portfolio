## Copilot AI Agent Instructions for Khusroo Hayat Portfolio

This repo is a Next.js (App Router) portfolio for Khusroo Hayat, focused on modern, professional presentation, project showcases, and AI-powered features. The codebase is optimized for clarity, maintainability, and extensibility.

### Architecture & Data Flow

- **App Directory Structure**: Uses Next.js App Router (`/app`). Pages are colocated with their routes (e.g., `/app/page.js`, `/app/projects/page.js`, `/app/projects/[slug]/page.js`).
- **Project Data**: Project manifests are in `/data/projects.json` (for gallery/detail pages). Some legacy project data may exist inline in `app/page.js` but new work should use the JSON manifest.
- **Dynamic Routing**: Project detail pages use `[slug]` dynamic routes and `generateStaticParams` for SSG.
- **API Integration**: `/app/api/route.js` implements a serverless function for the AI Chatbot, using Google Gemini API. System instructions are prepended to user messages for strict resume-based answers.
- **Component Patterns**: Components are colocated in `/app` (e.g., `ServicesSection.js`). Use functional components and React hooks.

### Developer Workflows

- **Dev Server**: Start with `npm run dev`.
- **Build**: `npm run build` (Next.js).
- **Deploy**: Vercel/Netlify supported. Environment variables (e.g., `GOOGLE_GEMINI_API_KEY`) required for API routes.
- **Testing**: No formal test suite yet; manual QA and Lighthouse/a11y audits are expected (see `project-plan.md`).
- **Static Assets**: Place images in `/public/imgs/`. Use `next/image` for optimized images.

### Project-Specific Conventions

- **Styling**: Uses plain CSS modules (e.g., `page.module.css`). Do NOT use Tailwind, Shadcn, or Radix. Class names like `bento`, `bento-grid`, etc. are used for layout.
- **Accessibility**: Add ARIA attributes and keyboard handlers for interactive elements (see `ProjectFilters` and project cards).
- **Component Naming**: Use PascalCase for components. Event handlers use `handle` prefix (e.g., `handleClick`).
- **Data Loading**: For project pages, import from `/data/projects.json` and filter by slug. Do not hardcode project data in components.
- **Chatbot**: The AI Chatbot is strictly resume-based. All answers must be derived from the embedded resume in `/app/api/route.js`.

### Key Files & Directories

- `/app/page.js`: Home page, hero, skills, projects section (uses filterable grid).
- `/app/projects/page.js`: Projects gallery, links to detail pages.
- `/app/projects/[slug]/page.js`: Dynamic project detail page.
- `/app/api/route.js`: Serverless API for AI Chatbot.
- `/data/projects.json`: Source of truth for project data.
- `/public/imgs/`: All images and assets.
- `/project-plan.md`, `/PRD.md`: Product requirements and planning.

### Examples

- **Project Gallery**: See `/app/projects/page.js` for mapping over project data and linking to detail pages.
- **Dynamic Detail Page**: See `/app/projects/[slug]/page.js` for slug-based routing and data lookup.
- **Chatbot API**: See `/app/api/route.js` for system prompt handling and Gemini API integration.

### Patterns to Follow

- Use functional React components and hooks.
- Prefer data-driven rendering (map/filter over arrays).
- Keep all project data in `/data/projects.json`.
- Use CSS modules for styling; do not introduce Tailwind or utility CSS frameworks.
- Ensure all interactive elements are accessible.

---

If any conventions or workflows are unclear, check `/project-plan.md` or ask for clarification.
