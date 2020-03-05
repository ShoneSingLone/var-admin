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
        tabs.forEach((tab, index) => {
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
    handleTabRemove(route) {
      /* home 不能关闭 */
      if (route === "home") {
        return false;
      }
      /* 获取rootRoute信息 */
      const rootRoute = APP_STATE.contentTabsMap[route.id];

      // 当前选中tab被删除
      if (route === APP_STATE.contentTabsActiveName) {
        var lastTab = _.last(this.thisContentTabs);
      }

      /* 只剩下Home */
      if (APP_STATE.contentTabs.length === 0) {
        APP_STATE.contentTabsActiveName = "home";
        return false;
      }
    },
    handleTabClick(tab) {
      const targetTab = APP_STATE.contentTabsMap[tab.name];
      if (!targetTab) {
        alert("Tab 没有必要的参数 ");
        return false;
      }
      /* 修正当前url */
      console.log("targetTab.content.path", targetTab.content.path);
      APP_ROUTER.push({ path: targetTab.content.path });
    }
  }
};
</script>