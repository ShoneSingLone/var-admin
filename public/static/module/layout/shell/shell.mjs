import setDefaultVueAntdvJS from "@@/static/js/vue-element.mjs";
import LoadingView from "@@/static/components/LoadingView.vue";
import {
    shellState
} from "@@/static/js/app/github/state/index.mjs";

(async () => {
    try {
        const Vue = await setDefaultVueAntdvJS();
        const APP_STATE = window.APP_STATE = Vue.observable(shellState);
        const {
            _,
        } = window;
        const {
            $loadCSS,
            $resolvePath,
            $loadLess,
            $lazyLoadComponent,
            $md5: md5,
            merge,
            camelCase,
            $getIDFromURL,
            $loadComponentByURL
        } = _;

        $loadCSS($resolvePath("static/module/layout/shell/shell.css"));

        Vue.component("LoadingView", LoadingView);
        window.app = new Vue({
            data() {
                return {
                    APP_STATE,
                    componentName: "LoadingView"
                };
            },
            watch: {
                APP_STATE: {
                    deep: true,
                    handler(newValue, oldValue) {
                        console.log(newValue, oldValue);
                    }
                }
            },
            methods: {
                async loadStyle() {
                    try {
                        await $loadLess($resolvePath(`static/module/layout/shell/Shell.less`));
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
            async mounted() {
                const shellComponent = await $loadComponentByURL("static/module/layout/shell/Shell.vue");
                this.componentName = shellComponent;
                this.loadStyle()
            },
            template: "<div :is=\"componentName\">waiting import</div>"
        }).$mount("#app");
    } catch (error) {
        console.error(error);
    }
})();