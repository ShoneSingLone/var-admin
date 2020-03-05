export const routHome = {
    title: "Home",
    name: "home",
    content: {
        "id": "home",
        "path": "/",
        "pid": "1067246875800000035",
        "children": [],
        "name": "Home",
        "url": "/sys/params",
        "type": 0,
        "handler": 1,
        "icon": "icon-fileprotect",
        "permissions": null,
        "sort": 1,
        "createDate": "2019-08-14 16:34:38",
        "parentName": null
    }
};

export const shellState = {
    num: 0,
    isSidebarFold: false,
    /* 系统名 */
    sysNavTitle: "SYS_NAV_TITLE",
    sysNavSubTitle: "FOLD",
    /* 默认骨架图 LoadingView 懒加载完成之后显示对应的视图 */
    componentNavbar: "LoadingView",
    componentSidbar: "LoadingView",
    componentContent: "LoadingView",
    /* 当前路由 */
    currentRoute: {
        home: routHome
    },
    /* 界面Tab页相关 */
    contentTabs: [routHome],
    /* 记录实际的例如add  update/:id */
    contentTabsMap: {
        /* id:route */
        home: routHome
    },
    /* 当前 tab页*/
    contentTabsActiveName: "home",
    // mainSidebarStyle: { width: "230px" }
};