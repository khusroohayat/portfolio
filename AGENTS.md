# AGENTS.md

## Project Overview

This is a professional portfolio website for Khusroo Hayat, built with Next.js (App Router) and React. It showcases projects, skills, and includes an AI-powered, resume-aware chatbot. The project is optimized for clarity, maintainability, accessibility, and performance.

- **Frameworks:** Next.js 14.x, React 18
- **Languages:** JavaScript (TypeScript optional)
- **Styling:** CSS Modules
- **API/AI:** Serverless API route (Google Gemini integration)
- **Deployment:** Vercel or Netlify

## Setup Commands

- Install dependencies:
  ```powershell
  npm install
  ```
- Start development server:
  ```powershell
  npm run dev
  ```
- Build for production:
  ```powershell
  npm run build
  npm start
  ```
- Environment variables:
  - Create `.env.local` and set:
    - `GOOGLE_GEMINI_API_KEY` (required for chatbot API route)

## Development Workflow

- Hot reload is enabled by default with Next.js dev server.
- Edit pages/components in `app/` and data in `data/projects.json`.
- Static assets go in `public/imgs/`.
- Use feature branches and PRs for all changes.
- Use the following scripts (from `package.json`):
  - Lint: `npm run lint`
  - Format: `npm run format`
  - Test: `npm run test`
  - Accessibility: `npm run a11y`
  - Lighthouse audit: `npm run audit:lighthouse`
  - Full CI: `npm run ci`

## Testing Instructions

- Run all tests:
  ```powershell
  npm run test
  ```
- Run accessibility tests:
  ```powershell
  npm run a11y
  ```
- Run Lighthouse audit:
  ```powershell
  npm run audit:lighthouse
  ```
- Test files are in `app/__tests__/` and `utils/__tests__/`.
- Use Jest and React Testing Library for unit/integration tests.
- Use `jest-axe` for accessibility checks.
- Coverage is generated with `npm run test:ci`.

## Code Style Guidelines

- Use functional React components and hooks.
- PascalCase for component files; event handlers prefixed with `handle`.
- CSS Modules for styling (no Tailwind, Shadcn, or Radix).
- Keep all project data in `data/projects.json`.
- Linting: ESLint (`npm run lint`)
- Formatting: Prettier (`npm run format`)
- File organization: colocate components with their routes in `app/`.
- Accessibility: add ARIA attributes and keyboard handlers to interactive elements.

## Build and Deployment

- Build for production:
  ```powershell
  npm run build
  npm start
  ```
- Output: `.next/` directory
- Deploy to Vercel or Netlify; set environment variables in the platform dashboard.
- `netlify.toml` and `next.config.mjs` are present for configuration.
- Do not commit secrets; use environment variables for API keys.

## Security Considerations

- Never commit API keys or secrets to the repository.
- All secrets (e.g., `GOOGLE_GEMINI_API_KEY`) must be set via environment variables.
- The chatbot API route includes input validation, rate limiting, and XSS sanitization.
- Review `app/api/route.js` for security logic.

## Pull Request Guidelines

- Title format: `[component] Brief description`
- Required checks: `npm run lint`, `npm run test`, `npm run a11y`
- All PRs should target the main branch and pass CI before merging.
- Include screenshots or context for UI changes.
- Follow code style and data conventions.

## Debugging and Troubleshooting

- If the dev server fails to start, check for missing dependencies or invalid `.env.local`.
- For chatbot issues, verify the API key and inspect logs for rate limit or validation errors.
- Use `npm run lint` and `npm run format` to fix code style issues.
- For test failures, run tests in watch mode: `npm test -- --watch`.
- For accessibility or Lighthouse issues, run the respective scripts and review the output.

## Additional Notes

- For full requirements and roadmap, see `PRD.md` and `project-plan.md`.
- For component and data conventions, see `.github/copilot-instructions.md`.
- No license file is present; add one if open-sourcing.

---

This AGENTS.md is designed to provide all technical context and actionable commands for coding agents to work effectively on this project. Update as workflows or dependencies change.
