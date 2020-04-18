import Vue from "vue";
import "./main.vuedev";
import "./index.config";
import "./index.tools";
import {
    setAxiosInterceptors,
    loadLibById
} from "@@/static/js/app/github/http-axios.mjs";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
(async () => {
    try {
        const Cookies = await loadLibById("Cookies");
        await setAxiosInterceptors(window._.$axios, window._, Cookies);
        await window._.$loadJS(window._.$resolvePath("static/lib/lodash-4.17.11.js")).then(function () {
            window._ = window._.merge(window._.noConflict(), window._);
        });

        new Vue({
            el: "#app",
            render: h => h(App)
        });
    } catch (error) {
        console.error(error);
    }
})();