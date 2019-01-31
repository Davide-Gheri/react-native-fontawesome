
module.exports = {
  preset: 'react-native',
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  transform: {
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
    '\\.(ts|tsx)$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/node_modules/'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],
  testEnvironment: 'node',
  cacheDirectory: '.jest/cache',
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json'
    }
  }
};
