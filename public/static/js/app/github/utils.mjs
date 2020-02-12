export default (() => {
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
    return "done";
})();