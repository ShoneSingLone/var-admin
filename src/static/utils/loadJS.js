import camelCase from "lodash/camelCase";
import merge from "lodash/merge";
import last from "lodash/last";
import {
    cacheStaticResourceAndToCode
} from "./cacheStaticResource.js";
export default function loadJS(url) {
    /* 白名单，如果资源在白名单上，缓存 */
    let whiteList = ["systemjs", "systemsrcjs", "babeltransformjs", "vue2611broswerjs", "transformjs", "lessminjs"];
    // whiteList = [];
    const whiteListKey = camelCase(last(url.split("/"))).toLowerCase();
    const handlerName = (~whiteList.indexOf(whiteListKey)) ? "cache" : "noCache";
    const _loadJS = (handlerName === "cache" ? cacheStaticResourceAndToCode(url) : loadJSByAddScriptElement(url));
    return _loadJS.then(function (res) {
            console.log("loaded", url);
        })
        .catch(function (error) {
            console.error(error);
        });
}


function loadJSByAddScriptElement(url, _opts) {
    return new Promise((resolve, reject) => {
        let ele = merge(document.createElement("script"), {
            id: camelCase(url).toLowerCase(),
            src: url
        });
        ele.onerror = function (e) {
            ele = ele.onerror = ele.onload = null;
            reject(e);
        };
        ele.onload = function (e) {
            ele = ele.onerror = ele.onload = null;
            resolve();
        };
        document.body.appendChild(ele);
    });
}