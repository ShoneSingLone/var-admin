/* eslint-disable */
__webpack_public_path__ = window.__webpack_public_path__;

window.LAZY_LOADER.antdv = () => {
    const {
        _: {
            $loadCSS,
            $resolvePath,
        },
        Vue
    } = window;
    Vue.ANT_D_V_COMPONENTS = {};
    Promise.all([
            $loadCSS($resolvePath("static/lib/antdv/es/style/index.css")),
            import("ant-design-vue/es/base"),
        ])
        .then(function (res) {
            Vue.ANT_D_V_COMPONENTS.base = true;
            Vue.use(res[1].default);
        })
        .catch(function (error) {
            console.error(error);
        });


    Vue.ANT_D_V_COMPONENTS.AAffix = false;
    window.Vue.component("AAffix", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/affix/style/index.css")),
                    import( /* webpackChunkName: "AAffix" */ "ant-design-vue/es/affix")
                ]);

                Vue.ANT_D_V_COMPONENTS.AAffix = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AAnchor = false;
    window.Vue.component("AAnchor", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/anchor/style/index.css")),
                    import( /* webpackChunkName: "AAnchor" */ "ant-design-vue/es/anchor")
                ]);

                Vue.ANT_D_V_COMPONENTS.AAnchor = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AAutoComplete = false;
    window.Vue.component("AAutoComplete", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/auto-complete/style/index.css")),
                    import( /* webpackChunkName: "AAutoComplete" */ "ant-design-vue/es/auto-complete")
                ]);

                Vue.ANT_D_V_COMPONENTS.AAutoComplete = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AAlert = false;
    window.Vue.component("AAlert", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/alert/style/index.css")),
                    import( /* webpackChunkName: "AAlert" */ "ant-design-vue/es/alert")
                ]);

                Vue.ANT_D_V_COMPONENTS.AAlert = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AAvatar = false;
    window.Vue.component("AAvatar", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/avatar/style/index.css")),
                    import( /* webpackChunkName: "AAvatar" */ "ant-design-vue/es/avatar")
                ]);

                Vue.ANT_D_V_COMPONENTS.AAvatar = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ABackTop = false;
    window.Vue.component("ABackTop", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/back-top/style/index.css")),
                    import( /* webpackChunkName: "ABackTop" */ "ant-design-vue/es/back-top")
                ]);

                Vue.ANT_D_V_COMPONENTS.ABackTop = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ABadge = false;
    window.Vue.component("ABadge", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/badge/style/index.css")),
                    import( /* webpackChunkName: "ABadge" */ "ant-design-vue/es/badge")
                ]);

                Vue.ANT_D_V_COMPONENTS.ABadge = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.undefined = false;
    window.Vue.component("undefined", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/base/style/index.css")),
                    import( /* webpackChunkName: "undefined" */ "ant-design-vue/es/base")
                ]);

                Vue.ANT_D_V_COMPONENTS.undefined = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ABreadcrumb = false;
    window.Vue.component("ABreadcrumb", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/breadcrumb/style/index.css")),
                    import( /* webpackChunkName: "ABreadcrumb" */ "ant-design-vue/es/breadcrumb")
                ]);

                Vue.ANT_D_V_COMPONENTS.ABreadcrumb = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AButton = false;
    window.Vue.component("AButton", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/button/style/index.css")),
                    import( /* webpackChunkName: "AButton" */ "ant-design-vue/es/button")
                ]);

                Vue.ANT_D_V_COMPONENTS.AButton = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ACalendar = false;
    window.Vue.component("ACalendar", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/calendar/style/index.css")),
                    import( /* webpackChunkName: "ACalendar" */ "ant-design-vue/es/calendar")
                ]);

                Vue.ANT_D_V_COMPONENTS.ACalendar = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ACard = false;
    window.Vue.component("ACard", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/card/style/index.css")),
                    import( /* webpackChunkName: "ACard" */ "ant-design-vue/es/card")
                ]);

                Vue.ANT_D_V_COMPONENTS.ACard = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ACollapse = false;
    window.Vue.component("ACollapse", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/collapse/style/index.css")),
                    import( /* webpackChunkName: "ACollapse" */ "ant-design-vue/es/collapse")
                ]);

                Vue.ANT_D_V_COMPONENTS.ACollapse = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ACarousel = false;
    window.Vue.component("ACarousel", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/carousel/style/index.css")),
                    import( /* webpackChunkName: "ACarousel" */ "ant-design-vue/es/carousel")
                ]);

                Vue.ANT_D_V_COMPONENTS.ACarousel = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ACascader = false;
    window.Vue.component("ACascader", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/cascader/style/index.css")),
                    import( /* webpackChunkName: "ACascader" */ "ant-design-vue/es/cascader")
                ]);

                Vue.ANT_D_V_COMPONENTS.ACascader = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ACheckbox = false;
    window.Vue.component("ACheckbox", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/checkbox/style/index.css")),
                    import( /* webpackChunkName: "ACheckbox" */ "ant-design-vue/es/checkbox")
                ]);

                Vue.ANT_D_V_COMPONENTS.ACheckbox = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ACol = false;
    window.Vue.component("ACol", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/col/style/index.css")),
                    import( /* webpackChunkName: "ACol" */ "ant-design-vue/es/col")
                ]);

                Vue.ANT_D_V_COMPONENTS.ACol = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ADatePicker = false;
    window.Vue.component("ADatePicker", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/date-picker/style/index.css")),
                    import( /* webpackChunkName: "ADatePicker" */ "ant-design-vue/es/date-picker")
                ]);

                Vue.ANT_D_V_COMPONENTS.ADatePicker = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ADivider = false;
    window.Vue.component("ADivider", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/divider/style/index.css")),
                    import( /* webpackChunkName: "ADivider" */ "ant-design-vue/es/divider")
                ]);

                Vue.ANT_D_V_COMPONENTS.ADivider = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ADropdown = false;
    window.Vue.component("ADropdown", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/dropdown/style/index.css")),
                    import( /* webpackChunkName: "ADropdown" */ "ant-design-vue/es/dropdown")
                ]);

                Vue.ANT_D_V_COMPONENTS.ADropdown = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AForm = false;
    window.Vue.component("AForm", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/form/style/index.css")),
                    import( /* webpackChunkName: "AForm" */ "ant-design-vue/es/form")
                ]);

                Vue.ANT_D_V_COMPONENTS.AForm = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AIcon = false;
    window.Vue.component("AIcon", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/icon/style/index.css")),
                    import( /* webpackChunkName: "AIcon" */ "ant-design-vue/es/icon")
                ]);

                Vue.ANT_D_V_COMPONENTS.AIcon = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AInput = false;
    window.Vue.component("AInput", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/input/style/index.css")),
                    import( /* webpackChunkName: "AInput" */ "ant-design-vue/es/input")
                ]);

                Vue.ANT_D_V_COMPONENTS.AInput = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AInputNumber = false;
    window.Vue.component("AInputNumber", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/input-number/style/index.css")),
                    import( /* webpackChunkName: "AInputNumber" */ "ant-design-vue/es/input-number")
                ]);

                Vue.ANT_D_V_COMPONENTS.AInputNumber = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ALayout = false;
    window.Vue.component("ALayout", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/layout/style/index.css")),
                    import( /* webpackChunkName: "ALayout" */ "ant-design-vue/es/layout")
                ]);

                Vue.ANT_D_V_COMPONENTS.ALayout = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AList = false;
    window.Vue.component("AList", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/list/style/index.css")),
                    import( /* webpackChunkName: "AList" */ "ant-design-vue/es/list")
                ]);

                Vue.ANT_D_V_COMPONENTS.AList = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ALocaleProvider = false;
    window.Vue.component("ALocaleProvider", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/locale-provider/style/index.css")),
                    import( /* webpackChunkName: "ALocaleProvider" */ "ant-design-vue/es/locale-provider")
                ]);

                Vue.ANT_D_V_COMPONENTS.ALocaleProvider = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.undefined = false;
    window.Vue.component("undefined", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/message/style/index.css")),
                    import( /* webpackChunkName: "undefined" */ "ant-design-vue/es/message")
                ]);

                Vue.ANT_D_V_COMPONENTS.undefined = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AMenu = false;
    window.Vue.component("AMenu", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/menu/style/index.css")),
                    import( /* webpackChunkName: "AMenu" */ "ant-design-vue/es/menu")
                ]);

                Vue.ANT_D_V_COMPONENTS.AMenu = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AModal = false;
    window.Vue.component("AModal", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/modal/style/index.css")),
                    import( /* webpackChunkName: "AModal" */ "ant-design-vue/es/modal")
                ]);

                Vue.ANT_D_V_COMPONENTS.AModal = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.undefined = false;
    window.Vue.component("undefined", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/notification/style/index.css")),
                    import( /* webpackChunkName: "undefined" */ "ant-design-vue/es/notification")
                ]);

                Vue.ANT_D_V_COMPONENTS.undefined = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.APagination = false;
    window.Vue.component("APagination", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/pagination/style/index.css")),
                    import( /* webpackChunkName: "APagination" */ "ant-design-vue/es/pagination")
                ]);

                Vue.ANT_D_V_COMPONENTS.APagination = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.APopconfirm = false;
    window.Vue.component("APopconfirm", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/popconfirm/style/index.css")),
                    import( /* webpackChunkName: "APopconfirm" */ "ant-design-vue/es/popconfirm")
                ]);

                Vue.ANT_D_V_COMPONENTS.APopconfirm = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.APopover = false;
    window.Vue.component("APopover", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/popover/style/index.css")),
                    import( /* webpackChunkName: "APopover" */ "ant-design-vue/es/popover")
                ]);

                Vue.ANT_D_V_COMPONENTS.APopover = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AProgress = false;
    window.Vue.component("AProgress", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/progress/style/index.css")),
                    import( /* webpackChunkName: "AProgress" */ "ant-design-vue/es/progress")
                ]);

                Vue.ANT_D_V_COMPONENTS.AProgress = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ARadio = false;
    window.Vue.component("ARadio", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/radio/style/index.css")),
                    import( /* webpackChunkName: "ARadio" */ "ant-design-vue/es/radio")
                ]);

                Vue.ANT_D_V_COMPONENTS.ARadio = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ARate = false;
    window.Vue.component("ARate", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/rate/style/index.css")),
                    import( /* webpackChunkName: "ARate" */ "ant-design-vue/es/rate")
                ]);

                Vue.ANT_D_V_COMPONENTS.ARate = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ARow = false;
    window.Vue.component("ARow", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/row/style/index.css")),
                    import( /* webpackChunkName: "ARow" */ "ant-design-vue/es/row")
                ]);

                Vue.ANT_D_V_COMPONENTS.ARow = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ASelect = false;
    window.Vue.component("ASelect", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/select/style/index.css")),
                    import( /* webpackChunkName: "ASelect" */ "ant-design-vue/es/select")
                ]);

                Vue.ANT_D_V_COMPONENTS.ASelect = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ASlider = false;
    window.Vue.component("ASlider", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/slider/style/index.css")),
                    import( /* webpackChunkName: "ASlider" */ "ant-design-vue/es/slider")
                ]);

                Vue.ANT_D_V_COMPONENTS.ASlider = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ASpin = false;
    window.Vue.component("ASpin", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/spin/style/index.css")),
                    import( /* webpackChunkName: "ASpin" */ "ant-design-vue/es/spin")
                ]);

                Vue.ANT_D_V_COMPONENTS.ASpin = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AStatistic = false;
    window.Vue.component("AStatistic", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/statistic/style/index.css")),
                    import( /* webpackChunkName: "AStatistic" */ "ant-design-vue/es/statistic")
                ]);

                Vue.ANT_D_V_COMPONENTS.AStatistic = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ASteps = false;
    window.Vue.component("ASteps", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/steps/style/index.css")),
                    import( /* webpackChunkName: "ASteps" */ "ant-design-vue/es/steps")
                ]);

                Vue.ANT_D_V_COMPONENTS.ASteps = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ASwitch = false;
    window.Vue.component("ASwitch", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/switch/style/index.css")),
                    import( /* webpackChunkName: "ASwitch" */ "ant-design-vue/es/switch")
                ]);

                Vue.ANT_D_V_COMPONENTS.ASwitch = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ATable = false;
    window.Vue.component("ATable", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/table/style/index.css")),
                    import( /* webpackChunkName: "ATable" */ "ant-design-vue/es/table")
                ]);

                Vue.ANT_D_V_COMPONENTS.ATable = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ATransfer = false;
    window.Vue.component("ATransfer", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/transfer/style/index.css")),
                    import( /* webpackChunkName: "ATransfer" */ "ant-design-vue/es/transfer")
                ]);

                Vue.ANT_D_V_COMPONENTS.ATransfer = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ATree = false;
    window.Vue.component("ATree", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/tree/style/index.css")),
                    import( /* webpackChunkName: "ATree" */ "ant-design-vue/es/tree")
                ]);

                Vue.ANT_D_V_COMPONENTS.ATree = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ATreeSelect = false;
    window.Vue.component("ATreeSelect", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/tree-select/style/index.css")),
                    import( /* webpackChunkName: "ATreeSelect" */ "ant-design-vue/es/tree-select")
                ]);

                Vue.ANT_D_V_COMPONENTS.ATreeSelect = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ATabs = false;
    window.Vue.component("ATabs", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/tabs/style/index.css")),
                    import( /* webpackChunkName: "ATabs" */ "ant-design-vue/es/tabs")
                ]);

                Vue.ANT_D_V_COMPONENTS.ATabs = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ATag = false;
    window.Vue.component("ATag", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/tag/style/index.css")),
                    import( /* webpackChunkName: "ATag" */ "ant-design-vue/es/tag")
                ]);

                Vue.ANT_D_V_COMPONENTS.ATag = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ATimePicker = false;
    window.Vue.component("ATimePicker", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/time-picker/style/index.css")),
                    import( /* webpackChunkName: "ATimePicker" */ "ant-design-vue/es/time-picker")
                ]);

                Vue.ANT_D_V_COMPONENTS.ATimePicker = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ATimeline = false;
    window.Vue.component("ATimeline", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/timeline/style/index.css")),
                    import( /* webpackChunkName: "ATimeline" */ "ant-design-vue/es/timeline")
                ]);

                Vue.ANT_D_V_COMPONENTS.ATimeline = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ATooltip = false;
    window.Vue.component("ATooltip", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/tooltip/style/index.css")),
                    import( /* webpackChunkName: "ATooltip" */ "ant-design-vue/es/tooltip")
                ]);

                Vue.ANT_D_V_COMPONENTS.ATooltip = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AUpload = false;
    window.Vue.component("AUpload", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/upload/style/index.css")),
                    import( /* webpackChunkName: "AUpload" */ "ant-design-vue/es/upload")
                ]);

                Vue.ANT_D_V_COMPONENTS.AUpload = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.undefined = false;
    window.Vue.component("undefined", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/version/style/index.css")),
                    import( /* webpackChunkName: "undefined" */ "ant-design-vue/es/version")
                ]);

                Vue.ANT_D_V_COMPONENTS.undefined = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ADrawer = false;
    window.Vue.component("ADrawer", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/drawer/style/index.css")),
                    import( /* webpackChunkName: "ADrawer" */ "ant-design-vue/es/drawer")
                ]);

                Vue.ANT_D_V_COMPONENTS.ADrawer = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.ASkeleton = false;
    window.Vue.component("ASkeleton", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/skeleton/style/index.css")),
                    import( /* webpackChunkName: "ASkeleton" */ "ant-design-vue/es/skeleton")
                ]);

                Vue.ANT_D_V_COMPONENTS.ASkeleton = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AComment = false;
    window.Vue.component("AComment", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/comment/style/index.css")),
                    import( /* webpackChunkName: "AComment" */ "ant-design-vue/es/comment")
                ]);

                Vue.ANT_D_V_COMPONENTS.AComment = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AConfigProvider = false;
    window.Vue.component("AConfigProvider", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/config-provider/style/index.css")),
                    import( /* webpackChunkName: "AConfigProvider" */ "ant-design-vue/es/config-provider")
                ]);

                Vue.ANT_D_V_COMPONENTS.AConfigProvider = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

    Vue.ANT_D_V_COMPONENTS.AEmpty = false;
    window.Vue.component("AEmpty", (resolve, reject) => {
        (async () => {
            try {
                const res = await Promise.all([
                    $loadCSS($resolvePath("static/lib/antdv/es/empty/style/index.css")),
                    import( /* webpackChunkName: "AEmpty" */ "ant-design-vue/es/empty")
                ]);

                Vue.ANT_D_V_COMPONENTS.AEmpty = true;
                resolve(res[1].default);
            } catch (error) {
                reject(error)
            }
        })();
    });

};