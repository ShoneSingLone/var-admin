import "./styles/main.styl";
import _ from "../public/static/utils/tree-shaking/lodash.js";
window._ = _;
import {
    createHttpService
} from "../public/static/utils/httpRequest.js";
import lazyLoadComponent from "../public/static/utils/lazyLoadComponent.js";
import EventBus from "../public/static/utils/EventBus.js";
import loadJS from "../public/static/utils/loadJS.js";
import {
    checkStaticResource,
    checkStaticResourceManifest
} from "../public/static/utils/checkStaticResource.js";
/* 以key-val方式方便操作indexedDB */
import idb from '../public/static/lib/idb-keyval.es6.js';
console.log("idb", idb);
import resolvePath from "../public/static/utils/resolvePath.js";
import VueLoader from "../public/static/utils/VueLoader.js";
import md5 from "md5";
import {
    startLoadingAnimation,
    stopLoadingAnimation
} from "../public/static/js/loadingAnimation.js";

/* add utils */
_.$loadJS = loadJS;
/* 懒加载Vue组件 */
_.$lazyLoadComponent = lazyLoadComponent;
/* 处理资源路径 */
_.$resolvePath = resolvePath;
/* system.src.js transform.js loader Vue 单文件 */
_.$VueLoader = VueLoader;
_.$md5 = md5;
_.$idb = idb;
_.$http = createHttpService(EventBus);

window.EventBus = EventBus;
/* 用Chrome跑IE应该跑的代码 */
// window.isOldBrowser = true || (typeof fetch === "undefined");
window.isOldBrowser = (typeof fetch === "undefined");
setTimeout(() => startLoadingAnimation(_), 30);

checkStaticResource(_);

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
        window.$system = window[window.isOldBrowser ? "SystemJS" : "System"];
        window.$system
            .import(resolvePath(eleMain.dataset.entry))
            .then(module => module.default())
            .catch(console.error.bind(console))
            .finally(stopLoadingAnimation);
    }
})(document.querySelector("#script-main"));