const path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./sass/style.js",
    watch: true,
    module: {
        rules: [{
                test: /\.scss$/,
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
                                "sass-loader"
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
        new ExtractTextPlugin("style.css"),
    ],
    output: {
        path: path.resolve(__dirname, "./public/statics/css"),
        filename: "_style.js"
    }
};