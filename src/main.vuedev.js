import Vue from "vue";
// import Vue from "vue-i18n";

Vue.prototype.$t = (key) => {
    console.log("i18n: ",key);
    return "i18n translate";
};
window.Vue = Vue;
