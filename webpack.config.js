const resolve = require('path').resolve
const path = dir => resolve(__dirname, dir)

const createConfig = (mode, configration) => {
  if (!configration) configration = {}
  const isProd = mode === 'production'
  let filename = configration.filename || 'kanal'
  const plugins = configration.plugins || []
  if (configration.withoutPromises) {
    filename += '.non-promise'
  }
  return {
    entry: path('lib/kanal.js'),
    mode: mode,
    output: {
      path: path('dist'),
      filename: (isProd ? `${filename}.min` : filename) + '.js',
      library: 'kanal',
      libraryTarget: 'umd',
    },
    resolveLoader: {
      modules: ['node_modules', path('loaders')],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: [
            'babel-loader',
            isProd && 'production-js-loader'
          ].filter(loader => loader),
          exclude: /node_modules/,
        },
      ],
    },
    plugins,
  }
}

module.exports = [
  createConfig('production'),
  createConfig('development')
]
