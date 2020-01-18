import "./styles/main.less";
import _ from "./static/utils/tree-shaking/lodash.js";
/* _ 通用工具命名空间 */
window._ = _;
/* 以key-val方式方便操作indexedDB */
import localforage from "localforage";
import {
    resolvePath,
    getIDFromURL
} from "./static/utils/resolvePath.js";
import VueLoader from "./static/utils/VueLoader.js";
import md5 from "md5";
import {
    startLoadingAnimation,
    stopLoadingAnimation
} from "./static/utils/loadingAnimation.js";
import axios from "axios";
import lazyLoadComponent from "./static/utils/lazyLoadComponent.js";
import EventBus from "./static/utils/EventBus.js";
import {
    loadJS,
    checkResourceCache
} from "./static/utils/loadJS.js";
import loadCSS from "./static/utils/loadCSS.js";
import {
    $log,
    $error
} from "./static/utils/console.js";

import {
    xhrFetchWithCache
} from "./static/utils/loadJS.js";

/* 懒加载Vue组件 */
_.$lazyLoadComponent = lazyLoadComponent;
/* 处理资源路径 */
_.$xhrFetchWithCache = xhrFetchWithCache;
_.$getIDFromURL = getIDFromURL;
_.$resolvePath = resolvePath;
/* system.src.js transform.js loader Vue 单文件 */
_.$VueLoader = VueLoader;
_.$md5 = md5;
/* indexedDB key-val 操作库 */
_.$localforage = localforage;
_.$axios = axios;
/* add utils */
_.$loadJS = loadJS;
_.$loadCSS = loadCSS;
_.$log = $log;
_.$error = $error;

/* 全局通信 */
window.EventBus = EventBus;
setTimeout(() => startLoadingAnimation(_), 30);

(async (eleMain) => {
    try {
        /* 根据策略清除缓存 */
        await checkResourceCache(window.APP_CONFIGS.resource.exclude, _);
        /* 加载JS */
        if (window.APP_CONFIGS.IS_OLD_BROWSER) {
            await loadJS(resolvePath("static/lib/systemjs/system.src.js"));
            await loadJS(resolvePath("static/lib/systemjs/extras/transform.js"));
            await loadJS(resolvePath("static/lib/systemjs/babel-transform.js"));
            const {
                SystemJS
            } = window;
            SystemJS.config({
                map: {
                    "vue-router": resolvePath("static/lib/vue-router.esm.browser.js"),
                    "vuex": resolvePath("static/lib/vuex.esm.browserjs"),
                    "plugin-babel": resolvePath("static/lib/plugin-babel.js"),
                    "systemjs-babel-build": resolvePath("static/lib/systemjs-babel-browser.js")
                },
                transpiler: "plugin-babel"
            });
        } else {
            await loadJS(resolvePath("static/lib/systemjs/system.js"));
            window.SYSTEM_IMPORT_MAP_IMPORTS = {
                imports: {
                    "vue-router": resolvePath("static/lib/vue-router.esm.browser.js"),
                    "vuex": resolvePath("static/lib/vuex.esm.browserjs")
                }
            };

            await loadJS(resolvePath("static/lib/systemjs/extras/transform.js"));
            await loadJS(resolvePath("static/lib/systemjs/babel-transform.js"));
        }
        await loadJS(resolvePath("static/lib/less.min.js"));
        /* 基础的JS加载完毕之后加载entryjs */
        let _res = await _.$$STORE.getItem("httptest8082staticmoduleuserloginindexmjs");
        if (eleMain && eleMain.dataset && eleMain.dataset.entry) {
            window.$system = window[window.APP_CONFIGS.IS_OLD_BROWSER ? "SystemJS" : "System"];
            window.$system.import(resolvePath(eleMain.dataset.entry))
                .then(() => stopLoadingAnimation())
                .catch(console.error.bind(console))
                /* stopLoadingAnimation调用之后会stopLoadingAnimation=null */
                .finally(() => setTimeout(() => stopLoadingAnimation && stopLoadingAnimation(), 10 * 1000));
        }
    } catch (error) {
        console.log(error);
    }
})(document.querySelector("#script-main"));