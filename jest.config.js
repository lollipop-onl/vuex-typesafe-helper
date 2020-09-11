module.exports = {
  moduleFileExtensions: ['ts'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
    },
  },
  testMatch: [
    '**/*\\.spec\\.ts',
  ],
};
