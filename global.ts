type Target = 'browser' | 'node' | 'jest' | 'react-native' | 'electron'
type Mode = 'prod' | 'dev' | 'test'

export type Opts = {
    target: Target,
    mode: Mode
}

export const defaultOpts = {
    target: 'browser',
    mode: 'dev'
}
