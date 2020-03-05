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
const { APP_ROUTER, APP_STATE } = window;
console.log("MainSidebarSubmenu", APP_ROUTER);
export default {
  TEMPLATE_PLACEHOLDER,
  components: {},
  props: { menu: { type: Object, required: true } },
  data() {
    return {
      APP_STATE,
      APP_ROUTER,
      sidebarMenuActiveName: "",
      privateSidebarMenuList: ""
    };
  },
  computed: {
    haveChild() {
      return this.menu.children && this.menu.children.length >= 1;
    }
  },
  mounted() {
    console.log("MainSidebarSubmenu");
  },
  methods: {
    handleMenuItemClick(menuItem) {
      const tagetTab = APP_STATE.contentTabsMap[menuItem.name];
      if(tagetTab){

      }
      
      menuItem = tagetTab ? tagetTab : menuItem;
      /* 单向修改路由信息 */
      /* TODO:如果是 */
      APP_ROUTER.push({
        path: menuItem.path,
        query: menuItem.query,
        id: menuItem.id
      });
      console.log("menuItem", menuItem);
    }
  }
};
</script>