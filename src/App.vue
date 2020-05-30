<template>
  <div id="app">
    <div :is="currentView" />
  </div>
</template>

<script>
    import PageMenu from "@@/static/module/sys/menu/PageMenu.vue";
    import PageDevComponents from "@@/static/module/dev/PageDevComponents.vue";
    import PageLogin from "@@/static/module/dev/PageLogin.vue";
    import Scrollbar from "@@/static/module/dev/Scrollbar.vue";
    import {vlibs} from "./index.libs";
    console.log("vlibs:",vlibs);
    window.vlibs = vlibs;
    export default {
        name: "App",
        components: {
            PageMenu,
            PageDevComponents,
            Scrollbar,
            PageLogin
        },
        data() {
            return {
                currentView: "PageMenu"
            };
        },
        mounted() {
            var url = new URL(window.location);
            // Retrieve params via url.search, passed into ctor
            var params = new URLSearchParams(url.search);
            var view = params.get("view");
            if (view) {
                this.currentView = view;
            }
        }
    };
</script>

<style lang="less">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
