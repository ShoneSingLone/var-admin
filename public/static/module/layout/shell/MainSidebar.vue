<template>
  <aside :class="[]">
    <div :class="['search-wrapper elevation2',{'fold':APP_STATE.isSidebarFold}]">
      <span class="icon prefix">
        <i class="el-input__icon el-icon-search" />
      </span>
      <input
        v-model="searchKeyWord"
        class="input-search"
        type="text"
        autocomplete="off"
        placeholder="检索菜单..."
      >
      <span
        :class="['icon suffix',{'no-words':!searchKeyWord}]"
        @click="searchKeyWord=''"
      >
        <i class="el-input__icon el-icon-circle-close" />
      </span>
    </div>
    <el-scrollbar class="sidebar__inner">
      <el-menu
        :default-active="sidebarMenuActiveName"
        :collapse="APP_STATE.isSidebarFold"
        :unique-opened="true"
        :collapse-transition="false"
        class="sidebar__menu"
      >
        <main-sidebar-submenu
          v-for="menu in privateSidebarMenuList"
          :key="menu.id"
          :menu="menu"
        />
      </el-menu>
    </el-scrollbar>
  </aside>
</template>
<script>
import menuRes from "./MockMainSidebar.js";
import MainSidebarSubmenu from "./MainSidebarSubmenu.vue";
console.log(menuRes);
const { Vue, APP_STATE } = window;
Vue.component("MainSidebarSubmenu", MainSidebarSubmenu);
export default {
  TEMPLATE_PLACEHOLDER,
  // components:{ Test },
  data() {
    return {
      APP_STATE,
      searchKeyWord: "",
      sidebarMenuActiveName: "",
      privateSidebarMenuList: menuRes.data
    };
  },
  mounted() {}
};
</script>