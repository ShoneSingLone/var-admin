import setDefaultVueAntdvJS from "@@/static/js/vue-element.mjs";
import LoadingView from "@@/static/components/LoadingView.vue";
import VarContainer from "@@/static/components/VarRouter/container/VarContainer.vue";
import VarChild from "@@/static/components/VarRouter/container/VarChild.vue";

import {
    shellState
} from "@@/static/js/app/github/state/index.mjs";

(async () => {
    try {
        const Vue = await setDefaultVueAntdvJS();
        const APP_STATE = window.APP_STATE = Vue.observable(shellState);
        const {
            _,
            loadLibById
        } = window;
        const {
            $loadCSS,
            $resolvePath,
            $lazyLoadComponent,
            $md5: md5,
            merge,
            camelCase,
            $getIDFromURL,
            $loadComponentByURL,
            $loadLess
        } = _;

        Vue.component("LoadingView", LoadingView);
        Vue.component("VarContainer", VarContainer);
        Vue.component("VarChild", VarChild);
        
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
            async mounted() {
                const shellComponent = await $loadComponentByURL("static/module/layout/shell/Shell.vue");
                this.componentName = shellComponent;
                // $loadLess("static/style/less/Shell.less");
            },
            methods: {},
            template: "<div :is=\"componentName\">waiting import</div>"
        }).$mount("#app");
    } catch (error) {
        console.error(error);
    }
})();