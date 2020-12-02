module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  testEnvironment: 'jsdom',
  rootDir: __dirname,
  // testMatch: ['<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)'],
  testMatch: ['<rootDir>/packages/utils/**/__tests__/**/*spec.[jt]s?(x)'],
}
