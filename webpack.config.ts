import * as path from 'path'
import * as Webpack from 'webpack'
import * as ExtractText from 'extract-text-webpack-plugin'
import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader'
import * as OptimizeJsPlugin from 'optimize-js-plugin'
import * as CompressionPlugin from 'compression-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack-plugin'
import * as BabiliPlugin from 'babili-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Opts, defaultOpts } from './global'

type BuildRule = (opts: Opts) => Webpack.Rule

const buildConfig = (opts: Opts): any => {}

const isProduction: Boolean = !!(
  "build" === process.env.npm_lifecycle_event ||
  "production" === process.env.NODE_ENV
)

const tryCatch = (a: Function, b: Function): void => {
  try {
    return a()
  } catch (err) {
    return b(err)
  }
}

const buildTsxRule: BuildRule = (opts) => {
  const use: Webpack.NewLoader[] = [
    {
      loader: 'awesome-typescript-loader',
      options: {
        configFileName: './tsconfig.webpack.json'
        // config: buildConfig(opts)
      }
    }
  ]

  return {
    use,
    test: /\.tsx?$/,
    include: path.join(__dirname, "app"),
    exclude: /(node_modules|\/vendor\.js$)/
  }
}

const buildCssRule: BuildRule = (opts) => {
  const use: Webpack.NewLoader[] = [
    {
      loader: 'css-loader',
      options: {
        minimize: true,
        autoprefixer: true,
        sourceMap: true
      }
    }
  ]

  const fallback: Webpack.NewLoader = {
    loader: 'style-loader',
    options: {
      singleton: false,
      insertAt: 'top'
    }
  }

  return {
    test: /\.css$/,
    use: ExtractText.extract({ fallback, use })
  }
}

const buildAssetsRule: BuildRule = (opts) => {
  return {
    test: /\.(jpe?g|webp|bmp|ico|png|svg|woff2?|ttf|eot)/,
    loader: 'url-loader',
    options: {
      limit: 10240
    }
  }
}

const buildPlugins= (opts: Opts): Webpack.Plugin[] => {
  const plugins = [
    new Webpack.DllReferencePlugin({
      context: '.',
      manifest: tryCatch(
        () => require('./static/assets/vendor.manifest.json'),
        () => ({ name: "vendor_dll", content: {} })
      ) as any
    }),
    new CheckerPlugin(),
    new TsConfigPathsPlugin({
      tsconfig: "tsconfig.Webpack.json",
      configFileName: "tsconfig.Webpack.json",
      compiler: "typescript",
    }),
    new ExtractText({
      allChunks: true,
      disable: !isProduction,
      filename: "styles.bundle.css",
    }),
    new Webpack.ProvidePlugin({
      "Promise": "bluebird",
    }),
    new Webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    })
  ]

  if (opts.mode === 'prod') {
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: "static",
        generateStatsFile: true,
        statsOptions: {
          assets: true,
          source: false,
          modules: false,
          chunks: false,
          chunkModules: false
        }
      }),
      new Webpack.optimize.AggressiveMergingPlugin(),
      new ImageminPlugin(),
      new OptimizeJsPlugin(),
      new CompressionPlugin(),
      new BabiliPlugin({ sourceMap: true })
    )
  } else {
    plugins.push(
      new Webpack.NamedModulesPlugin(),
      new Webpack.HotModuleReplacementPlugin()
    )
  }

  return plugins
}

module.exports = (opts: Opts = defaultOpts): Webpack.Configuration => {
  const {
    mode = defaultOpts.mode,
    target = defaultOpts.target
  } = opts

  const rules = [
    buildTsxRule(opts),
    buildCssRule(opts),
    buildAssetsRule(opts)
  ]

  const plugins = buildPlugins(opts)

  const entry = {
    app: [
      './app/main.web.tsx'
    ]
  }

  if (mode === 'dev') {
    entry.app.unshift(
      'webpack-hot-middleware/client?overlay=true&reload=false&quiet=true'
    )
  }

  const config: Webpack.Configuration = {
    entry,
    plugins,
    module: {
      rules
    },
    devtool: mode === 'prod'
      ? 'source-map'
      : 'inline-source-map',
    performance: {
      hints: false
    },
    output: {
      path: path.resolve('./build'),
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js',
      sourceMapFilename: '[file].map'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        'app': path.resolve('./app')
      },
    },
    devServer: {
      stats: "errors-only",
      publicPath: "/",
      noInfo: true,
      inline: true,
      hot: true,
      historyApiFallback: true
    },
    node: {
      child_process: "empty",
      global: true,
      net: "mock",
      dns: "mock"
    }
  }

  return config
}
