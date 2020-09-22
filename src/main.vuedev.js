import Vue from "vue";
// import Vue from "vue-i18n";
import ComponentMkit from "@@/static/components/htmlelemet/mkit.vue";

import LoadingView from "@@/static/components/LoadingView.vue";
import VarContainer from "@@/static/components/VarRouter/container/VarContainer.vue";
import VarChild from "@@/static/components/VarRouter/container/VarChild.vue";
import VarPanel from "@@/static/components/htmlelemet/VarPanel.vue";
/* 注册全局组件 */
Vue.component("LoadingView", LoadingView);
Vue.component("VarContainer", VarContainer);
Vue.component("VarChild", VarChild);
Vue.component("VarPanel", VarPanel);

Vue.prototype.$t = (key) => {
    console.log("i18n: ", key);
    return "i18n translate";
};
window.Vue = Vue;
window.Vue.component("mkit", ComponentMkit);