export default function (path) {
    const {
        _: {
            camelCase,
            last
        }
    } = window;

    /* 开发模式不缓存 */
    // const isDev = /localhost:80/g.test(location.href);
    const isDev = false;
    window.STATIC_RES_VERSION = isDev ? Date.now() : "202001101743";
    let id = camelCase(path).toLowerCase();
    /* 白名单，如果资源在白名单上，尽量缓存 */

    const whiteListKey = camelCase(last(path.split("/"))).toLowerCase();
    const handlerName = (~["systemjs", "babeltransformjs", "vue2611broswerjs", "transformjs"].indexOf(whiteListKey)) ? "cache" : "noCache";
    console.log("id:", id, "\ntarget:", whiteListKey, "\nhandlerName:", handlerName);
    return handler[handlerName](path, id);
}

const handler = {
    async cache(url, id, _opts) {
        const {
            _: {
                $idb: {
                    set,
                    get,
                    clear,
                    Store
                }
            }
        } = window;

        try {
            const STATIC_RES_STORE = window.STATIC_RES_STORE || new Store("STATIC_RES_DB", "STATIC_RES_STORE");
            let STATIC_RES_VERSION = await get("VERSION" + window.STATIC_RES_VERSION, STATIC_RES_STORE);
            if (!STATIC_RES_VERSION) {
                await clear(STATIC_RES_STORE);
                set("VERSION" + window.STATIC_RES_VERSION, "VERSION" + window.STATIC_RES_VERSION, STATIC_RES_STORE);
            }
            let source = await get(id, STATIC_RES_STORE);
            if (source) {
                sourceToCode(source);
                console.log("cache", url);
                return Promise.resolve();
            }
            source = await xhrFetch(url, _opts);
            if (source) {
                /* TODO:cache */
                await set(id, source, STATIC_RES_STORE);
                sourceToCode(source);
                return Promise.resolve();
            }
            throw new Error(`fetch ${url} error`);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    noCache(url, id, _opts) {
        const {
            _: {
                merge
            }
        } = window;

        return new Promise((resolve, reject) => {
            let ele = merge(document.createElement("script"), {
                id,
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
};

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