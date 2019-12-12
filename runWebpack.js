const webpack = require("webpack");
const webpackConfigurationObject = require("./webpack.config");
const compiler = webpack(webpackConfigurationObject);
compiler.watch({
    ignored: /node_modules/,
    aggregateTimeout: 1000,
    poll: 1000
}, (err, stats) => {
    if (err) {
        console.log("stats watch compiler err", err);
    } else {
        console.log("stats watch compiler stats");
        global.updateCSSevent && global.updateCSSevent.emit("updateCSS");
    }
});
compiler.run((err, stats) => {
    console.log("success run webpack...");
});