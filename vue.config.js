const path = require("path");
const _ = require("lodash");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = ((defaultOptions) => {
    const envOptions = {};

    if (process.env.NODE_ENV === "lib") {
        envOptions.css = {
            extract: false
        };
    }
    return _.merge({}, defaultOptions, envOptions)
})({
    lintOnSave: false,
    runtimeCompiler: true,
    devServer: {
        proxy: {
            "/api/v1": {
                target: "http://127.0.0.1:7001"
            }
        }
    },
    chainWebpack: (config) => {
        console.log("alias");
        config.resolve.alias.set("@@", resolve("public"));
    },
    pages: {
        index: {
            // entry for the page
            entry: "src/main.js",
            // the source template
            template: "public/tmpl.html",
            // output as dist/index.html
            filename: "index.html",
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Index Page",
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
    }
});