import "./styles/main.styl";
import _ from "./static/utils/tree-shaking/lodash.js";
/* 以key-val方式方便操作indexedDB */
import idb from "./static/lib/idb-keyval.es6.js";
import resolvePath from "./static/utils/resolvePath.js";
import VueLoader from "./static/utils/VueLoader.js";
import md5 from "md5";
import {
    startLoadingAnimation,
    stopLoadingAnimation
} from "./static/utils/loadingAnimation.js";
import {
    createHttpService
} from "./static/utils/httpRequest.js";
import lazyLoadComponent from "./static/utils/lazyLoadComponent.js";
import EventBus from "./static/utils/EventBus.js";
import loadJS from "./static/utils/loadJS.js";
import {
    $log,
    $error
} from "./static/utils/console.js";
import {
    cacheStaticResource
} from "./static/utils/cacheStaticResource.js";

let IS_DEV = /localhost:80/g.test(location.href);
window.APP_CONFIGS = {
    IS_DEV,
    STATIC_RES_VERSION: IS_DEV ? Date.now() : "202001101753"
};


window._ = _;
/* 懒加载Vue组件 */
_.$lazyLoadComponent = lazyLoadComponent;
/* 处理资源路径 */
_.$cacheStaticResource = cacheStaticResource;
_.$resolvePath = resolvePath;
/* system.src.js transform.js loader Vue 单文件 */
_.$VueLoader = VueLoader;
_.$md5 = md5;
_.$idb = idb;
_.$http = createHttpService(EventBus);
/* add utils */
_.$loadJS = loadJS;
_.$log = $log;
_.$error = $error;

/* 全局通信 */
window.EventBus = EventBus;
/* 用Chrome跑IE应该跑的代码 */
// window.isOldBrowser = true || (typeof fetch === "undefined");
window.isOldBrowser = true || (typeof fetch === "undefined");
setTimeout(() => startLoadingAnimation(_), 30);

(async (eleMain) => {
    /* 加载JS */
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
    await loadJS(resolvePath("static/lib/less.min.js"));

    if (eleMain && eleMain.dataset && eleMain.dataset.entry) {
        window.$system = window[window.isOldBrowser ? "SystemJS" : "System"];
        window.$system
            .import(resolvePath(eleMain.dataset.entry))
            .then(module => module.default(stopLoadingAnimation))
            .catch(console.error.bind(console))
            /* stopLoadingAnimation调用之后会stopLoadingAnimation=null */
            .finally(() => setTimeout(() => stopLoadingAnimation && stopLoadingAnimation(), 10 * 1000));
    }
})(document.querySelector("#script-main"));