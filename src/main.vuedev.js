import Vue from "vue";
// import Vue from "vue-i18n";
import ComponentMkit from "@@/static/components/htmlelemet/mkit.vue";

Vue.prototype.$t = (key) => {
    console.log("i18n: ", key);
    return "i18n translate";
};
window.Vue = Vue;
window.Vue.component("mkit", ComponentMkit);