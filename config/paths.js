const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const root = path.normalize(`${__dirname}/..`)
const getPath = (_path) => path.resolve(__dirname, "..", _path);
const getFilename = (_name) => global.development ? _name : "dev/" + _name;

module.exports = {
  root,
  context: getPath('src'),
  output: getPath('public'),
  pathToStatic: getPath('public/static/'),
  /* module page */
  entry: {
    app: [
      // 'babel-polyfill',
      getPath('src/entry/app.js'),
    ],
    index: [
      // 'babel-polyfill',
      getPath('src/index'),
    ]
  },
  HtmlWebpackPlugin: [
    new HtmlWebpackPlugin({
      template: getPath('template/index.html'),
      filename: getFilename("app.html"),
      title: '应用'
    }),
    new HtmlWebpackPlugin({
      template: getPath('template/index.html'),
      filename: getFilename("index.html"),
      title: 'Dev'
    }),
  ]
}