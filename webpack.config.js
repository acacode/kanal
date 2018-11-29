const path = require('path')

const createConfig = mode => {
  const isProd = mode === 'production'
  return {
    entry: path.resolve(__dirname, 'lib/kanal.js'),
    mode: mode,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: (isProd ? 'kanal.min' : 'kanal') + '.js',
      library: 'kanal',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    //   optimization: {
    //     minimizer: [
    //       new UglifyJsPlugin({
    //         cache: true,
    //         parallel: true,
    //         uglifyOptions: { output: { comments: false } },
    //       }),
    //     ],
    //   },
  }
}

module.exports = [createConfig('production'), createConfig('development')]
