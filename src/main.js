// import "@/bootstrap-3.3.7/less/bootstrap.getGrid.less";
import "./index.config";
import "./index.tools";
import "./main.vuedev.js";
// import App from "@@/static/module/user/login/Login.vue";
// import Antd from "ant-design-vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@@/static/scss/main.scss";
import {
    shellState
} from "@@/static/js/app/github/state/index.mjs"
import menuRes from "@@/static/module/layout/shell/MockMainSidebar.js";
import LoadingView from "@@/static/components/LoadingView.vue";
import lodash from "lodash";
import {
    VarRouter
} from "@@/static/components/VarRouter/VarRouter.mjs";

const {
    Vue,
    _
} = window;

window._ = _.merge(_, lodash)

const APP_STATE = window.APP_STATE = Vue.observable(shellState);
const APP_ROUTER = window.APP_ROUTER = new VarRouter({
    routes: menuRes.data,
    onChange: route => {
        var match = _.last(route.matched);
        if (match) {
            APP_STATE.contentTabsRouteMap[match.id] = route
        }
    }
});

APP_ROUTER.addRoutes(APP_STATE.contentTabs.map(tab => tab.content));

Vue.use(Element);
// Vue.use(Antd);
Vue.config.productionTip = false;
Vue.component("LoadingView", LoadingView);


import("@@/static/module/layout/shell/Shell.vue")
    .then(({
            default: App
        }) =>
        window.app = new Vue({
            el: "#app",
            render: function (h) {
                return h(App);
            },
        })
    )
    .catch(function (error) {
        console.error(error);
    });