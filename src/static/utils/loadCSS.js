import merge from "lodash/merge";
import camelCase from "lodash/camelCase";

function loadCSSByAddLinkElement(url, _opts) {
    return new Promise((resolve, reject) => {
        let ele = merge(document.createElement("link"), {
            id: camelCase(url).toLowerCase(),
            rel: "stylesheet"
        });
        ele.onerror = function (e) {
            ele = ele.onerror = ele.onload = null;
            reject(e);
        };
        ele.onload = function (e) {
            ele = ele.onerror = ele.onload = null;
            resolve();
        };
        document.getElementsByTagName("head")[0].appendChild(ele);
        ele.href = url;
    });
}

const LoadedCSS = {};
export default function loadCss(url) {
    if (LoadedCSS[camelCase(url).toLowerCase()]) return Promise.resolve();
    return loadCSSByAddLinkElement(url)
        .then(function () {
            LoadedCSS[camelCase(url).toLowerCase()] = true;
            console.log("loaded", url);
        })
        .catch(function (error) {
            console.error(error);
        });
}