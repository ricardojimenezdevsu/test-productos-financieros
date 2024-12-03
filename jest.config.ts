module.exports = {
  displayName: 'bp',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  cacheDirectory: '<rootDir>/jest/cache',
  globals: {},
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/jest/report',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  preset: 'jest-preset-angular',
  transform: {
    '^.+\\.(ts|js|mjs|html)$': [
      'jest-preset-angular',
      {
        tsConfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  testRunner: 'jest-circus/runner',
};
