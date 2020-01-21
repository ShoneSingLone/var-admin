const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave:false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set("@@", resolve("public"));
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
};