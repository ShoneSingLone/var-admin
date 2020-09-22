export const routeHome = {
    title: "Home",
    name: "home",
    content: {
        id: "home",
        path: "/home",
        pid: "home",
        children: [],
        name: "Home",
        url: "static/module/dev/dev/Test.vue",
        type: 0,
        handler: 1,
        icon: "icon-fileprotect",
        permissions: null,
        sort: 1,
        createDate: "2019-08-14 16:34:38",
        parentName: null
    }
};

export const shellState = {
    num: 0,
    isSidebarFold: false,
    /* 系统名 */
    sysNavTitle: "SYS_NAV_TITLE",
    sysNavSubTitle: "FOLD",
    /* 默认骨架图 LoadingView 懒加载完成之后显示对应的视图 */
    componentNavbar: "mainNavbar",
    componentSidbar: "mainSidebar",
    componentContent: "LoadingView",
    /* 当前路由 */
    contentTabsRouteMap: {
        home: routeHome.content
    },
    /* 界面Tab页相关 */
    contentTabs: [routeHome],
    /* 记录实际的例如add  update/:id */
    contentTabsMap: {
        /* id:route */
        home: routeHome
    },
    addTab(route) {
        this.contentTabs.push(route);
        /*  */
        this.contentTabsMap[route.content.id] = route;
        this.contentTabsRouteMap[route.content.id] = route;
    },
    removeTab(routeId, index) {
        this.contentTabs.splice(index, 1);
        /*  */
        delete this.contentTabsMap[routeId];
        delete this.contentTabsRouteMap[routeId];
    },
    /* 当前 tab页 */
    contentTabsActiveName: "home",
    // mainSidebarStyle: { width: "230px" },
    sidebarMenuActiveName: "home"
};