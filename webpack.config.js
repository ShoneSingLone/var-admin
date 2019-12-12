const path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: "production",
    entry: "./workspace/_main.js",
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
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin("main.css"),
    ],
    output: {
        path: path.resolve(__dirname, "./public/statics/css"),
        filename: "main.js"
    }
};