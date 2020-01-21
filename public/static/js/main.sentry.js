window
    .APP_CONFIGS = {
        start: Date.now(),
        cache: {
            staticName: "STATIC_RES_DB",
            staticNameTranslated: "STATIC_RES_DB_TRANSLATED",
            staticNameVersion: "STATIC_RES_DB_VERSION",
            /* 是否缓存所有能缓存的静态资源 */
            isCacheAll: true
        },
        /* IE加载在线转译代码 */
        IS_OLD_BROWSER: (typeof fetch === "undefined"),
        /* 开发模式不缓存静态资源 */
        IS_DEV: /localhost:80/g.test(window.location.href),
        /* 版本号不一致就从remote更新 .vue之类的资源 */
        STATIC_RES_VERSION: /localhost:80/g.test(window.location.href) ? Date.now() : "202001195020",
        resource: {
            /* 重置版本号后不需要更新的资源，第三方库，size相对较大且不容易变化 */
            exclude: {
                "staticjsmainjs": "202001195029",
                // "staticjsvueantdvmjs": "202001204708",
                "staticlibantdvantdminjs": "202001195029",
                "staticliblessminjs": "202001195029",
                "staticliblodash41711js": "202001195029",
                "staticlibsystemjsbabeltransformjs": "202001195029",
                "staticlibsystemjsextrastransformjs": "202001195029",
                "staticlibsystemjssystemjs": "202001195029",
                "staticlibvue2611broswerjs": "202001195029",
                "staticlibvuexesmbrowserjs": "202001195029",
                "staticlibvuerouteresmbrowserjs": "202001195029"
            }
        }
    };

/* for test 用Chrome跑IE代码,方便调试 */
// window.APP_CONFIGS.IS_OLD_BROWSER = true;
/* 开发模式缓存静态资源 */
window.APP_CONFIGS.STATIC_RES_VERSION = "202001195020";
/* 测试缓存策略 */
// window.APP_CONFIGS.IS_DEV = false;
/* 不缓存任何一个资源并且全部使用正常的fetch和script加载方式 */
// window.APP_CONFIGS.cache.isCacheAll = false;


(function () {
    var transaction, store;
    var MAIN_SCRIPT_ID = "staticjsmainjs";

    function idbOK() {
        return "indexedDB" in window;
    }
    if (!idbOK()) {
        alert("不支持IE11以下版本");
        /* 跳转提示页面 */
    }
    var openRequest = indexedDB.open(window.APP_CONFIGS.cache.staticName);
    openRequest.onupgradeneeded = function (e) {
        console.log("running onupgradeneeded");
    };

    openRequest.onsuccess = openRequestSuccess;
    openRequest.onerror = handleError;

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
            var getMainScript = store.get(MAIN_SCRIPT_ID);
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
                handleError(error);
            }
            closeIndexedDB();
        } else {
            loadMainScript();
        }
    }

    function handleError(e) {
        console.error(e);
        debugger;
        window.location.reload();
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