console.log("babel.config.js");


module.exports = {
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "transform-vue-jsx",
        "@babel/plugin-proposal-optional-chaining"
    ]
};