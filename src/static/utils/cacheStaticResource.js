import idb from "../lib/idb-keyval.es6.js";

const {
    set,
    get,
    clear,
    Store
} = idb;

export async function cacheStaticResourceAndToCode(url, _opts) {
    try {
        const {
            _,
        } = window;
        const {
            camelCase
        } = _;

        let id = camelCase(url).toLowerCase();
        /* 全局单例用于存储大体积静态资源的Store */
        _.$$STORE = _.$$STORE || new Store("STATIC_RES_DB", "STATIC_RES_STORE");
        const BIG_STORE = _.$$STORE;
        let source = await cacheStaticResource(url, _opts);
        if (source) {
            /* TODO:cache */
            await set(id, source, BIG_STORE);
            /* Promise.resolve(window._.$VueLoader(url, text)); */
            sourceToCode(source);
            console.log("%c cache", "background:green;color:white;", "\tid:", id);
            return Promise.resolve();
        }
        throw new Error(`Fetch error: ${url}`);
    } catch (error) {
        return Promise.reject(error);
    }

}

export let checkStaticResourceManifest = {};

async function cacheStaticResource(url, _opts) {
    const {
        _,
        APP_CONFIGS: {
            STATIC_RES_VERSION
        }
    } = window;
    const {
        camelCase
    } = _;

    let id = camelCase(url).toLowerCase();

    /* 全局单例用于存储大体积静态资源的Store */
    _.$$STORE = _.$$STORE || new Store("STATIC_RES_DB", "STATIC_RES_STORE");
    const BIG_STORE = _.$$STORE;
    let _version = await get("VERSION" + STATIC_RES_VERSION, BIG_STORE);
    if (!_version) {
        await clear(BIG_STORE);
        set("VERSION" + STATIC_RES_VERSION, "VERSION" + STATIC_RES_VERSION, BIG_STORE);
    }
    let source = await get(id, BIG_STORE);
    if (source) {
        return Promise.resolve(source);
    }
    return await xhrFetch(url, _opts);
}

function sourceToCode(source) {
    (0, eval)(source);
}

function xhrFetch(url, authorization) {
    return new Promise(function (resolve, reject) {
        // percent encode just "#" for HTTP requests
        url = url.replace(/#/g, "%23");

        var xhr = new XMLHttpRequest();

        function load() {
            resolve(xhr.responseText);
        }

        function error() {
            reject(new Error("XHR error: " + (xhr.status ? " (" + xhr.status + (xhr.statusText ? " " + xhr.statusText : "") + ")" : "") + " loading " + url));
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // in Chrome on file:/// URLs, status is 0
                if (xhr.status == 0) {
                    if (xhr.response) {
                        load();
                    } else {
                        // when responseText is empty, wait for load or error event
                        // to inform if it is a 404 or empty file
                        xhr.addEventListener("error", error);
                        xhr.addEventListener("load", load);
                    }
                } else if (xhr.status === 200) {
                    load();
                } else {
                    error();
                }
            }
        };
        xhr.open("GET", url, true);

        if (xhr.setRequestHeader) {
            xhr.setRequestHeader("Accept", "application/x-es-module, */*");
            // can set "authorization: true" to enable withCredentials only
            if (authorization) {
                if (typeof authorization == "string")
                    xhr.setRequestHeader("Authorization", authorization);
                xhr.withCredentials = true;
            }
        }

        xhr.send(null);
    });
}