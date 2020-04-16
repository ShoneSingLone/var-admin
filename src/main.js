import Vue from "vue";
import "./main.vuedev";
import "./index.config";
import "./index.tools";
import "@@/static/js/app/github/utils.mjs";
import {
    setAxiosInterceptors
} from "@@/static/js/app/github/http-axios.mjs";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

(async () => {
    const Cookies = await window._lib("Cookies");
    debugger;
    await setAxiosInterceptors(window._.$axios, window._, Cookies);
    Vue.use(ElementUI);
    new Vue({
        el: "#app",
        render: h => h(App)
    });
})();