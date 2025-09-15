module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2024: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Project-specific overrides
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.{js,jsx,ts,tsx}', 'app/**/__tests__/**'],
      env: {
        jest: true,
      },
      rules: {
        // tests can be less strict about display name and react/no-unescaped-entities
        'react/display-name': 'off',
      },
    },
    {
      files: ['app/api/**', 'api/**'],
      env: {
        node: true,
      },
      rules: {
        // allow unused request/response params in API route handlers
        'no-unused-vars': ['warn', { args: 'none' }],
      },
    },
  ],
};
