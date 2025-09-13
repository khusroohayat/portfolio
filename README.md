This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Code Quality: Linting & Formatting

This project uses **ESLint** and **Prettier** to enforce code quality and consistent formatting.

### Linting

- Run `npm run lint` to check for linting errors using Next.js and ESLint.
- Run `npm run lint:eslint` for direct ESLint checks.
- Run `npm run lint:eslint:fix` to automatically fix lint errors where possible.
- ESLint covers `.js`, `.jsx`, `.ts`, `.tsx` files and integrates with Prettier for formatting rules.

### Formatting

- Run `npm run format` to format code using Prettier.
- Prettier covers `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.md`, and `.json` files.
- Configuration is in `.prettierrc` and `.eslintrc.js`.

### Customization

- You can adjust rules in `.eslintrc.js` and formatting options in `.prettierrc`.
- For more details, see [ESLint documentation](https://eslint.org/) and [Prettier documentation](https://prettier.io/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
