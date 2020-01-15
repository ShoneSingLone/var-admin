const webpack = require("webpack");
const path = require("path");
const webpackBaseConfig = require("../webpack.base.config.js");
const merge = require("webpack-merge");
require("./makeAntdvFile");

// see below for details on the options
const outputPath = path.join(__dirname, "../../public", "static/lib/bundle");

const webpackConfig = merge({
    entry: {
        // index: "./src/index.js",
        // another: "./src/another-module.js",
        antdv: "./antdv.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx|mjs)$/,
            loader: "babel-loader",
            options: {
                compact: true,
            },
        }]
    },
    externals: {
        vue: "Vue",
        lodash: "_"
    },
    /* 确保 bundle 是未压缩版本 */
    // mode: "development",
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "all",
            minSize: 60000
        }
    },
    mode: "production",
    output: {
        path: outputPath,
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js",
    }
});

webpack(webpackConfig, (err, stats) => { // Stats Object
    if (err || stats.hasErrors()) {

    }
});