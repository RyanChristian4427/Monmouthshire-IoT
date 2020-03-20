const base = require('./jest.base.config');

module.exports = {
    ...base,
    projects: ['<rootDir>/packages/**/jest.config.js'],
    coverageDirectory: '<rootDir>/coverage/',
};
