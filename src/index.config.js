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