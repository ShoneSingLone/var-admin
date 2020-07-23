<template>
  <div id="app">
    <!-- <div :is="currentView" /> -->
    <PageMvvm />
  </div>
</template>

<script>
// import PageMenu from "@@/static/module/sys/menu/PageMenu.vue";
// import PageMvvm from "@@/static/module/learn/MVVM/PageMvvm.vue";
import PageMvvm from "@@/static/module/learn/D3/PageD3.vue";
// import PageDevComponents from "@@/static/module/dev/PageDevComponents.vue";
// import PageLogin from "@@/static/module/dev/PageLogin.vue";
// import Scrollbar from "@@/static/module/dev/Scrollbar.vue";
import { vlibs } from "./index.libs";
import $ from "jquery";
window.$ = $;
console.log("vlibs",vlibs);
const components = {
  PageMvvm
  // PageMenu,
  // PageDevComponents,
  // Scrollbar,
  // PageLogin
};
window.vlibs = vlibs;

export default {
  name: "App",
  components,
  data() {
    return {
      currentView: "PageMvvm"
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const url = new URL(window.location);
      // Retrieve params via url.search, passed into ctor
      const params = new URLSearchParams(url.search);
      const view = params.get("view");
      if (view) {
        this.currentView = view;
      }
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
}
</style>
