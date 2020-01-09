import "./styles/main.styl";
import _ from "lodash";
import { createHttpService } from "../public/static/utils/httpRequest.js";
import createVueEventBus from "../public/static/utils/VueEventBus.js";
import loadJS from "../public/static/utils/loadJS.js";
import { checkStaticResource, checkStaticResourceManifest } from "../public/static/utils/checkStaticResource.js";
/* 以key-val方式方便操作indexedDB */
import idb from 'idb-keyval';
import { resolvePath, setBaseurl } from "../public/static/utils/resolvePath.js";
import VueLoader from "../public/static/utils/VueLoader.js";
import md5 from "md5";
import { startLoadingAnimation, stopLoadingAnimation } from "../public/static/js/loadingAnimation.js";
import { Vue } from "../public/static/lib/vue-2.6.11.js";

const VueEventBus = createVueEventBus(Vue);
/* add utils */
_.$loadJS = loadJS;
_.$resolvePath = resolvePath;
_.$VueLoader = VueLoader;
_.$md5 = md5;
_.$idb = idb;
_.$http = createHttpService(VueEventBus);

window._ = _;
window.Vue = Vue;
window.VueEventBus = VueEventBus;
window.isOldBrowser = (typeof fetch === "undefined");
setTimeout(() => startLoadingAnimation(_), 30);

checkStaticResource(_)

(async (eleMain) => {
    /* 加载JS */
    if (eleMain && eleMain.dataset && eleMain.dataset.entry && eleMain.dataset.entry.baseurl) {
        setBaseurl(eleMain.dataset.entry.baseurl);
    }
    if (window.isOldBrowser) {
        await loadJS(resolvePath("static/lib/systemjs/system.src.js"));
        await loadJS(resolvePath("static/lib/systemjs/extras/transform.js"));
        await loadJS(resolvePath("static/lib/systemjs/babel-transform.js"));
        const {
            SystemJS
        } = window;
        SystemJS.config({
            map: {
                "plugin-babel": resolvePath("static/lib/plugin-babel.js"),
                "systemjs-babel-build": resolvePath("static/lib/systemjs-babel-browser.js")
            },
            transpiler: "plugin-babel"
        });
    } else {
        await loadJS(resolvePath("static/lib/systemjs/system.js"));
        await loadJS(resolvePath("static/lib/systemjs/extras/transform.js"));
        await loadJS(resolvePath("static/lib/systemjs/babel-transform.js"));
    }

    if (eleMain && eleMain.dataset && eleMain.dataset.entry) {
        window[window.isOldBrowser ? "SystemJS" : "System"]
            .import(resolvePath(eleMain.dataset.entry))
            .catch(console.error.bind(console))
            .finally(stopLoadingAnimation);
    }
})(document.querySelector("#script-main"));