const webpack = require("webpack");
const path = require("path");

// see below for details on the options
const entry = path.join(__dirname, "../..", "node_modules/ant-design-vue/es/input/index.js");
const outputPath = path.join(__dirname, "../../public", "static/lib/antd", "test");
console.log("outputPath", outputPath);
const webpackConfig = {
    entry: {
        index: "./src/index.js",
        another: "./src/another-module.js"
    },
    externals: {
        vue: "Vue",
        // lodash: "_"
    },
    /* 确保 bundle 是未压缩版本 */
    mode: "production",
    // mode: "development",
    optimization: {
        usedExports: false,
        splitChunks: {
            chunks: "all"
        }
    },
    output: {
        path: outputPath,
        filename: "[name].bundle.js",
        // library: "[name].library.js",
        // libraryTarget: "umd"
    }

};

webpack(webpackConfig, (err, stats) => { // Stats Object
    if (err || stats.hasErrors()) {

    }
});