import envPreset from 'babel-preset-env'
import reactPreset from 'babel-preset-react'
import transformObjectRestSpread from 'babel-plugin-transform-object-rest-spread'
// import syntaxDynamicImport from 'babel-plugin-syntax-dynamic-import'

type Mode = 'prod' | 'dev'
type Target = 'browser' | 'node' | 'jest' | 'electron'

type Opts = {
    mode: Mode,
    target: Target
}

const getEnvPresetOpts = (opts: Opts) => {
}

const defaultOpts: Opts = {
    target: 'node',
    mode: 'dev'
}

const buildPreset = (opts: Opts = defaultOpts, context: any) => {
    const { target, mode } = opts

    const presets: any[] = [
        [envPreset, getEnvPresetOpts(opts)]
    ]

    if (target !== 'browser') {
        presets.push(reactPreset)
    }

    const plugins: any[] = [
        // syntaxDynamicImport,
        transformObjectRestSpread
    ]

    return { presets, plugins }
}

export default buildPreset
