<template>
  <!-- 有子节点 -->
  <el-submenu
    v-if="haveChild"
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
    @click="handleMenuItemClick(menu)"
  >
    <i class="el-icon-arrow-right" />
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template> 


<script>
console.log("MainSidebarSubmenu");
export default {
  TEMPLATE_PLACEHOLDER,
  components: {},
  props: { menu: { type: Object, required: true } },
  data() {
    return {
      sidebarMenuActiveName: "",
      privateSidebarMenuList: ""
    };
  },
  computed: {
    haveChild() {
      return this.menu.children && this.menu.children.length >= 1;
    }
  },
  methods: {
    handleMenuItemClick(menuItem) {
      console.log("menuItem", menuItem);
    }
  }
};
</script>