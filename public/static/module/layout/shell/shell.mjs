import setDefaultVueAntdvJS from "@@/static/js/vue-element.mjs";

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
            num: 0,
            isSidebarFold: false,
            sysNavTitle: "var adminasdfasdfsdf",
            /*  */
            componentNavbar: "div",
            componentSidbar: "div",
            componentContent: "div"
            // mainSidebarStyle: { width: "230px" }
        });

        window.APP_STATE = APP_STATE;

        new Vue({
            data() {
                return {
                    APP_STATE,
                    componentName: "div"
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
                console.log(shellComponent, shellComponent.name);
                this.componentName = shellComponent;
            },
            template: "<div :is=\"componentName\">waiting import</div>"
        }).$mount("#app");
    } catch (error) {
        console.error(error);
    }
})();