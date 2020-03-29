<template>
  <aside :class="[]">
    <div :class="['search-wrapper elevation3',{'fold':APP_STATE.isSidebarFold}]">
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
        @select="handleMenuSelect"
        @open="handleMenuOpen"
        @close="handleMenuClose"
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
import VarViewRouterContainer from "@@/static/components/VarRouter/VarViewRouterContainer.vue";
const { Vue, APP_STATE } = window;
console.log("MainSidebar");
Vue.component("MainSidebarSubmenu", MainSidebarSubmenu);
export default {
  TEMPLATE_PLACEHOLDER,
  data() {
    return {
      APP_STATE,
      searchKeyWord: "",
      sidebarMenuActiveName: "",
      privateSidebarMenuList: menuRes.data
    };
  },
  methods: {
    handleMenuSelect(index, indexPath) {
      console.log(
        "handleMenuSelect",
        index,
        indexPath,
        APP_STATE.contentTabsActiveName
      );
    },
    handleMenuOpen(index, indexPath) {
      console.log(
        "handleMenuOpen",
        index,
        indexPath,
        APP_STATE.contentTabsActiveName
      );
    },
    handleMenuClose(index, indexPath) {
      console.log(
        "handleMenuClose",
        index,
        indexPath,
        APP_STATE.contentTabsActiveName
      );
    }
  }
};
</script>