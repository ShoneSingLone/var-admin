import "./styles/main.less";
import "../public/static/scss/main.scss";
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
_.$checkResourceCache = checkResourceCache;
_.$stopLoadingAnimation = stopLoadingAnimation;
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