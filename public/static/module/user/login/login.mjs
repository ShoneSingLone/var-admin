import setDefaultVueAntdvJS from "@@/static/js/vue-antdv.mjs";

(async () => {
    try {
        const Vue = await setDefaultVueAntdvJS();
        const {
            _
        } = window;
        const {
            $loadCSS,
            $resolvePath,
            $lazyLoadComponent,
            $md5: md5,
            merge
        } = _;

        $loadCSS($resolvePath("static/css/css.css"));
        const APP_STATE = Vue.observable({
            count: 0
        });

        window.APP_STATE = APP_STATE;
        const app = new Vue({
            components: {
                app: $lazyLoadComponent($resolvePath("static/module/user/login/Login.vue"))
            },
            template: "<app/>"
        }).$mount("#app");
    } catch (error) {
        console.error(error);
    }
})();