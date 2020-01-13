const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackBaseConfig = require('./config/webpack.base.config')
const paths = require('./config/paths')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './index',
  ],
  output: {
    path: paths.output,
    filename: 'static/js/[name].js',
  },
  optimization: {

    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        parallel: false,
        cache: false
      }),
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'main',
          chunks: 'all',
          minChunks: 2
        },
      },
    },

  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('production'),
      },
    }),
  ],
})