import camelCase from "lodash/camelCase";
import merge from "lodash/merge";
import localforage from "localforage";
import {
    getIDFromURL
} from "./resolvePath";



function handleProgress(e) {
    var {
        loaded,
        total
    } = e;

    if (total > 0) {
        var progress = (loaded / total) * 100;
        console.log(`${getIDFromURL(e.target.responseURL)}progress: ${progress}`);
    }
};
/* 缓存fetch之后的静态资源 */
const store_src = localforage.createInstance({
    name: window.APP_CONFIGS.cache.staticName
});
/* 缓存systemjs translated 的静态资源 */
const store_src_translated = localforage.createInstance({
    name: window.APP_CONFIGS.cache.staticNameTranslated
});
/* 缓存白名单上的静态资源 */
const store_src_version = localforage.createInstance({
    name: window.APP_CONFIGS.cache.staticNameVersion
});

(async () => {
    if (!window.APP_CONFIGS.cache.isCacheAll) {
        console.time("clear cache");
        await Promise.all([
            await store_src.clear(),
            await store_src_translated.clear(),
            await store_src_version.clear()
        ]);
        console.timeEnd("clear cache");
    }
})();
/* 加载mian.js意味需要重新缓存数据，checkResourceCache调用用来检查静态资源 */
export async function checkResourceCache(exclude = {}, _) {
    console.time("checkResourceCache");
    /* 缓存白名单上的静态资源 */
    _.$$STORE_V = store_src_version;
    _.$$STORE_V.setCache = async (url, source) => await store_src_version.setItem(_.$getIDFromURL(url), source);
    _.$$STORE_V.getCache = async url => await store_src_version.getItem(_.$getIDFromURL(url));

    /* 缓存fetch之后的静态资源 */
    _.$$STORE = store_src;

    _.$$STORE.setCache = async (url, source) => await store_src.setItem(_.$getIDFromURL(url), source);
    _.$$STORE.getCache = async url => await store_src.getItem(_.$getIDFromURL(url));

    /* 缓存systemjs translated 的静态资源 */
    _.$$STORE_T = store_src_translated;
    _.$$STORE_T.setCache = async (url, source) => await store_src_translated.setItem(_.$getIDFromURL(url), source);
    _.$$STORE_T.getCache = async url => await store_src_translated.getItem(_.$getIDFromURL(url));

    let _version = await store_src.getItem("VERSION");
    /* 版本号不相同，需要更新，清除版本号， */

    async function clear(store, exclude) {
        const keys = await store.keys();

        return Promise
            .all(keys
                /* 不相同的就清除 */
                .filter((srcID) => !exclude[srcID])
                .map(async (srcID) => await store.removeItem(srcID))
            );
    }
    if (String(_version) !== String(window.APP_CONFIGS.STATIC_RES_VERSION)) {
        console.log("_version", _version);
        let oldExclude = await store_src.getItem("EXCLUDE");

        if (_.isObject(oldExclude)) {
            const newExclude = {};
            /* 过滤出相同的 */
            _.forIn(exclude, (version, srcID) => {
                if (String(oldExclude[srcID]) === String(version)) {
                    newExclude[srcID] = true;
                }
            });

            await Promise.all([
                await clear(store_src, newExclude),
                await clear(store_src_translated, newExclude)
            ]);
        }

        await Promise.all([
            await store_src.setItem("EXCLUDE", exclude),
            await store_src.setItem("VERSION", window.APP_CONFIGS.STATIC_RES_VERSION)
        ]);

        setTimeout(async () => {
            const {
                APP_CONFIGS
            } = window;
            const {
                PATH_PREFIX
            } = APP_CONFIGS;

            console.timeEnd("checkResourceCache");
            try {
                const getMainScript = await xhrFetchWithCache(_.$resolvePath(PATH_PREFIX + "/js/main.js"));
                await store_src.setItem("staticjsmainjs", getMainScript);
            } catch (error) {
                console.log(error);
            }
        }, 1000);
    } else {
        console.timeEnd("checkResourceCache");
    }
}


function sourceToCode(source) {
    try {
        (0, eval)(source);
    } catch (error) {
        console.error(error);
    }
}

function shouldCache(url) {

    return window.APP_CONFIGS.cache.isCacheAll;
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

    /* 
    console.log("url", url);


    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();

        // report progress events
        req.addEventListener("error", event=>reject(event), false);
        req.addEventListener("progress", handleProgress, false);
        // load responseText into a new script element
        req.addEventListener("load", function (event) {
            debugger;
            var e = event.target;
            var s = document.createElement("script");
            s.innerHTML = e.responseText;
            document.documentElement.appendChild(s);
            s.addEventListener("load", function () {
                resolve();
            });
        }, false);
        req.open("GET", url);
        req.send();
    });
 */}



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
            source = await store_src.getItem(id);
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
    const canCache = !!(window._ && window._.$$STORE && window._.$$STORE.getCache);

    function cacheOrNotBy(shouldCache) {
        console.log("xhrFetch", window._.$getIDFromURL(url));
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

                if (shouldCache) {
                    return window
                        ._.$$STORE
                        .setCache(url, source)
                        .then(function () {
                            return resolve(source);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                } else {
                    return resolve(source);
                }
            }

            function error() {
                reject(new Error("XHR error: " + (xhr.status ? " (" + xhr.status + (xhr.statusText ? " " + xhr.statusText : "") + ")" : "") + " loading " + url));
            }

            xhr.onprogress = e=>{
                handleProgress(e);
            };

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

    if (!canCache) {
        return cacheOrNotBy(canCache);
    } else {
        return window._.$$STORE.getCache(url)
            .then(function (res) {
                /* TODO:cache */
                if (res) {
                    return Promise.resolve(res);
                } else {
                    return cacheOrNotBy(canCache);
                }
            });
    }
}

const LOADED_JS = {};
export function loadJS(url) {
    if (LOADED_JS[camelCase(url).toLowerCase()]) return Promise.resolve();
    return (shouldCache(url) ? cacheStaticResourceAndToCode(url) : loadJSByAddScriptElement(url))
        .then(function (res) {
            LOADED_JS[camelCase(url).toLowerCase()] = true;
        })
        .catch(function (error) {
            console.error(error);
        });
}