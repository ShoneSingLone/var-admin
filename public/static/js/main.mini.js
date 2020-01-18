window
    .APP_CONFIGS = {
        IS_OLD_BROWSER: (function () {
            /* for test 用Chrome跑IE代码 */
            // return true;
            return (typeof fetch === "undefined");
        })(),
        /* 开发模式不缓存静态资源 */
        IS_DEV: (function () {
            return false;
            // return /localhost:80/g.test(window.location.href);
        })(),
        STATIC_RES_VERSION: (function () {
            /* 开发模式不缓存静态资源 */
            return Date.now();
            // return "202001173409";
        })(),
        resource: {
            /* 重置版本号后不需要更新的资源 */
            exclude: {
                "babeltransformjs": "2020_1_18_13_59_49",
                "systemjs": "2020_1_18_13_59_49",
                "systemsrcjs": "2020_1_18_13_59_49",
                "systemjsbabelbrowserjs": "2020_1_18_13_59_49",
                "babeltransformjs": "2020_1_18_13_59_49",
                "vue2611broswerjs": "2020_1_18_13_59_49",
                "antdminjs": "2020_1_18_13_59_49",
                "lodash41711js": "2020_1_18_13_59_49",
                "transformjs": "2020_1_18_13_59_49",
                "lessminjs": "2020_1_18_13_59_49"
            }
        }
    };




(function () {
    var transaction, store;

    function idbOK() {
        return "indexedDB" in window;
    }

    if (!idbOK()) {
        alert("不支持IE11以下版本");
        /* 跳转提示页面 */
    }

    var openRequest = indexedDB.open("STATIC_RES_DB");
    openRequest.onupgradeneeded = function (e) {
        console.log("running onupgradeneeded");
    };

    openRequest.onsuccess = openRequestSuccess;
    openRequest.onerror = handleError;
    debugger;

    function openRequestSuccess(e) {
        try {
            var db = e.target.result;
            transaction = db.transaction(["keyvaluepairs"], "readonly");
            store = transaction.objectStore("keyvaluepairs");
            var getVersion = store.get("VERSION");
            getVersion.onsuccess = handleGetVersionSuccess;
            getVersion.onerror = handleError;
        } catch (error) {
            loadMainScript();
            console.error(error);
        }
    };

    function handleGetVersionSuccess(e) {
        var version = e.target.result;
        if (version === window.APP_CONFIGS.STATIC_RES_VERSION) {
            var getMainScript = store.get("mainjs");
            getMainScript.onsuccess = handleGetMainScriptSuccess;
            getMainScript.onerror = handleError;
        } else {
            loadMainScript();
        }
    }

    function handleGetMainScriptSuccess(e) {
        var mainJSScriptString = e.target.result;
        if (mainJSScriptString) {
            try {
                (0, eval)(mainJSScriptString);
            } catch (error) {
                console.log(error);
            }
            closeIndexedDB();
        } else {
            loadMainScript();
        }
    }

    function handleError(e) {
        console.log("Error", e);
    };

    function closeIndexedDB() {
        openRequest.result.close();
        console.log("IndexedDB closed");
    };

    function loadMainScript(e) {
        var mainjsScriptEle = document.createElement("script");
        mainjsScriptEle.id = "script-main";
        mainjsScriptEle.src = getBaseURL() + "static/js/main.js";
        document.body.appendChild(mainjsScriptEle);
        closeIndexedDB();
    };

    function getBaseURL() {
        var jsPath = document.currentScript ? document.currentScript.src : function () {
            var js = document.scripts,
                last = js.length - 1,
                src;
            for (var i = last; i > 0; i--) {
                if (js[i].readyState === "interactive") {
                    src = js[i].src;
                    break;
                }
            }
            return src || js[last].src;
        }();
        return jsPath.substring(0, jsPath.lastIndexOf("static/js/main.mini.js")) || "/";
    }
})();