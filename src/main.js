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
import {
    VarRouter
} from "@@/static/components/VarRouter/VarRouter.mjs";
import { routeHome } from "@@/static/js/app/github/state/index.mjs";
import "@@/static/style/less/Shell.less";
Vue.use(ElementUI);

const {
    _
} = window;

window.APP_STATE = Vue.observable({
    count: 0
});
window.APP_ROUTER = new VarRouter({
    routes: [],
    onChange: route => {
        console.log("route onChange", route);
    }
});
/* 主要是home */
window.APP_ROUTER.addRoutes([routeHome]);

(async () => {
    try {
        const Cookies = await loadLibById("Cookies");
        await setAxiosInterceptors(window._.$axios, window._, Cookies);
        await window._.$loadJS(window._.$resolvePath("static/lib/lodash-4.17.11.js"));
        window._ = window._.merge(window._.noConflict(), window._);

        new Vue({
            el: "#app",
            render: h => h(App)
        });
    } catch (error) {
        console.error(error);
    }
})();