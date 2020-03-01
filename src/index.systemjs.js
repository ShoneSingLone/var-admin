export default async (eleMain) => {
    try {
        const {
            _,
            APP_CONFIGS
        } = window;
        const {
            PATH_PREFIX
        } = APP_CONFIGS;
        const {
            $checkResourceCache: checkResourceCache,
            $resolvePath: resolvePath,
            $loadJS: loadJS,
            $stopLoadingAnimation: stopLoadingAnimation
        } = _;
        /* 根据策略清除缓存 */
        await checkResourceCache(window.APP_CONFIGS.resource.exclude, _);
        /* 加载JS */
        const systemjsMap = {
            "vue-router": resolvePath(`${PATH_PREFIX}/lib/vue-router.esm.browser.js`),
            "vuex": resolvePath(`${PATH_PREFIX}/lib/vuex.esm.browser.js`)
        };

        if (window.APP_CONFIGS.IS_OLD_BROWSER) {
            await loadJS(resolvePath(`${PATH_PREFIX}/lib/systemjs/system.src.js`));
            await loadJS(resolvePath(`${PATH_PREFIX}/lib/systemjs/extras/transform.js`));
            await loadJS(resolvePath(`${PATH_PREFIX}/lib/systemjs/babel-transform.js`));
            // await loadJS("https://unpkg.com/@ventose/var@0.0.1/static/lib/systemjs/babel-transform.js");
            const {
                SystemJS
            } = window;

            SystemJS.config({
                map: {
                    ...systemjsMap,
                    "plugin-babel": resolvePath(`${PATH_PREFIX}/lib/plugin-babel.js`),
                    "systemjs-babel-build": resolvePath(`${PATH_PREFIX}/lib/systemjs-babel-browser.js`)
                },
                transpiler: "plugin-babel"
            });
        } else {
            await loadJS(resolvePath(`${PATH_PREFIX}/lib/systemjs/system.js`));
            window.SYSTEM_IMPORT_MAP_IMPORTS = {
                imports: {
                    ...systemjsMap,
                }
            };
            await Promise.all([
                await loadJS(resolvePath(`${PATH_PREFIX}/lib/systemjs/extras/transform.js`)),
                await loadJS(resolvePath(`${PATH_PREFIX}/lib/systemjs/babel-transform.js`))
            ]);
        }
        // await loadJS(resolvePath(`${PATH_PREFIX}/lib/less.min.js`));
        /* 基础的JS加载完毕之后加载entryjs */
        if (eleMain && eleMain.dataset && eleMain.dataset.entry) {
            window.$system = window[window.APP_CONFIGS.IS_OLD_BROWSER ? "SystemJS" : "System"];
            window.$system.import(resolvePath(eleMain.dataset.entry))
                .then(stopLoadingAnimation)
                .catch(console.error.bind(console))
                /* stopLoadingAnimation调用之后会stopLoadingAnimation=null */
                .finally(() => setTimeout(() => stopLoadingAnimation && stopLoadingAnimation(), 10 * 1000));
        }
    } catch (error) {
        console.log(error);
    }
};