const routHome = {
    title: "Home",
    name: "home",
    content: "Home"
};

export const shellState = {
    num: 0,
    isSidebarFold: false,
    /* 系统名 */
    sysNavTitle: "SYS_NAV_TITLE",
    sysNavSubTitle: "FOLD",
    /* 默认骨架图 LoadingView */
    componentNavbar: "LoadingView",
    componentSidbar: "LoadingView",
    componentContent: "LoadingView",
    /* 当前路由 */
    currentRoute: [],
    contentTabs: [routHome],
    contentTabsMap: {
        home: routHome
    },
    /* 当前 tab页*/
    contentTabsActiveName: "home",
    // mainSidebarStyle: { width: "230px" }
};