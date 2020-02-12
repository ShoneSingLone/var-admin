const {
    _: {
        $loadJS,
        $resolvePath,
        merge,
        $axios,
        $getIDFromURL
    },
    $system
} = window;

export default async () => {
    /* $loadJS($resolvePath())加载的代码不经过systemjs转码 */
    await $loadJS($resolvePath("static/lib/vue-2.6.11.broswer.js"));
    /* 获取完整lodash */
    await Promise.all([await $loadJS($resolvePath("static/lib/lodash-4.17.11.js"))
        .then(function () {
            window._ = merge(window._.noConflict(), window._);
            /* Vue 特有 */
            /* @return id */
            window._.$loadComponentByURL = async url => {
                url = $resolvePath(url);
                const {
                    default: app
                } = await $system.import(url);
                const id = $getIDFromURL(url);
                app.name = id;
                window.Vue.component(id, app);
                return id;
            };
            /* localStorage */
        })
    ]);
    /*  */
    await Promise.all([
        await $loadJS($resolvePath("static/lib/antdv/antd.min.js")),
        await $loadJS($resolvePath("static/lib/enquire.min.js")),
        await $loadJS($resolvePath("static/js/app/github/http-axios.js")),
        await $system.import($resolvePath("static/js/app/github/utils.mjs")),
        await (() => {
            try {
                /* URL & URLSearchParams*/
                if (URLSearchParams) {
                    return Promise.resolve();
                }
            } catch (error) {
                return $loadJS($resolvePath("static/js/polyfill/api/url-polyfill.js"));
            }
        })()
    ]);
    /* axios 拦截配置 */

    /* message使用ant-design */
    window.Vue.prototype.$http = $axios;
    window.Vue.prototype.$http.newtab = (url) => {
        window.open(url, "_blank");
    };
    return Promise.resolve(window.Vue);
};