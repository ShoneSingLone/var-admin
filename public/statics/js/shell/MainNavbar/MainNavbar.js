/**
 * main-navbar组件
 */
(function (Vue) {
    var COMPONENT_NAME = 'MainNavbar';
    var self, screenfull;
    Vue.componentList[COMPONENT_NAME] = Promise
        .all([
            Vue.loadComponent(['MainNavbarUpdatePassword'], Vue.resolvePath('statics/js/shell/MainNavbar')),
            Vue.loadJS([
                ['screenfull', Vue.resolvePath('statics/plugins/screenfull-3.3.2/screenfull.js')]
            ])
        ])
        .then(function () {
            screenfull = window.screenfull;
            return Promise.resolve({
                name: COMPONENT_NAME,
                inject: ['APP'],
                components: {
                    'update-password': Vue.componentList.MainNavbarUpdatePassword
                },
                data: function () {
                    return {
                        updatePassowrdVisible: false
                    };
                },
                props: {
                    navbarLayoutType: {
                        type: String,
                        required: true
                    },
                    contentTabsActiveName: {
                        type: String,
                        required: true
                    },
                    user: {
                        type: Object,
                        required: true
                    }
                },
                beforeCreate: function () {
                    self = this;
                },
                methods: {
                    showLog: function (user) {
                        var tab = {
                            name: 'sys-log-error',
                            params: {
                                title: '异常日志',
                                url: "/modules/sys/log-error.html"
                            },
                            title: '异常日志',
                            url: "/modules/sys/log-error.html",
                            menuId: "1067246875800000050",
                            "id": "1067246875800000050",
                            "pid": "1067246875800000046",
                            "children": [],
                            "name": "sys-log-error",
                            "url": "/modules/sys/log-error.html",
                            "type": 0,
                            "icon": "icon-desktop",
                            "permissions": null,
                            "sort": 1,
                            "createDate": "2019-05-27 11:36:49",
                            "parentName": null
                        };

                        var _tab = this.APP.contentTabs.filter(function (item) {
                            return item.name === tab.name;
                        })[0];
                        if (!_tab) this.APP.contentTabs.push(tab);
                        this.APP.sidebarMenuActiveName = tab.id;
                        this.APP.contentTabsActiveName = tab.name;
                        Route.to('sys-log-error');
                    },
                    // 刷新
                    refreshHandle: function () {
                        var iframeBox = document.querySelector('#pane-' + this.APP.contentTabsActiveName + ' > iframe');
                        if (iframeBox) {
                            iframeBox.contentWindow.location.reload(true);
                        }
                    },
                    // 全屏
                    fullscreenHandle: function () {
                        if (!screenfull.enabled) {
                            return self.$message({
                                message: self.$t('fullscreen.prompt'),
                                type: 'warning',
                                duration: 500
                            });
                        }
                        screenfull.toggle();
                    },
                    // 修改密码
                    updatePasswordHandle: function () {
                        self.updatePassowrdVisible = true;
                        self.$nextTick(function () {
                            self.$refs.updatePassowrd.init();
                        });
                    },
                    // 退出
                    logoutHandle: function () {
                        var orgType = JSON.parse(localStorage.currentUser).orgType;
                        self.$confirm(self.$t('prompt.info', {
                            'handle': self.$t('logout')
                        }), self.$t('prompt.title'), {
                            confirmButtonText: self.$t('confirm'),
                            cancelButtonText: self.$t('cancel'),
                            type: 'warning'
                        }).then(function () {
                            self.$http.post('/logout').then(function (res) {
                                if (res.data.code !== 0) {
                                    return self.$message.error(res.data.msg);
                                }
                                window.location.href = 'login.html';


                            }).catch(function () {});
                        }).catch(function () {});
                    }
                }
            });
        });

})(window.Vue, window._);