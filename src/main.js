// import "@/bootstrap-3.3.7/less/bootstrap.getGrid.less";
import "./index.config";
import "./index.tools";
import "./main.vuedev.js";
// import App from "@@/static/module/user/login/Login.vue";
import App from "@@/static/module/layout/shell/Shell.vue";
// import Antd from "ant-design-vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@@/static/scss/main.scss";

const {
    Vue
} = window;

Vue.use(Element);
// Vue.use(Antd);
Vue.config.productionTip = false;
new Vue({
    el: "#app",
    render: function (h) {
        return h(App);
    },
});