module.exports = ({
    isWebpack = false,
    isDevServer = false,
    isNode = true,
    isJest = false
} = {}) => {
    const compilerOptions = {
        outDir: './build',
        moduleResolution: 'node',
        removeComments: false,
        alwaysStrict: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        importHelpers: true,
        baseUrl: '.',
        paths: {
            'app/*': ['./app/*'],
            'server/*': ['./server/*']
        },
        types: [
            'jest',
            'reflect-metadata'
        ],
        target: 'es7',
        // jsx: isWebpack ? 'preserve' : 'react',
        jsx: 'react',
        module: isWebpack
            ? 'es6'
            : isProd
                ? 'systemjs'
                : 'commonjs'
    }

    const config = {
        lazy: true,
        fast: true,
        disableWarnings: true,
        compileOnSave: false,
        compilerOptions,
        awesomeTypescriptLoader: {
            transpileOnly: true,
            forkChecker: true,
            useTranspileModule: true,
            useBabel: true,
            useCache: true
        },
        filesGlob: [
            '!node_modules/**',
            '!db/**',
            '!pseudo/**',
            '!tmp/**',
            '!landing/**',
            '!static/**',
            '!deploy/**'
        ],
        exclude: [
            'app/native',
            'pseudo',
            'landing',
            'tmp',
            'test',
            'deploy',
            'db',
            'static',
            'node_modules'
        ]
    }

    return config
}

{
    lazy: true,
    fast: true,
    'disableWarnings': true,
    'compileOnSave': false,
    'compilerOptions': {
        'target': 'es2017',
        'moduleResolution': 'node',
        'module': 'system',
        'sourceMap': true,
        'jsx': 'react',
        'outDir': './build',
        'removeComments': true,
    },
    'awesomeTypescriptLoader': {
        'transpileOnly': true,
        'forkChecker': true,
        'useTranspileModule': true,
        'useBabel': true,
        'useCache': true
    },
    'filesGlob': [
        '!node_modules/**',
        '!db/**',
        '!pseudo/**',
        '!tmp/**',
        '!landing/**',
        '!static/**',
        '!deploy/**'
    ],
    'exclude': [
       ]
}
