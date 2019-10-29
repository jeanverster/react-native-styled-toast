const expoPreset = require('jest-expo/jest-preset')

module.exports = Object.assign(expoPreset, jestPreset, {
  setupFiles: [...expoPreset.setupFiles, './setup-tests.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)'
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  coverageThreshold: {
    global: {
      lines: 75
    }
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/utils/styled-components.ts',
    '!src/utils/suppress-rc-warnings.js',
    '!src/utils/mock-schema.ts',
    '!src/generated/graphql.tsx',
    '!src/aws-exports.js',
    '!src/navigation/**/*'
  ]
})
