<template>
  <!-- 有子节点 -->
  <el-submenu
    v-if="isShow"
    :index="privateMenu.id"
  >
    <!-- {{ privateMenu }} -->
    <template slot="title">
      <i class="el-icon-collection-tag" />
      <span>{{ privateMenu.name }}</span>
    </template>
    <main-sidebar-submenu
      v-for="item in privateMenu.children"
      :key="item.id"
      :menu="item"
    />
  </el-submenu>
  <!-- 无子节点 -->
  <el-menu-item
    v-else
    :index="privateMenu.id"
    :data-index="privateMenu.id"
    @click="handleMenuItemClick(privateMenu)"
  >
    <i class="el-icon-arrow-right" />
    <template v-if="checkShouldShowTips(privateMenu.name)">
      <el-tooltip
        effect="light"
        class="item"
        :content="privateMenu.name"
        placement="top-start"
      >
        <span>{{ String(privateMenu.name).substring(0,5)+"..." }}</span>
      </el-tooltip>
    </template>
    <template v-else>
      <span>{{ privateMenu.name }}</span>
    </template>
  </el-menu-item>
</template> 


<script>
export default {
  TEMPLATE_PLACEHOLDER,
  components: {},
  props: { menu: { type: Object, required: true } },
  computed: {
    privateMenu() {
      /*    var _menu = JSON.parse(JSON.stringify(this.menu));
    _menu.children = window._.filter(
        _menu.children,
        subMunu => subMunu.whether === "1"
      );
       */
      return JSON.parse(JSON.stringify(this.menu));
    },
    isShow() {
      return this.menu.children && this.menu.children.length >= 1;
    }
  },
  created() {
    console.log("MainSidebarSubmenu");
  },
  methods: {
    checkShouldShowTips(name) {
      return name.length > 6;
    },
    handleMenuItemClick(menuItem) {
      console.info("在路由改变的时候缓存，切换时根据id取出");
      /*根据targetTab可以判断当前contentTab是否已经打开*/
      const targetTab = window.APP_STATE.contentTabsRouteMap[menuItem.id];
      menuItem = targetTab ? targetTab : menuItem;
      /* 单向修改路由信息 */
      console.log("menuItem", menuItem);
      const HANDLER_MAP = {
        "0": () => {
          /* TODO:如果是 iframe */
          let path = (url => (/^\//g.test(url) ? url : url ? "/" + url : "/"))(
            menuItem.url
          );
          return window.APP_ROUTER.push({
            path,
            query: menuItem.query,
            id: menuItem.id
          });
        },
        "1": () => {
          /* TODO:如果是 VueComponent */
          return window.APP_ROUTER.push({
            path: menuItem.path,
            query: menuItem.query,
            id: menuItem.id
          });
        }
      };
      const fn = HANDLER_MAP[menuItem.handler]
        ? HANDLER_MAP[menuItem.handler]
        : HANDLER_MAP[0];
      fn();
    }
  }
};
</script>