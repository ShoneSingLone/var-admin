const {
    _: {
        $loadJS,
        $resolvePath,
        $lazyLoadComponent,
        merge,
        $axios
    },
    IS_DEV,
    LAZY_LOADER
} = window;

export default async (stopLoadingAnimation) => {
    try {
        /* $loadJS($resolvePath())加载的代码不经过systemjs转码 */
        await $loadJS($resolvePath("static/lib/vue-2.6.11.broswer.js"));
        /* 获取完整lodash */
        await $loadJS($resolvePath("static/lib/lodash-4.17.11.js"));
        window._ = merge(window._.noConflict(), window._);
        await LAZY_LOADER.antdv();
        // await $loadJS($resolvePath("static/lib/bundle/antdv.bundle.js"));
        const {
            Vue
        } = window;
        Vue.prototype.$http = $axios;

        new Vue({
            el: "#app",
            components: {
                appvue: $lazyLoadComponent($resolvePath("static/module/login/Login.vue"))
            },
            data: () => ({
                currentComponent: "appvue"
            }),
            mounted() {
                stopLoadingAnimation();
            },
        });
    } catch (error) {
        console.error(error);
    }
};