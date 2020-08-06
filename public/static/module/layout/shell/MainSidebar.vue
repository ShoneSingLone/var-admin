<template>
  <aside v-if="sidebarMenuList.length>0">
    <!-- <pre>
                {{ JSON.stringify(_sidebarMenuList,null,2) }}
        </pre>-->
    <div :class="['search-wrapper elevation2',{'fold':APP_STATE.isSidebarFold}]">
      <span class="icon prefix">
        <i class="el-input__icon el-icon-search" />
      </span>
      <input
        v-model.trim="searchKeyWord"
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
        :default-active="APP_STATE.sidebarMenuActiveName"
        :collapse="APP_STATE.isSidebarFold"
        :unique-opened="true"
        :collapse-transition="false"
        class="sidebar__menu"
        @select="handleMenuSelect"
        @open="handleMenuOpen"
        @close="handleMenuClose"
      >
        <main-sidebar-submenu
          v-for="menu in _sidebarMenuList"
          :key="menu.id"
          :menu="menu"
        />
      </el-menu>
    </el-scrollbar>
  </aside>
  <LoadingView v-else />
</template>


<script>
    import MainSidebarSubmenu from "./MainSidebarSubmenu.vue";
    import {VarRouter} from "@@/static/components/VarRouter/VarRouter.mjs";

    const {
        Vue,
        APP_STATE,
        EventBus,
        _: {$arrayTreeFilter, $axios, filter, $resolvePath, $xhrFetchWithCache},
        $system
    } = window;

    /* @递归树： https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E9%80%92%E5%BD%92%E7%BB%84%E4%BB%B6 */
    Vue.component("MainSidebarSubmenu", MainSidebarSubmenu);
    export default {
        TEMPLATE_PLACEHOLDER,
        data() {
            return {
                APP_STATE,
                searchKeyWord: "",
                /* 原始加载的侧边数据 */
                sidebarMenuList: []
            };
        },
        computed: {
            /* 用于侧边显示的List 修改 单向数据流只修改privateSidebarMenuList 会过滤*/
            _sidebarMenuList() {
                const privateSidebarMenuList = !this.searchKeyWord
                    ? this.sidebarMenuList
                    : $arrayTreeFilter(this.sidebarMenuList, this.searchKeyWord);
                /* filter(privateSidebarMenuList, menu => menu.whether === 是否显示) */
                return privateSidebarMenuList;
            }
        },
        async mounted() {
            this.getMenu();
            const $ = await window.loadLibById("$");
            console.log($("body"));
        },
        provide() {
            return {
                SIDE_BAR: this
            };
        },
        methods: {
            async getMenu() {
                try {
                    /* 可以异步请求数据  */
                    let data = await $xhrFetchWithCache(
                        $resolvePath("static/mock/menu.json")
                    );
                    data = JSON.parse(data);
                    this.sidebarMenuList = data;
                    const APP_ROUTER = (window.APP_ROUTER = new VarRouter({
                        routes: data,
                        onChange: route => {
                            console.log("route onChange", route);
                            var match = _.last(route.matched);
                            if (match) {
                                APP_STATE.contentTabsRouteMap[match.id] = _.merge({}, route, match);
                            }
                        }
                    }));
                    /* 主要是home */
                    APP_ROUTER.addRoutes(APP_STATE.contentTabs.map(tab => tab.content));
                    /* 通知MainContent可以加载了 */
                    EventBus.trigger("menus-loaded");
                    EventBus.off("menus-loaded");
                    /* TODO: 菜单未加载，地址栏如何反应？ */
                } catch (error) {
                    console.error(error);
                }
            },
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