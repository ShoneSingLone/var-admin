const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpackBaseConfig = require("./config/webpack.base.config");
const paths = require("./config/paths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");

module.exports = merge(webpackBaseConfig, {
    resolve: {
        alias: {
            "@": resolve("src"),
            "@@": resolve("public")
        }
    },
    mode: "production",
    devtool: "source-map",
    entry: [
        "babel-polyfill",
        "./index",
    ],
    output: {
        path: paths.output,
        filename: "static/js/[name].js",
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
                    name: "main",
                    chunks: "all",
                    minChunks: 2
                },
            },
        },

    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerPort: 8083
        }),
        new MiniCssExtractPlugin({ //提取css
            filename: "static/css/main.css"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                BABEL_ENV: JSON.stringify("production"),
            },
        }),
    ],
});