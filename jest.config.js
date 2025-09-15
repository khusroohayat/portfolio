module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/$1',
    '^\\.\\./data/projects.json$': '<rootDir>/data/projects.json',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './',
        outputName: 'junit.xml',
        suiteName: 'Portfolio Tests',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true,
      },
    ],
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/**/__tests__/**',
    '!app/**/node_modules/**',
  ],
  coverageReporters: ['text', 'lcov', 'html', 'clover'],
};
