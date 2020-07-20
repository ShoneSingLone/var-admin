const {
    _: {
        merge,
        $loadJS,
        $resolvePath,
        $axios,
        $getIDFromURL,
        $xhrFetchWithCache
    },
    $system
} = window;

export default async () => {

    /* $loadJS($resolvePath())加载的代码不经过systemjs转码 */
    await $loadJS($resolvePath("static/lib/vue-2.6.11.broswer.js"));
    /* 获取完整lodash */
    await Promise.all([
        await $loadJS($resolvePath("static/lib/lodash-4.17.11.js"))
            .then(function () {
                /* 之前的lodash值加入必要的工具，这是完整的 */
                window._ = merge(window._.noConflict(), window._);
                window._.$arrayTreeFilter = function arrayTreeFilter(
                    arr, selectedKey, options) {
                    /* 默认是根据name属性 */
                    var itemValueName = (options && options.itemValueName) || "name";
                    /* 透明性 数据都是基本类型 */
                    var _arr = JSON.parse(JSON.stringify(arr));
                    var targetArray = [];
                    window._.each(_arr, function (item) {
                        var resArray = [];
                        if (~item[itemValueName].indexOf(selectedKey)) {
                            return targetArray.push(item);
                        } else if (item.children) {
                            resArray = arrayTreeFilter(item.children, selectedKey, options);
                            if (resArray.length > 0) {
                                item.children = resArray;
                                return targetArray.push(item);
                            }
                        }
                    });
                    return targetArray;
                };
                /*
                 * Vue 特有 全局component
                 * @return VueComponent
                 */

                window._.$loadComponentByURL = async url => {
                    try {
                        url = $resolvePath(url);
                        const id = $getIDFromURL(url);
                        if (window.Vue.component(id)) return id;
                        const {
                            default: component
                        } = await $system.import(url);
                        component.name = id;
                        window.Vue.component(id, component);
                        return component;
                    } catch (error) {
                        console.error(error);
                        console.log(`相关url: ${url}`);
                    }
                };
            })
    ]);
    /**/
    let LESS_GLOBAL_VAR = false;
    let GLOBAL_VAR_URL = "static/style/less/val.less";
    window._.$loadLess = async url => {
        url = $resolvePath(url);
        return new Promise((resolve, reject) => {
            Promise.all([
                LESS_GLOBAL_VAR ? Promise.resolve(LESS_GLOBAL_VAR) : $xhrFetchWithCache(GLOBAL_VAR_URL),
                $xhrFetchWithCache(url), loadLibById("less")
            ])
                .then(([globalVar, contents, less]) => {
                    if (!LESS_GLOBAL_VAR && globalVar) {
                        LESS_GLOBAL_VAR = globalVar;
                        /* GC */
                        GLOBAL_VAR_URL = null;
                    }
                    less.urlPrefix = url.substring(0, url.lastIndexOf("/"));
                    return less.render(`${LESS_GLOBAL_VAR}\n${contents}`);
                })
                .then(({css}) => {
                    var styleEle = document.createElement("style");
                    styleEle.innerHTML = css;
                    styleEle.id = $getIDFromURL(url);
                    document.body.appendChild(styleEle);
                    resolve(css);
                })
                .catch(error => reject(error));
        });
    };

    /*  */
    let res = await Promise.all([
        await $loadJS($resolvePath("static/lib/element/index.js"))
            .then(() => Promise.all([
                $loadJS($resolvePath("static/lib/vue-i18n-8.1.0/vue-i18n.min.js")),
                $system.import($resolvePath("static/js/app/github/i18n.zh-cn.mjs"))
            ]))
            .then((res) => {
                const {
                    Vue,
                    VueI18n,
                    ELEMENT,
                    _
                } = window;
                let i18n = {
                    locale: "zh-CN",
                    messages: {
                        "zh-CN": {
                            "_lang": "简体中文"
                        }
                    }
                };
                if (_.isArray(res) && res.length === 2 && _.isObject(res[1])) {
                    i18n = {
                        locale: "zh-CN",
                        messages: {
                            "zh-CN": _.merge({
                                "_lang": "简体中文"
                            }, res[1].default)
                        }
                    };
                }

                /* 多国语言 */
                const vuei18n = new VueI18n(i18n);
                Vue.prototype.$t = vuei18n.t.bind(vuei18n);
                Vue.use(ELEMENT, {
                    size: "mini",
                    zIndex: 3000,
                    i18n: (key, value) => vuei18n.t(key, value)
                });
                console.log(Vue.prototype.$ELEMENT);
            }),
        /* js媒体查询库 https://wicky.nillia.ms/enquire.js/ */
        await $loadJS($resolvePath("static/lib/enquire.min.js")),
        await(async () => {
            const {
                setAxiosInterceptors,
                loadLibById /* the same as window.loadLibById */
            } = await $system.import($resolvePath("static/js/app/github/http-axios.mjs"));
            const Cookies = await loadLibById("Cookies");
            await setAxiosInterceptors(window._.$axios, window._, Cookies);
            return Promise.resolve();
        })(),
        /* localStorage */
        await(() => {
            try {
                /* URL & URLSearchParams */
                if (URLSearchParams) {
                    return Promise.resolve();
                }
            } catch (error) {
                return $loadJS($resolvePath("static/js/polyfill/api/url-polyfill.js"));
            }
        })()
    ]);
    console.log("res", res);
    /* axios 拦截配置 */
    /* message使用ant-design */
    window.Vue.prototype.$http = $axios;
    window.Vue.prototype.$http.newtab = (url) => {
        window.open(url, "_blank");
    };
    return Promise.resolve(window.Vue);
}
;