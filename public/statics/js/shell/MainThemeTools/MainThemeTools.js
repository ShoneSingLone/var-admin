/**
 * main-theme-tools组件
 */

(function (Vue) {
    var COMPONENT_NAME = "MainThemeTools";
    var self = null;
    Vue.componentList[COMPONENT_NAME] =
        Promise.resolve({
            name: COMPONENT_NAME,
            data: function () {
                return {
                    isOpen: false,
                    themeList: [{
                            name: "default",
                            color: "#409EFF",
                            desc: "默认色",
                            hasBuild: false
                        },
                        {
                            name: "cyan",
                            color: "#0BB2D4",
                            desc: "青色",
                            hasBuild: false
                        },
                        {
                            name: "blue",
                            color: "#3E8EF7",
                            desc: "蓝色",
                            hasBuild: false
                        },
                        {
                            name: "green",
                            color: "#11C26D",
                            desc: "绿色",
                            hasBuild: false
                        },
                        {
                            name: "turquoise",
                            color: "#17B3A3",
                            desc: "蓝绿色",
                            hasBuild: false
                        },
                        {
                            name: "indigo",
                            color: "#667AFA",
                            desc: "靛青色",
                            hasBuild: false
                        },
                        {
                            name: "brown",
                            color: "#997B71",
                            desc: "棕色",
                            hasBuild: false
                        },
                        {
                            name: "purple",
                            color: "#9463F7",
                            desc: "紫色",
                            hasBuild: false
                        },
                        {
                            name: "gray",
                            color: "#757575",
                            desc: "灰色",
                            hasBuild: false
                        },
                        {
                            name: "orange",
                            color: "#EB6709",
                            desc: "橙色",
                            hasBuild: false
                        },
                        {
                            name: "pink",
                            color: "#F74584",
                            desc: "粉红色",
                            hasBuild: false
                        },
                        {
                            name: "yellow",
                            color: "#FCB900",
                            desc: "黄色",
                            hasBuild: false
                        },
                        {
                            name: "red",
                            color: "#FF4C52",
                            desc: "红色",
                            hasBuild: false
                        }
                    ],
                    themeColor: "turquoise"
                };
            },
            props: {
                navbarLayoutType: {
                    type: String,
                    required: true
                },
                sidebarLayoutSkin: {
                    type: String,
                    required: true
                }
            },
            computed: {
                selfNavbarLayoutType: {
                    get: function () {
                        return self.navbarLayoutType;
                    },
                    set: function (val) {
                        self.$emit("set-navbar-layout-type", val);
                    }
                },
                selfSidebarLayoutSkin: {
                    get: function () {
                        return self.sidebarLayoutSkin;
                    },
                    set: function (val) {
                        self.$emit("set-sidebar-layout-type", val);
                    }
                }
            },
            beforeCreate: function () {
                self = this;
            },
            mounted: function () {
                self = this;
                self.themeColorChangeHandle("turquoise");
            },
            methods: {
                // 切换主题
                themeColorChangeHandle: function (val) {
                    var styleList = [{
                            id: "J_elementTheme",
                            url: "./statics/element-theme/" + val + "/index.css?t=" + new Date().getTime()
                        },
                        {
                            id: "J_auiTheme",
                            url: "./statics/element-theme/" + val + "/aui.css?t=" + new Date().getTime()
                        }
                    ];
                    for (var i = 0; i < styleList.length; i++) {
                        var el = document.querySelector("#" + styleList[i].id);
                        if (el) {
                            el.href = styleList[i].url;
                            continue;
                        }
                        el = document.createElement("link");
                        el.id = styleList[i].id;
                        el.href = styleList[i].url;
                        el.rel = "stylesheet";
                        document.querySelector("head").appendChild(el);
                    }
                }
            }
        });
})(window.Vue);