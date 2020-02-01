module.exports = {
    coveragePathIgnorePatterns: ['<rootDir>/test/common/'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: ['ts', 'js'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1',
        '^@core/(.*)$': '<rootDir>/../core/$1/src',
    },
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
    },
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.test.(ts|js)'],
};
