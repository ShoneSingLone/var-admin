<<<<<<< HEAD
const path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


module.exports = {
    mode: "production",
    entry: {
        "modules/main": "./workspace/_main.js",
        "modules/sub": "./workspace/_sub.js",
    },
    watch: true,
    module: {
        rules: [
            /* { test: /\.scss$/, use: (() => { let loader = ExtractTextPlugin .extract({ fallback: "style-loader", use: [ "css-loader", { loader: "postcss-loader", options: { sourceMap: false, config: { path: "postcss.config.js" } } }, "sass-loader" ] }); return loader; })() }, */
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.styl$/,
                use: (() => {
                    let loader = ExtractTextPlugin
                        .extract({
                            fallback: "style-loader",
                            use: [
                                "css-loader",
                                {
                                    loader: "postcss-loader",
                                    options: {
                                        sourceMap: false,
                                        config: {
                                            path: "postcss.config.js"
                                        }
                                    }
                                },
                                "stylus-loader"
                            ]
                        });
                    return loader;
                })()
            },
            {
                test: /\.png$/,
                loader: "file-loader"
            }
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                parallel: true,
                cache: true,
                uglifyOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
            }),
        ],
        /*         splitChunks: {
                  cacheGroups: {
                    default: false,
                    commons: {
                      test: /[\\/]node_modules[\\/]/,
                      name: "main",
                      chunks: "all",
                      minChunks: 2
                    },
                  },
                },
         */
    },

    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: (getPath) => {
                const a = getPath('css/[name].css');
                const b = a.replace('css/modules', 'css');
                console.log('b', a, b);
                return b;
            },
            allChunks: true
        })
    ],
    output: {
        path: path.resolve(__dirname, "./public/statics"),
        publicPath: "/statics/",
        filename: "[name].js"
    }
};
=======
const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpackBaseConfig = require("./config/webpack.base.config");
const paths = require("./config/paths");

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  devtool: "source-map",
  entry: [
    "babel-polyfill",
    "./index",
  ],
  output: {
    path: paths.output,
    filename: "static/js/[name].[hash:8].js",
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "main",
          chunks: "all",
          minChunks: 2
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        BABEL_ENV: JSON.stringify("production"),
      },
    }),
  ],
});
>>>>>>> origin/dependabot/npm_and_yarn/lodash-4.17.15
