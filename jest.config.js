module.exports = ({
    node = false,
    coverage = false
}) => {
    const config = {
        testResultsProcessor: '<rootDir>/node_modules/ts-jest/coverageprocessor.js',
        unmockedModulePathPatterns: [
            'node_modules/react/',
            'node_modules/enzyme/'
        ],
        collectCoverageFrom: [
            '**/*.{ts,tsx}',
            '!**/node_modules/**',
            '!**/*.d.ts'
        ],
        coverageDirectory: './coverage',
        coverageReporters: [
            'lcov',
            'html'
        ],
        notify: true,
        transform: {
            '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
        },
        testRegex: '\\.(test|spec)\\.(ts|tsx|js)$',
        moduleFileExtensions: [
            'ts',
            'tsx',
            'json',
            'js'
        ],
        moduleDirectories: [
            'node_modules',
            '<rootDir>'
        ],
        collectCoverage: coverage,
    }

    if (node) {
        config.testEnvironment = 'node'
    }

    return config
}

