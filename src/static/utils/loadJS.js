import camelCase from "lodash/camelCase";
import merge from "lodash/merge";
import localforage from "localforage";


const store_StaticResource = localforage.createInstance({
    name: "STATIC_RES_DB"
});

/* 加载mian.js意味需要重新缓存数据，checkResourceCache调用用来检查静态资源 */
export async function checkResourceCache(STATIC_RES_VERSION, _) {
    /* 全局单例用于存储大体积静态资源的Store */
    _.$$STORE = store_StaticResource;
    _.$$STORE.setCache = async (url, source) => await store_StaticResource.setItem(_.$getIDFromURL(url), source);;
    _.$$STORE.getCache = async url => await store_StaticResource.getItem(_.$getIDFromURL(url));

    let _version = await store_StaticResource.getItem("VERSION");
    /* 版本号不相同，需要更新，清除版本号， */
    if (String(_version) !== String(STATIC_RES_VERSION)) {
        debugger;
        await store_StaticResource.clear();
        await store_StaticResource.setItem("VERSION", STATIC_RES_VERSION);
        const getMainScript = await xhrFetchWithCache(_.$resolvePath("static/js/main.js"));
        setTimeout(async () => {
            try {
                await store_StaticResource.setItem("mainjs", getMainScript);
            } catch (error) {
                console.log(error);
            }
        }, 1000);
    }
}

function sourceToCode(source) {
    /*  */
    (0, eval)(source);
}

function shouldCache(url) {
    /* 白名单，如果资源在白名单上，缓存 */
    const {
        APP_CONFIGS: {
            resource: {
                exclude: whiteListMap
            }
        }
    } = window;
    const whiteListKey = _.$getIDFromURL(url);
    const _shouldCache = Boolean(whiteListMap[whiteListKey]);
    console.log(`should cache {${whiteListKey}}?  ${_shouldCache}`);
    return true;
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
            _
        } = window;
        const {
            camelCase,
        } = _;

        let id = camelCase(url).toLowerCase();
        let source = "";
        const _shouldCache = shouldCache(url);
        if (_shouldCache) {
            source = await store_StaticResource.getItem(id);
        }
        if (!source) {
            source = await xhrFetch(url, authorization, integrity, asBuffer);
        }
        if (!source) {
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
        xhr.open("GET", `${url}?_t=${Date.now()}`, true);

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

const LoadedJS = {};
export function loadJS(url) {
    if (LoadedJS[camelCase(url).toLowerCase()]) return Promise.resolve();
    return (shouldCache(url) ? cacheStaticResourceAndToCode(url) : loadJSByAddScriptElement(url))
        .then(function (res) {
            LoadedJS[camelCase(url).toLowerCase()] = true;
            console.log("loaded", url);
        })
        .catch(function (error) {
            console.error(error);
        });
}