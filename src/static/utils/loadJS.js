import camelCase from "lodash/camelCase";
import last from "lodash/last";
import {
    cacheStaticResourceAndToCode
} from "./cacheStaticResource.js";

export default function (url) {
    /* 白名单，如果资源在白名单上，缓存 */
    const whiteList = ["systemjs", "systemsrcjs", "babeltransformjs", "vue2611broswerjs", "transformjs", "lessminjs"];
    const whiteListKey = camelCase(last(url.split("/"))).toLowerCase();
    const handlerName = (~whiteList.indexOf(whiteListKey)) ? "cache" : "noCache";
    if (handlerName === "cache") {
        return cacheStaticResourceAndToCode(url);
    } else {
        return loadJSByAddScriptElement(url);
    }
}


function loadJSByAddScriptElement(url, id, _opts) {
    return new Promise((resolve, reject) => {
        let ele = window._.merge(document.createElement("script"), {
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