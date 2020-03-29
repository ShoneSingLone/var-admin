<template>
  <div
    id="main-content202003053224"
    class="main-content overflow-auto"
  >
    <el-tabs
      class="content-tabs-wrapper"
      tab-position="top"
      :value="APP_STATE.contentTabsActiveName"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="tab in APP_STATE.contentTabs"
        :id="tab.name"
        :key="tab.name"
        :label="tab.title"
        :name="tab.name"
        :closable="tab.name !== 'home'"
      >
        <VarViewRouterContainer :options="{tab:tab}" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import VarViewRouterContainer from "@@/static/components/VarRouter/VarViewRouterContainer.vue";
const { APP_STATE, APP_ROUTER, _ } = window;

export default {
  TEMPLATE_PLACEHOLDER,
  components: {
    VarViewRouterContainer
  },
  data() {
    return {
      APP_ROUTER,
      APP_STATE
    };
  },
  computed: {
    matched() {
      return _.last(APP_ROUTER.currentRoute.matched);
    }
  },
  watch: {
    /* 中间处理层 */
    ["APP_ROUTER.currentRoute"](route, oldRoute) {
      const matched = _.last(route.matched);
      /* route 与 oldRoute 是否相同 ？*/
      const _currentTab = APP_STATE.contentTabsMap[matched.id];
      if (_currentTab) {
        /* 切换 */
        APP_STATE.contentTabsActiveName = _currentTab.name /* route.id */;
      } else {
        /* 新增 */
        this.addTab(matched);
      }
    }
  },
  mounted() {
    console.log("MainContent mounted");
    /* 页面初始加载，tab与浏览器地址栏保持一致 */
    if (APP_ROUTER.currentRoute.path !== "/") {
      /* TODO:matched 如何匹配到当前viewContainer的 id？ */
      /* 添加 */
      this.addTab(_.last(APP_ROUTER.currentRoute.matched));
    }
    /* 默认是home */
  },
  methods: {
    addTab(currentRoute) {
      if (!currentRoute.id) alert("传入的参数需是带id的route");
      var currentTab = {
        title: currentRoute.name,
        /* name as id */
        name: currentRoute.id,
        content: currentRoute
      };

      APP_STATE.contentTabs.push(currentTab);
      APP_STATE.contentTabsMap[currentRoute.id] = currentTab;
      APP_STATE.contentTabsActiveName = currentRoute.id;
      APP_STATE.sidebarMenuActiveName = currentRoute.id;

      console.log(
        APP_STATE.contentTabs,
        APP_STATE.contentTabsMap,
        APP_STATE.contentTabsActiveName
      );
    },
    handleTabsRemove(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        _.each(tabs, (tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    handleTabRemove(routeId) {
      /* home 不能关闭 */
      if (routeId === "home") {
        return false;
      }
      debugger;
      /* 获取rootRoute信息 */
      const rootRoute = APP_STATE.contentTabsMap[routeId];
      let index = 1;
      for (index; index < APP_STATE.contentTabs.length; index++) {
        const _route = APP_STATE.contentTabs[index];
        if (_route.content.id === rootRoute.content.id) break;
      }
      APP_STATE.removeTab(rootRoute.content.id, index);
      /* 当前选中tab被删除,当前展示切换为最后一个 */
      if (routeId === APP_STATE.contentTabsActiveName) {
        this.handleTabClick(_.last(APP_STATE.contentTabs));
      }
    },
    handleTabClick(tab) {
      const targetTab = APP_STATE.contentTabsRouteMap[tab.name];
      if (!targetTab) {
        alert("Tab 没有必要的参数");
        return false;
      }
      /* 修正当前url */
      const { name, meta, path, hash, query, params, id } = targetTab;
      APP_STATE.sidebarMenuActiveName = tab.id;
      APP_ROUTER.push({
        meta,
        path,
        hash,
        query,
        params
      });
    }
  }
};
</script>