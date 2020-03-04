<template>
  <div class="main-content overflow-auto">
    <div class="tabs-tool-wrapper flex-horizon">
      <div class="tabs-wrapper flex1">
        <!-- Tab-Wrapper -->
        <!-- tabs -->
        <el-tabs
          tab-position="top"
          :value="APP_STATE.contentTabsActiveName"
          style="height: 200px;"
          @tab-click="setCurrentContentTab"
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
            <template v-if="tab.name==='home'">
              home
            </template>
            <template v-else>
              <VarViewRouterContainer />
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- tab tools bar -->
      <el-dropdown class="aui-content--tabs-tools">
        <i class="el-icon-arrow-down" />
        <el-dropdown-menu
          slot="dropdown"
          :show-timeout="0"
        >
          <el-dropdown-item
            handle-tclick-native="tabRemove(APP_STATE.contentTabsActiveName)"
          >
            {{ $t('contentTabs.closeCurrent') }}
          </el-dropdown-item>
          <el-dropdown-item
            @click.native="tabsCloseOtherHandle()"
          >
            {{ $t('contentTabs.closeOther') }}
          </el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseAllHandle()">
            {{ $t('contentTabs.closeAll') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- Tab-Wrapper -->
    </div>
  </div>
</template>


<script>
import VarViewRouterContainer from "@@/static/components/VarRouter/VarViewRouterContainer.vue";
const { APP_STATE, APP_ROUTER, _ } = window;
console.log("MainContent", APP_STATE, APP_ROUTER);

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
    ["APP_ROUTER.currentRoute"](route) {
      const matched = _.last(route.matched);
      /* route 与 oldRoute 是否相同 ？*/
      const _currentTab = APP_STATE.contentTabsMap[matched.id];
      if (_currentTab) {
        /* 切换 */
        APP_STATE.contentTabsActiveName = _currentTab.id;
      } else {
        /* 新增 */
        this.addTab(matched);
      }
    }
  },
  methods: {
    handleTabsClick(tab) {
      debugger;
    },
    addTab(currentRoute) {
      APP_STATE.contentTabs.push({
        title: currentRoute.name,
        /* name=>id */
        name: currentRoute.id,
        content: currentRoute
      });
      APP_STATE.contentTabsMap[currentRoute.id] = currentRoute;
      APP_STATE.contentTabsActiveName = currentRoute.id;
    },
    handleTabsRemove(targetName) {
      debugger;
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
    handleTabRemove(currentRoute) {
      if (currentRoute === "home") {
        return false;
      }
      var a = APP_STATE.contentTabsMap[currentRoute.id];
      debugger;
      if (self.selfContentTabs.length <= 0) {
        self.selfSidebarMenuActiveName = "home";
        self.APP_STATE.setContentTabsActiveName("home");
        return false;
      }
      // 当前选中tab被删除
      if (currentRoute === self.APP_STATE.contentTabsActiveName) {
        var lastTab = _.last(self.selfContentTabs);
      }
    },
    setCurrentContentTab(tab) {
      debugger;
      const _currentTab = APP_STATE.contentTabsMap[tab.name];
      /* 修正当前url */
      APP_ROUTER.push(_currentTab);
    }
  }
};
</script>