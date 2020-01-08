import "./styles/main.styl";
import _ from "lodash";
import loadJS from "../public/static/utils/loadJS.js";
import resolvePath from "../public/static/utils/resolvePath.js";
import VueLoader from "../public/static/utils/VueLoader.js";
import loadingAnimation from "../public/static/js/loadingAnimation.js";

_.$loadJS = loadJS;
_.$resolvePath = resolvePath;
_.$VueLoader = VueLoader;

window._ = _;
window.isOldBrowser = (typeof fetch === 'undefined');

setTimeout(() => loadingAnimation(), 30);

(async (eleMain) => {
    /* 加载JS */
    if (window.isOldBrowser) {
        await loadJS(resolvePath(`static/lib/systemjs/system.src.js`));
        await loadJS(resolvePath("static/lib/systemjs/extras/transform.js"));
        await loadJS(resolvePath("static/lib/systemjs/babel-transform.js"));
        const {
            SystemJS
        } = window;

        SystemJS.config({
            map: {
                'plugin-babel': './static/lib/plugin-babel.js',
                'systemjs-babel-build': './static/lib/systemjs-babel-browser.js'
            },
            transpiler: 'plugin-babel'
        });
        console.time("window.isOldBrowser");

    } else {
        await loadJS(resolvePath(`static/lib/systemjs/system.js`));
        await loadJS(resolvePath("static/lib/systemjs/extras/transform.js"));
        await loadJS(resolvePath("static/lib/systemjs/babel-transform.js"));
        console.time("smart");
    }


    if (eleMain.dataset.entry) {
        window[window.isOldBrowser ? "SystemJS" : "System"]
            .import(eleMain.dataset.entry)
            .catch((error) => console.error(error));
    }

})(document.querySelector("#script-main"));

/* loadJS(resolvePath("static/lib/polyfill/babel-polyfill.js"))
    .then(() => loadJS(resolvePath("static/lib/systemjs/extras/transform.js")))
    .then(() => loadJS(resolvePath("static/lib/systemjs/babel-transform.js")))
    .catch(function (error) {
        console.error(error);
    }); */