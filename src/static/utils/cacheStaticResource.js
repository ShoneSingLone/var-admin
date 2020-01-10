import localforage from "localforage";

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

function sourceToCode(source) {
    (0, eval)(source);
}

export async function xhrFetchWithCache(url, authorization, integrity, asBuffer) {
    try {
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
        _.$$STORE = _.$$STORE || store;
        try {
            let _version = await store.getItem("VERSION" + STATIC_RES_VERSION);
            if (!_version) {
                await store.clear();
                await store.setItem("VERSION" + STATIC_RES_VERSION, "VERSION" + STATIC_RES_VERSION);
            }
        } catch (error) {
            throw new Error("Unable to get version");
        }
        let source = await store.getItem(id);
        if (!source) {
            source = await xhrRetch(url, authorization, integrity, asBuffer);
        }
        if (!source) {
            throw new Error("Unable to xhrFetchWithCache");
        }
        return source;
    } catch (error) {
        console.error(error);
    }

}

function xhrRetch(url, authorization, integrity, asBuffer) {
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