<template>
  <div
    v-cloak
    v-loading.fullscreen.lock="loading"
    :element-loading-text="$t('loading')"
    :class="{ 'aui-sidebar--fold': sidebarFold }"
    class="aui-wrapper"
  >
    <template v-if="!loading">
      <main-navbar
        :navbar-layout-type="navbarLayoutType"
        :content-tabs-active-name="contentTabsActiveName"
        :user="user"
        @switch-sidebar-fold="sidebarFold = !sidebarFold"
      ></main-navbar>
      <main-sidebar
        :sidebar-layout-skin="sidebarLayoutSkin"
        :sidebar-fold="sidebarFold"
        :sidebar-menu-list="sidebarMenuList"
        :sidebar-menu-active-name="sidebarMenuActiveName"
      ></main-sidebar>
      <div class="aui-content__wrapper">
        <!-- content -->
        <main-content
          ref="content"
          :sidebar-menu-active-name="sidebarMenuActiveName"
          :content-tabs="contentTabs"
          :content-tabs-active-name="contentTabsActiveName"
          @set-sidebar-menu-active-name="setSidebarMenuActiveName"
          @set-content-tabs="setContentTabs"
          @set-content-tabs-active-name="setContentTabsActiveName"
        ></main-content>
      </div>
      <main-theme-tools
        :navbar-layout-type="navbarLayoutType"
        :sidebar-layout-skin="sidebarLayoutSkin"
        @set-navbar-layout-type="setNavbarLayoutType"
        @set-sidebar-layout-type="setSidebarLayoutType"
      ></main-theme-tools>
    </template>
  </div>
</template>
<script>
export default {
  name: "Shell",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>