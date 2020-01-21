import setDefaultVueAntdvJS from "../../../js/vue-antdv.mjs";
import Login from "./Login.vue";
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

(async () => {
    try {
        const Vue = await setDefaultVueAntdvJS();
        $loadCSS($resolvePath("static/css/css.css"));

        const APP_STATE = Vue.observable({
            count: 0
        });

        window.APP_STATE = APP_STATE;
        const app = new Vue(Login);
        app.$mount("#app");
    } catch (error) {
        console.error(error);
    }
})();