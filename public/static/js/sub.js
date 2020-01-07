var libs = [
    './static/lib/systemjs/system' + (window.isOldBrowser ? '.src.js' : '.js'),
    "./static/lib/systemjs/extras/transform.js",
    "./static/lib/systemjs/babel-transform.js"
];
debugger;
var _ = window._;
Promise
    .all(libs.map(_.$loadJS))
    .then(function () {
        var System = window.System;
        if (window.isOldBrowser) {
            console.time("window.isOldBrowser");
            SystemJS.config({
                map: {
                    'plugin-babel': './static/lib/plugin-babel.js',
                    'systemjs-babel-build': './static/lib/systemjs-babel-browser.js'
                },
                transpiler: 'plugin-babel'
            });
        } else {
            console.time("smart");
        }
        debugger;
        System
            .import('./static/module/login/login.js')
            .then(function (m) {
                for (var iterator in m) {
                    console.log(iterator);
                }
                return 0;
            })
            .catch(function (error) {
                console.error(error);
            });
    })
    .catch(function (error) {
        console.error(error);
    });