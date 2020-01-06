import "./styles/main.scss";
import loadingAnimation from "../public/static/js/loadingAnimation.js";
import merge from "lodash/merge";

const h = document.createElement.bind(document);
const body = document.body;

body.appendChild(merge(h("div"), {
    innerHTML: 'loading'
}));
body.appendChild(merge(h("canvas"), {
    id: "init-canvas",
    style: " bottom: 0; left: 0; margin: auto; position: absolute; right: 0; top: 0; "
}));
setTimeout(loadingAnimation, 30);

(function (w, isOldBrowser) {
    w.isOldBrowser = isOldBrowser;
    var systemjsurl = './static/lib/systemjs/system' + (isOldBrowser ? '.src.js' : '.js');
    var libs = [
        '<script src="./static/lib/polyfill/babel-polyfill.js"><\/script>',
        '<script src="./static/lib/polyfill/fetch.js"><\/script>',
        '<script src="' + systemjsurl + '"><\/script>',
        '<script src="./static/lib/systemjs/extras/transform.js"><\/script>',
        '<script src="./static/lib/systemjs/babel-transform.js"><\/script>',
    ];
    document.write(libs.join(""));
    const { System } = window;
    if (isOldBrowser) {
        console.time("isOldBrowser");
        System.config({
            map: {
                'plugin-babel': './static/lib/plugin-babel.js',
                'systemjs-babel-build': './static/lib/systemjs-babel-browser.js'
            },
            transpiler: 'plugin-babel'
        });
    } else {
        console.time("smart");
    }
})(window, typeof fetch === 'undefined');