<template>
  <!-- 有子节点 -->
  <el-submenu
    v-if="isShow"
    :index="menu.id"
  >
    <template slot="title">
      <i class="el-icon-collection-tag" />
      <span>{{ menu.name }}</span>
    </template>
    <main-sidebar-submenu
      v-for="item in menu.children"
      :key="item.id"
      :menu="item"
    />
  </el-submenu>
  <!-- 无子节点 -->
  <el-menu-item
    v-else
    :index="menu.id"
    @click="gotoRouteHandle(menu.id,menu,true)"
  >
    <i class="el-icon-arrow-right" />
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template> <script>
export default {
  TEMPLATE_PLACEHOLDER,
  components: {},
  props: { menu: { type: Object, required: true } },
  data() {
    return {
      searchKeyWord: "",
      sidebarMenuActiveName: "",
      privateSidebarMenuList: ""
    };
  },
  computed: {
    isShow() {
      var isShow = this.menu.children && this.menu.children.length >= 1;
      return isShow;
    }
  },
  mounted() {}
};
</script>