/**
 * main-content组件
 */
(function (Vue) {
    var COMPONENT_NAME = 'MainContent';
    var self = null;
    Vue.componentList[COMPONENT_NAME] =
        Promise.resolve({
            name: COMPONENT_NAME,
            props: {
                sidebarMenuActiveName: {
                    type: String,
                    required: true
                },
                contentTabs: {
                    type: Array,
                    required: true
                },
                contentTabsActiveName: {
                    type: String,
                    required: true
                }
            },
            computed: {
                selfSidebarMenuActiveName: {
                    get: function () {
                        return self.sidebarMenuActiveName;
                    },
                    set: function (val) {
                        self.$emit('set-sidebar-menu-active-name', val);
                    }
                },
                selfContentTabs: {
                    get: function () {
                        return self.contentTabs;
                    },
                    set: function (val) {
                        self.$emit('set-content-tabs', val);
                    }
                },
                selfContentTabsActiveName: {
                    get: function () {
                        return self.contentTabsActiveName;
                    },
                    set: function (val) {
                        self.$emit('set-content-tabs-active-name', val);
                    }
                }
            },
            beforeCreate: function () {
                self = this;
            },
            methods: {
                camelCaselize: function (value) {
                    var res = _.camelCase(value);
                    return res;
                },
                iframeVisibleHandle: function (item) {
                    return item.name === window.location.hash.substring(1).split('?')[0];
                },
                // tabs, 选中tab
                tabSelectedHandle: function (tab) {
                    tab = self.selfContentTabs.filter(function (item) {
                        return item.name === tab.name;
                    })[0];
                    if (tab) {
                        Route.to(tab.name);
                    }
                },
                // tabs, 删除tab
                tabRemoveHandle: function (tabName) {
                    if (tabName === 'home') {
                        return false;
                    }
                    self.selfContentTabs = self.selfContentTabs.filter(function (item) {
                        return item.name !== tabName;
                    });
                    self.$nextTick(function () {
                        if (self.selfContentTabs.length <= 0) {
                            self.selfSidebarMenuActiveName = self.selfContentTabsActiveName = 'home';
                            return false;
                        }
                        // 当前选中tab被删除
                        if (tabName === self.selfContentTabsActiveName) {
                            Route.to(self.selfContentTabs[self.selfContentTabs.length - 1].name);
                        }
                    });
                },
                // tabs, 关闭其它
                tabsCloseOtherHandle: function () {
                    self.selfContentTabs = self.selfContentTabs.filter(function (item) {
                        return item.name === 'home' || item.name === self.selfContentTabsActiveName;
                    });
                },
                // tabs, 关闭全部
                tabsCloseAllHandle: function () {
                    self.selfContentTabs = self.selfContentTabs.filter(function (item) {
                        return item.name === 'home';
                    });
                    Route.to('home');
                }
            }
        });
})(window.Vue);