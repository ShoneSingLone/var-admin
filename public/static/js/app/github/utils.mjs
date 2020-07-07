const {
    _: {
        $loadJS,
        $resolvePath
    }
} = window;

function addLoderHandler() {
    const jsCollection = {};
    const pathMap = {
        /* key 与三方库暴露的访问器名字相同*/
        $: "static/lib/jquery/jquery-3.4.1.min.js",
        dayjs: "static/lib/dayjs.min.js",
        Cookies: "static/lib/js-cookie-2.2.0/js-cookie.js",
        less: "static/lib/less.js"
    };
    /*懒加载第三方库，accessID是第三方库暴露的访问器名字比如 jQuery=》$ 需要在在pathMap里面预先配置加载地址*/
    window.loadLibById = (accessId) => {
        if (jsCollection[accessId]) {
            return Promise.resolve(window[accessId]);
        } else {
            const jsPath = $resolvePath(pathMap[accessId]);
            return new Promise((resolve, reject) => {
                $loadJS(jsPath).then(() => {
                    if (window[accessId]) {
                        jsCollection[accessId] = true;
                        resolve(window[accessId]);
                    } else {
                        reject("?????");
                    }
                }).catch(reject);
            });
        }
    };
}

function addLocalStorageHandler() {
    const deps = {};
    window._.$ls = {
        _deps: deps,
        get(key) {
            return (function (valWithStampObjString) {
                if (valWithStampObjString) {
                    return JSON.parse(valWithStampObjString).val;
                } else {
                    return "";
                }
            })(localStorage[key]);
        },
        set(key, val) {
            try {
                localStorage[key] = JSON.stringify({
                    val,
                    stamp: Date.now()
                });
            } catch (error) {
                console.error(`${key}'s value invalid`);
            }
        },
        watch(key, fn) {
            deps[key] = (function (dep) {
                if (!dep) {
                    dep = {
                        length: 0
                    };
                    Object.defineProperty(dep, "length", {
                        enumerable: false,
                    });
                }
                return dep;
            })(deps[key]);
            let index = deps[key].length++;
            deps[key][index] = fn;
            return index;
        },
        unwatch(key, index) {
            delete deps[key][index];
        }
    };

    window.addEventListener("storage", ({
        key,
        newValue,
        oldValue
    }) => {
        let dep = deps[key];
        if (dep) {
            for (const key in dep) {
                if (dep.hasOwnProperty(key)) {
                    dep[key] && dep[key](newValue, oldValue);
                }
            }

        }
    });
}

export function initUtiles() {
    addLocalStorageHandler();
    addLoderHandler();
    window._.$loadLibById = window.loadLibById;
    debugger;
};