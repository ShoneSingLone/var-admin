module.exports = {
    map: false,
    plugins: [
        require("postcss-flexbugs-fixes"),
        require("autoprefixer")([
            "> 1%",
            "last 2 versions",
            "ie >10",
        ]),
    ],
};