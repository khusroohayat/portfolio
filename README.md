# Khusroo Hayat — Personal Portfolio

> A professional portfolio website built with Next.js (App Router) to showcase Khusroo Hayat's projects, skills, and contact options — including an AI-powered resume-aware chatbot.

---

## Technology stack

- Next.js (App Router) — v14.x (project uses Next 14.2.5)
- React 18
- JavaScript / TypeScript (project primarily JS; TypeScript optional)
- CSS Modules for styling
- Serverless API routes (Next.js) for the AI Chatbot
- AI integration: Google Gemini (via serverless proxy) and Azure/OpenAI packages referenced in package.json
- Deployment targets: Vercel or Netlify

See `package.json` for exact dependency versions and scripts.

## Project architecture (high level)

- File-based Next.js App Router with colocated pages/components under `/app`.
- Project data manifest in `/data/projects.json` used for the projects gallery and dynamic project pages at `/projects/[slug]`.
- Serverless route at `app/api/route.js` implements a secure proxy to a generative AI model (Google Gemini) that serves a resume-aware chatbot.
- Static assets live under `/public/imgs` and optimized via `next/image` where used.

Key files

- `/app/page.js` — Home page (hero, skills, featured projects)
- `/app/projects/page.js` — Projects gallery
- `/app/projects/[slug]/page.js` — Project detail pages (dynamic)
- `/app/api/route.js` — Chatbot serverless endpoint (resume-aware)
- `/data/projects.json` — Project manifest (source of truth)


## Continuous Integration & Deployment (Netlify)

This project uses Netlify for automated CI/CD. Every push to the `main` branch triggers the following pipeline:

- **Linting:** Runs ESLint checks (`npm run lint`)
- **Formatting:** Checks code formatting with Prettier (`npm run format:check`)
- **Testing:** Runs all Jest unit/integration tests (`npm run test:ci`)
- **Accessibility:** Runs accessibility tests (`npm run a11y:ci`)
- **Build:** Builds the Next.js app (`npm run build`)
- **Lighthouse Audit:** Runs a Lighthouse audit (`npm run audit:lighthouse`)
- **Deployment:** Publishes the site to Netlify if all checks pass

### Netlify Setup

1. **Connect your repository to Netlify** and select the `main` branch for production deploys.
2. **Set environment variables** in the Netlify dashboard:
  - `GOOGLE_GEMINI_API_KEY` (required for the AI Chatbot API route)
3. **Build settings:** Netlify uses the `netlify.toml` file for build configuration and plugins. No further changes are needed unless customizing the build.

**Note:** Do not commit secrets. Use the Netlify UI to manage environment variables securely.

#### Optional: GitHub Actions
For additional pre-deploy checks on pull requests, consider adding a GitHub Actions workflow to run `npm run ci`.

---

## Getting started

Prerequisites

- Node.js (recommended LTS)
- npm (or yarn)

Install dependencies

```powershell
npm install
```

Run development server

```powershell
npm run dev
```

Build for production

```powershell
npm run build
npm start
```

Environment variables

The chatbot API route requires a Google Gemini API key and should be provided via environment variables in the hosting environment or `.env.local` during local development:

- `GOOGLE_GEMINI_API_KEY` — API key for Google Generative Language

Do not commit secrets. Use Vercel/Netlify environment settings for production.

## Project structure

Top-level important folders and files:

- `app/` — Next.js App Router pages and components
- `data/projects.json` — Project manifest used by gallery and details
- `public/imgs/` — Static images and assets
- `app/api/route.js` — Serverless API (chatbot)
- `package.json` — Scripts and dependencies

For more detail on component locations and conventions, see `.github/copilot-instructions.md`.

## Key features

- Responsive home page with hero, skills, and featured projects
- Project gallery with client-side filtering by technology (data-driven from `data/projects.json`)
- Dynamic project detail pages generated from the manifest
- Resume-aware AI Chatbot (serverless route) that answers strictly from the embedded resume text
- Accessibility and performance goals (Lighthouse, WCAG 2.1 AA targets)

## Development workflow

- Run `npm run dev` for local development.
- Scripts available in `package.json` include linting, formatting, tests, accessibility checks, Lighthouse audit, and a full `ci` script.
- Recommended workflow: feature branches, PRs with CI lint/tests, and deploy to Vercel/Netlify from `master` (or protected main branch).

CI & checks (scripts in package.json)

- `npm run lint` — ESLint
- `npm run format` — Prettier
- `npm run test` — Jest
- `npm run a11y` — accessibility test runner
- `npm run audit:lighthouse` — Lighthouse audit script

## Coding standards & conventions

- Use functional React components and hooks.
- PascalCase for component filenames. Event handlers prefixed with `handle` (e.g., `handleClick`).
- CSS Modules for styles (avoid Tailwind/Shadcn/Radix in this repo).
- Keep project data in `/data/projects.json` and avoid hardcoding project details in components.
- Accessibility: add ARIA attributes and keyboard handlers for interactive elements.

See `.github/copilot-instructions.md` for detailed conventions.

## Testing

- Unit and integration tests use Jest and React Testing Library. Example tests live under `app/__tests__` and `utils/__tests__`.
- Accessibility tests use `jest-axe` and a dedicated a11y script.
- Lighthouse audits can be run via `npm run audit:lighthouse` using `scripts/lighthouse-audit.js`.

## Contributing

1. Fork the repository and create a feature branch.
2. Run linters and tests locally (`npm run lint`, `npm run test`).
3. Open a pull request with a clear description and screenshots if applicable.

Follow examples under `.github/copilot-instructions.md` for component patterns and project data handling.

## License

No explicit license file detected in the repository. If you intend this to be open-source, add a `LICENSE` file (for example, MIT) to the project root.

## Notes & next steps

- The repo includes a `project-plan.md` and `PRD.md` with roadmap, milestones, and verification steps; review them for planned work and backlog items.
- Suggested low-risk improvements:
  - Add a `LICENSE` file.
  - Add CI workflow (GitHub Actions) if not present to run lint/tests/a11y on PRs.
  - Confirm `app/api/route.js` production readiness (keys, rate-limiting, error handling already implemented) and add monitoring.

---

## CDN & Image Optimization

For best performance and optimal Largest Contentful Paint (LCP) scores, it is recommended to:

- Deploy this site on a platform that provides a global Content Delivery Network (CDN), such as Vercel or Netlify.
- Ensure all images are served from the `/public/imgs/` directory and use Next.js `<Image>` for automatic optimization and lazy loading.
- For further improvements, consider compressing images before adding them to the repo (e.g., using TinyPNG or Squoosh).

---

**Note:** The codebase is already configured to use Next.js `<Image>` for all main images. No further code changes are needed for CDN setup; this is handled by your deployment platform.

---

If you'd like, I can open a PR with this README or make additional edits (add badges, more examples, or expand the contributing section).
