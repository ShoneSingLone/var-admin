import appvue from "./Login.vue";
const {
    _: {
        $loadJS,
        $resolvePath
    },
    Vue
} = window;

new Vue({
    el: "#app",
    components: {
        appvue
    }
});