/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    // modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/dist-prod/', '<rootDir>/migrations/'],
    verbose: true,
    testPathIgnorePatterns: ['<rootDir>/tests/integration/'],
    watchPathIgnorePatterns: ['.*jest-stare.*\\.js'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    // coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageReporters: ['html', 'text', 'lcov'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/tests/',
        '<rootDir>/templates/',
        '<rootDir>/dist/',
        '<rootDir>/dist-prod/',
        '<rootDir>/migrations/'
    ],
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
    setupFilesAfterEnv: ['./bin/jest/jest.setup.js']
};
