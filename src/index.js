import "./styles/main.styl";
import _ from "lodash";
import loadJS from "../public/static/utils/loadJS.js";
import resolvePath from "../public/static/utils/resolvePath.js";
import loadingAnimation from "../public/static/js/loadingAnimation.js";
_.$loadJS = loadJS;
_.$resolvePath = resolvePath;
window._ = _;
window.isOldBrowser = true || (typeof fetch === 'undefined');

setTimeout(() => loadingAnimation(), 30);

(async () => {
    /* 加载JS */
    if (window.isOldBrowser) {
        // await loadJS(resolvePath("static/lib/polyfill/babel-polyfill.js"));
        await loadJS(resolvePath(`static/lib/systemjs/system${window.isOldBrowser ? '.src.js' : '.js'}`));
        await loadJS(resolvePath("static/lib/systemjs/extras/transform.js"));
        await loadJS(resolvePath("static/lib/systemjs/babel-transform.js"));
    }
    const {
        SystemJS
    } = window;

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

    (function (eleMain) {
        debugger;
        if (eleMain.dataset.entry) {
            System
                .import(eleMain.dataset.entry)
                .then(function (m) {
                    for (var iterator in m) {
                        console.log(iterator);
                    }
                    return 0;
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    })(document.querySelector("#script-main"));
})();

/* loadJS(resolvePath("static/lib/polyfill/babel-polyfill.js"))
    .then(() => loadJS(resolvePath("static/lib/systemjs/extras/transform.js")))
    .then(() => loadJS(resolvePath("static/lib/systemjs/babel-transform.js")))
    .catch(function (error) {
        console.error(error);
    }); */