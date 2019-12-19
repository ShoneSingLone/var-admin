// vue.config.js
const publicPath = process.env.NODE_ENV === 'production' ? './' : '/';
const outputDir = "content";
const runtimeCompiler = true;

module.exports = {
    publicPath,
    outputDir,
    runtimeCompiler
};