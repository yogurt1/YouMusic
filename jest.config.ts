type Opts = {
    node?: boolean,
    coverage?: boolean
}

const defaultOpts: Opts = {
    node: true,
    coverage: false
}

type JestConfig = any

module.exports = (opts: Opts = defaultOpts): JestConfig => {
    const {
        node = defaultOpts.node,
        coverage = defaultOpts.coverage
    } = opts

    const config: JestConfig = {
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

