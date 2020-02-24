import setDefaultVueAntdvJS from "../../../js/vue-antdv.mjs";
(async () => {
    try {
        const Vue = await setDefaultVueAntdvJS();
        const {
            _,
        } = window;
        const {
            $loadCSS,
            $resolvePath,
            $lazyLoadComponent,
            $md5: md5,
            merge,
            camelCase,
            $getIDFromURL,
            $loadComponentByURL
        } = _;

        $loadCSS($resolvePath("static/module/layout/shell/shell.css"));

        const APP_STATE = Vue.observable({
            count: 0
        });
        window.APP_STATE = APP_STATE;
        const app = new Vue({
            data() {
                return {
                    componentName: "div"
                };
            },
            async mounted() {
                this.componentName = await $loadComponentByURL("static/module/layout/shell/Shell.vue");
            },
            template: "<div :is=\"componentName\">waiting import</div>"
        }).$mount("#app");
    } catch (error) {
        console.error(error);
    }
})();