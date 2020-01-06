const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: "content",
    devServer: {
        hot: true,
        proxy: 'http://localhost:3000'
    },
    runtimeCompiler: true,
    pages: {
        login: {
            entry: [ /* 'babel-polyfill', */ "src/login.ts"],
            template: "public/index.html",
            filename: "login.html",
            title: "登录"
        },
        shell: {
            entry: [ /* 'babel-polyfill', */ "src/shell.ts"],
            template: "public/index.html",
            filename: "shell.html",
            title: "系统"
        },
    },
    configureWebpack: {
        plugins: (() => {
            const _plugins = [];
            if (process.env.NODE_ENV === 'production') {
                // build之后复制到服务器部署目录，需要配置相应脚本
                _plugins.push(new WebpackShellPlugin({
                    onBuildExit: [`node ./config/build/copydir`]
                }));
            }
            return _plugins
        })(),
        resolve: {
            alias: {
                '@c': resolve('./src/components'),
            }
        },
    }
};