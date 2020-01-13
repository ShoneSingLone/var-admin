import camelCase from "lodash/camelCase";
import merge from "lodash/merge";
import last from "lodash/last";
import localforage from "localforage";


function sourceToCode(source) {
    (0, eval)(source);
}

function isCache(url) {
    /* 白名单，如果资源在白名单上，缓存 */
    let whiteListMap = {
        "systemjs": true,
        "systemsrcjs": true,
        "systemjsbabelbrowserjs": true,
        "babeltransformjs": true,
        "vue2611broswerjs": true,
        "transformjs": true,
        "lessminjs": true,
    };
    // whiteList = [];
    const whiteListKey = camelCase(last(url.split("/"))).toLowerCase();
    const _isCache = Boolean(whiteListMap[whiteListKey]);
    console.log(`cache ${whiteListKey}?  ${_isCache}`);
    return (_isCache);
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

const store = localforage.createInstance({
    name: "STATIC_RES_DB"
});

export async function cacheStaticResourceAndToCode(url, _opts) {
    try {
        let source = await xhrFetchWithCache(url);
        if (source) {
            return sourceToCode(source);
        }
        throw new Error("Unable to cacheStaticResourceAndToCode");
    } catch (error) {
        console.error(error);
    }
}

export async function xhrFetchWithCache(url, authorization, integrity, asBuffer) {
    try {
        const {
            _,
            APP_CONFIGS: {
                /* index.js */
                STATIC_RES_VERSION
            }
        } = window;
        const {
            camelCase
        } = _;
        let id = camelCase(url).toLowerCase();

        let source = "";

        /* 全局单例用于存储大体积静态资源的Store */
        _.$$STORE = _.$$STORE || store;
        const _isCache = isCache(url);
        if (_isCache) {
            try {
                let _version = await store.getItem("VERSION");
                /* 版本号不相同，需要更新，清除版本号， */
                if (String(_version) !== String(STATIC_RES_VERSION)) {
                    await store.clear();
                    await store.setItem("VERSION", STATIC_RES_VERSION);
                }
                source = await store.getItem(id);
            } catch (error) {
                throw new Error("Unable to get version");
            }
        }
        if (!source) {
            source = await xhrFetch(url, authorization, integrity, asBuffer);
        }
        if (source && _isCache) {
            await store.setItem(id, source);
        } else if (!source) {
            throw new Error("Unable to xhrFetchWithCache");
        }
        return source;
    } catch (error) {
        console.error(error);
    }

}


/* XMLHttpRequest兼容获取 source string */
function xhrFetch(url, authorization, integrity, asBuffer) {
    return new Promise(function (resolve, reject) {
        // percent encode just "#" for HTTP requests
        url = url.replace(/#/g, "%23");

        var xhr = new XMLHttpRequest();
        if (asBuffer)
            xhr.responseType = "arraybuffer";

        function load() {
            var source = (asBuffer ? xhr.response : xhr.responseText);
            if (url.slice(-4) === ".vue") {
                source = window._.$VueLoader(url, source);
            }
            resolve(source);
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


export default function loadJS(url) {
    return (isCache(url) ? cacheStaticResourceAndToCode(url) : loadJSByAddScriptElement(url))
        .then(function (res) {
            console.log("loaded", url);
        })
        .catch(function (error) {
            console.error(error);
        });
}