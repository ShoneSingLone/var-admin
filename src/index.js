// import "./styles/main.scss";
window.isOldBrowser = (typeof fetch === 'undefined');
import _ from "lodash";
window._ = _;
import loadJS from "../public/static/utils/loadJS.js"

/* 加载JS */
_.$loadJS = loadJS;
import loadingAnimation from "../public/static/js/loadingAnimation.js";
setTimeout(() => loadingAnimation(), 30);

(async () => {
    const a = new Promise((r) => {
        setTimeout(() => {
            r(1);
        }, 100);
    });
    let res = await a();
    console.log("res", res);
})();