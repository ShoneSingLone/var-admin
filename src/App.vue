<template>
  <div id="app">
    <PageMenu />
  </div>
</template>

<script>
import PageMenu from "@@/static/module/sys/menu/PageMenu.vue";

export default {
  name: "App",
  components: {
    PageMenu
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
