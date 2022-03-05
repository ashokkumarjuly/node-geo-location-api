/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

// const childFolder = 'nft-resource/';
const childFolder = '';

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: `/integration/${childFolder}`,
    testSequencer: './bin/jest/test.sequencer.js',
    // modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/dist-prod/', '<rootDir>/migrations/'],
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    verbose: true,
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
    setupFilesAfterEnv: ['./bin/jest/jest.setup.integration.js'],
    globalSetup: './bin/jest/global.setup.integration.ts',
    globalTeardown: './bin/jest/global.teardown.integration.ts'
};
