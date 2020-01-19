import camelCase from "lodash/camelCase";
import merge from "lodash/merge";
import localforage from "localforage";


const store_StaticResource = localforage.createInstance({
    name: window.APP_CONFIGS.cache.staticName
});

/* 加载mian.js意味需要重新缓存数据，checkResourceCache调用用来检查静态资源 */
export async function checkResourceCache(exclude, _) {
    /* 全局单例用于存储大体积静态资源的Store */
    _.$$STORE = store_StaticResource;
    _.$$STORE.setCache = async (url, source) => await store_StaticResource.setItem(_.$getIDFromURL(url), source);;
    _.$$STORE.getCache = async url => await store_StaticResource.getItem(_.$getIDFromURL(url));
    let _version = await store_StaticResource.getItem("VERSION");
    /* 版本号不相同，需要更新，清除版本号， */
    if (String(_version) !== String(window.APP_CONFIGS.STATIC_RES_VERSION)) {
        /* TODO: 按exclude清除缓存*/
        await store_StaticResource.clear();
        await store_StaticResource.setItem("VERSION", window.APP_CONFIGS.STATIC_RES_VERSION);
        setTimeout(async () => {
            try {
                const getMainScript = await xhrFetchWithCache(_.$resolvePath("static/js/main.js"));
                await store_StaticResource.setItem("staticjsmainjs", getMainScript);
            } catch (error) {
                console.log(error);
            }
        }, 1000);
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
    return window._.$$STORE
        .getCache(url)
        .then(function (res) {
            /* TODO:cache */
            if (res) {
                return Promise.resolve(res);
            } else {
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
                        window
                            ._.$$STORE
                            .setCache(url, source)
                            .then(function () {
                                return resolve(source);
                            })
                            .catch(function (error) {
                                console.error(error);
                            });
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
        });



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