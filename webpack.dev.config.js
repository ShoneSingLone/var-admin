global.development = true;
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./config/webpack.base.config')
const paths = require('./config/paths')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: paths.entry,
  output: {
    path: paths.output,
    filename: 'static/js/dev.[name].js',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...paths.HtmlWebpackPlugin,
  ],
})