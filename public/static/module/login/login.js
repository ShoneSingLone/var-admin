const {
    _: {
        $loadJS,
        $resolvePath,
        $lazyLoadComponent,
        merge
    },
    IS_DEV
} = window;
export default async (stopLoadingAnimation) => {
    try {
        await $loadJS($resolvePath("static/lib/vue-2.6.11.broswer.js"));
        /* 获取完整lodash */
        await $loadJS($resolvePath("static/lib/lodash-4.17.11.js"));
        window._ = merge(window._.noConflict(), window._);
        const {
            Vue
        } = window;
        await $loadJS($resolvePath("static/lib/bundle/antdv.bundle.js"));
        console.log(Vue.ANT_D_V_COMPONENTS, window._.forEach);
        new Vue({
            el: "#app",
            components: {
                appvue: $lazyLoadComponent($resolvePath("static/module/login/Login.vue"))
            },
            data: () => ({
                currentComponent: "appvue"
            }),
            mounted() {
                this.currentComponent = "appvue";
                stopLoadingAnimation();
            },
        });
    } catch (error) {
        console.error(error);
    }
};