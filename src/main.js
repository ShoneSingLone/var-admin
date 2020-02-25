// import "@/bootstrap-3.3.7/less/bootstrap.getGrid.less";
import "./index.config";
import "./index.tools";
import "./main.vuedev.js";
// import App from "@@/static/module/user/login/Login.vue";
// import Antd from "ant-design-vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@@/static/scss/main.scss";
import { shellState } from "@@/static/js/app/github/state/index.mjs"

const {
    Vue
} = window;
window.APP_STATE = Vue.observable(shellState);

Vue.use(Element);
// Vue.use(Antd);
Vue.config.productionTip = false;

import("@@/static/module/layout/shell/Shell.vue")
    .then(function ({
        default: App
    }) {
        new Vue({
            el: "#app",
            render: function (h) {
                return h(App);
            },
        });
    })
    .catch(function (error) {
        console.error(error);
    });