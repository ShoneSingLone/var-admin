import "./styles/main.scss";
import loadingAnimation from "../public/static/js/loadingAnimation.js";
import _ from "lodash";
import Vue from "vue"
window._ = _;
window.Vue = Vue;
const {
    merge
} = _;

const h = document.createElement.bind(document);
const body = document.body;

body.appendChild(merge(h("div"), {
    innerHTML: 'loading'
}));
body.appendChild(merge(h("canvas"), {
    id: "init-canvas",
    style: " bottom: 0; left: 0; margin: auto; position: absolute; right: 0; top: 0; "
}));
setTimeout(() => loadingAnimation("init-canvas"), 30);

(function (w, isOldBrowser) {
    w.isOldBrowser = isOldBrowser;
    var systemjsurl = '/static/lib/systemjs/system' + (isOldBrowser ? '.src.js' : '.js');

    function getScriptString(src) {
        return '<script src="' + src + '"></script>';
    }
    var libs = [
        getScriptString("/static/lib/polyfill/babel-polyfill.js"),
        getScriptString("/static/lib/polyfill/fetch.js"),
        getScriptString(systemjsurl),
        getScriptString("/static/lib/systemjs/extras/transform.js"),
        getScriptString("/static/lib/systemjs/babel-transform.js"),
    ];
    document.write(libs.join(""));
    const {
        System
    } = window;
    if (isOldBrowser) {
        console.time("isOldBrowser");
        System.config({
            map: {
                'plugin-babel': '/static/lib/plugin-babel.js',
                'systemjs-babel-build': '/static/lib/systemjs-babel-browser.js'
            },
            transpiler: 'plugin-babel'
        });
    } else {
        console.time("smart");
    }
})(window, typeof fetch === 'undefined');