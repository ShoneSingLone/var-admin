<template>
  <div>
    <div :is="mainNavbarName">
      main-navbar
    </div>
    <div :is="mainSidebarName">
      main-sidebar
    </div>
    <div :is="mainContentName">
      main-content
    </div>
  </div>
</template>
<script>

import mainNavbar from "@@/static/module/layout/shell/MainContent.vue";
import mainSidebar from "@@/static/module/layout/shell/MainSidebar.vue";
import mainContent from "@@/static/module/layout/shell/MainContent.vue";

export default { TEMPLATE_PLACEHOLDER, components:{ mainNavbar, mainSidebar, mainContent }, data() { return { collapsed: false, mainNavbarName:"div", mainSidebarName:"div", mainContentName:"div" }; }, mounted() { setTimeout(() => { this.mainNavbarName=       mainNavbar; this.mainSidebarName=       mainSidebar; this.mainContentName=       mainContent; }, 1000); }, };
</script>

<style lang="scss" src="../../../scss/main.scss">
</style>