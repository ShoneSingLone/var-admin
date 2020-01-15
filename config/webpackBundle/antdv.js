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
    Promise.all([
            $loadCSS($resolvePath("static/lib/antdv/es/style/index.css")),
            import("ant-design-vue/es/base"),
        ])
        .then(function (res) {
            debugger;
            Vue.use(res[1].default);
        })
        .catch(function (error) {
            console.error(error);
        });

    Vue.ANT_D_V_COMPONENTS = {};

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
    window.Vue.component("AAnchor", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/anchor/style/index.css")),
                import( /* webpackChunkName: "AAnchor" */ "ant-design-vue/es/anchor")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AAnchor = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AAutoComplete = false;
    window.Vue.component("AAutoComplete", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/auto-complete/style/index.css")),
                import( /* webpackChunkName: "AAutoComplete" */ "ant-design-vue/es/auto-complete")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AAutoComplete = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AAlert = false;
    window.Vue.component("AAlert", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/alert/style/index.css")),
                import( /* webpackChunkName: "AAlert" */ "ant-design-vue/es/alert")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AAlert = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AAvatar = false;
    window.Vue.component("AAvatar", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/avatar/style/index.css")),
                import( /* webpackChunkName: "AAvatar" */ "ant-design-vue/es/avatar")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AAvatar = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ABackTop = false;
    window.Vue.component("ABackTop", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/back-top/style/index.css")),
                import( /* webpackChunkName: "ABackTop" */ "ant-design-vue/es/back-top")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ABackTop = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ABadge = false;
    window.Vue.component("ABadge", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/badge/style/index.css")),
                import( /* webpackChunkName: "ABadge" */ "ant-design-vue/es/badge")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ABadge = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.undefined = false;
    window.Vue.component("undefined", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/base/style/index.css")),
                import( /* webpackChunkName: "undefined" */ "ant-design-vue/es/base")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.undefined = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ABreadcrumb = false;
    window.Vue.component("ABreadcrumb", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/breadcrumb/style/index.css")),
                import( /* webpackChunkName: "ABreadcrumb" */ "ant-design-vue/es/breadcrumb")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ABreadcrumb = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AButton = false;
    window.Vue.component("AButton", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/button/style/index.css")),
                import( /* webpackChunkName: "AButton" */ "ant-design-vue/es/button")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AButton = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ACalendar = false;
    window.Vue.component("ACalendar", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/calendar/style/index.css")),
                import( /* webpackChunkName: "ACalendar" */ "ant-design-vue/es/calendar")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ACalendar = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ACard = false;
    window.Vue.component("ACard", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/card/style/index.css")),
                import( /* webpackChunkName: "ACard" */ "ant-design-vue/es/card")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ACard = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ACollapse = false;
    window.Vue.component("ACollapse", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/collapse/style/index.css")),
                import( /* webpackChunkName: "ACollapse" */ "ant-design-vue/es/collapse")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ACollapse = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ACarousel = false;
    window.Vue.component("ACarousel", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/carousel/style/index.css")),
                import( /* webpackChunkName: "ACarousel" */ "ant-design-vue/es/carousel")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ACarousel = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ACascader = false;
    window.Vue.component("ACascader", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/cascader/style/index.css")),
                import( /* webpackChunkName: "ACascader" */ "ant-design-vue/es/cascader")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ACascader = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ACheckbox = false;
    window.Vue.component("ACheckbox", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/checkbox/style/index.css")),
                import( /* webpackChunkName: "ACheckbox" */ "ant-design-vue/es/checkbox")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ACheckbox = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ACol = false;
    window.Vue.component("ACol", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/col/style/index.css")),
                import( /* webpackChunkName: "ACol" */ "ant-design-vue/es/col")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ACol = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ADatePicker = false;
    window.Vue.component("ADatePicker", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/date-picker/style/index.css")),
                import( /* webpackChunkName: "ADatePicker" */ "ant-design-vue/es/date-picker")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ADatePicker = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ADivider = false;
    window.Vue.component("ADivider", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/divider/style/index.css")),
                import( /* webpackChunkName: "ADivider" */ "ant-design-vue/es/divider")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ADivider = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ADropdown = false;
    window.Vue.component("ADropdown", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/dropdown/style/index.css")),
                import( /* webpackChunkName: "ADropdown" */ "ant-design-vue/es/dropdown")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ADropdown = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AForm = false;
    window.Vue.component("AForm", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/form/style/index.css")),
                import( /* webpackChunkName: "AForm" */ "ant-design-vue/es/form")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AForm = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AIcon = false;
    window.Vue.component("AIcon", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/icon/style/index.css")),
                import( /* webpackChunkName: "AIcon" */ "ant-design-vue/es/icon")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AIcon = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AInput = false;
    window.Vue.component("AInput", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/input/style/index.css")),
                import( /* webpackChunkName: "AInput" */ "ant-design-vue/es/input")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AInput = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AInputNumber = false;
    window.Vue.component("AInputNumber", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/input-number/style/index.css")),
                import( /* webpackChunkName: "AInputNumber" */ "ant-design-vue/es/input-number")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AInputNumber = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ALayout = false;
    window.Vue.component("ALayout", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/layout/style/index.css")),
                import( /* webpackChunkName: "ALayout" */ "ant-design-vue/es/layout")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ALayout = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AList = false;
    window.Vue.component("AList", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/list/style/index.css")),
                import( /* webpackChunkName: "AList" */ "ant-design-vue/es/list")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AList = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ALocaleProvider = false;
    window.Vue.component("ALocaleProvider", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/locale-provider/style/index.css")),
                import( /* webpackChunkName: "ALocaleProvider" */ "ant-design-vue/es/locale-provider")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ALocaleProvider = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.undefined = false;
    window.Vue.component("undefined", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/message/style/index.css")),
                import( /* webpackChunkName: "undefined" */ "ant-design-vue/es/message")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.undefined = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AMenu = false;
    window.Vue.component("AMenu", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/menu/style/index.css")),
                import( /* webpackChunkName: "AMenu" */ "ant-design-vue/es/menu")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AMenu = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AModal = false;
    window.Vue.component("AModal", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/modal/style/index.css")),
                import( /* webpackChunkName: "AModal" */ "ant-design-vue/es/modal")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AModal = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.undefined = false;
    window.Vue.component("undefined", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/notification/style/index.css")),
                import( /* webpackChunkName: "undefined" */ "ant-design-vue/es/notification")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.undefined = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.APagination = false;
    window.Vue.component("APagination", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/pagination/style/index.css")),
                import( /* webpackChunkName: "APagination" */ "ant-design-vue/es/pagination")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.APagination = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.APopconfirm = false;
    window.Vue.component("APopconfirm", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/popconfirm/style/index.css")),
                import( /* webpackChunkName: "APopconfirm" */ "ant-design-vue/es/popconfirm")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.APopconfirm = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.APopover = false;
    window.Vue.component("APopover", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/popover/style/index.css")),
                import( /* webpackChunkName: "APopover" */ "ant-design-vue/es/popover")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.APopover = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AProgress = false;
    window.Vue.component("AProgress", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/progress/style/index.css")),
                import( /* webpackChunkName: "AProgress" */ "ant-design-vue/es/progress")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AProgress = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ARadio = false;
    window.Vue.component("ARadio", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/radio/style/index.css")),
                import( /* webpackChunkName: "ARadio" */ "ant-design-vue/es/radio")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ARadio = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ARate = false;
    window.Vue.component("ARate", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/rate/style/index.css")),
                import( /* webpackChunkName: "ARate" */ "ant-design-vue/es/rate")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ARate = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ARow = false;
    window.Vue.component("ARow", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/row/style/index.css")),
                import( /* webpackChunkName: "ARow" */ "ant-design-vue/es/row")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ARow = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ASelect = false;
    window.Vue.component("ASelect", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/select/style/index.css")),
                import( /* webpackChunkName: "ASelect" */ "ant-design-vue/es/select")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ASelect = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ASlider = false;
    window.Vue.component("ASlider", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/slider/style/index.css")),
                import( /* webpackChunkName: "ASlider" */ "ant-design-vue/es/slider")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ASlider = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ASpin = false;
    window.Vue.component("ASpin", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/spin/style/index.css")),
                import( /* webpackChunkName: "ASpin" */ "ant-design-vue/es/spin")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ASpin = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AStatistic = false;
    window.Vue.component("AStatistic", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/statistic/style/index.css")),
                import( /* webpackChunkName: "AStatistic" */ "ant-design-vue/es/statistic")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AStatistic = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ASteps = false;
    window.Vue.component("ASteps", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/steps/style/index.css")),
                import( /* webpackChunkName: "ASteps" */ "ant-design-vue/es/steps")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ASteps = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ASwitch = false;
    window.Vue.component("ASwitch", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/switch/style/index.css")),
                import( /* webpackChunkName: "ASwitch" */ "ant-design-vue/es/switch")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ASwitch = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ATable = false;
    window.Vue.component("ATable", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/table/style/index.css")),
                import( /* webpackChunkName: "ATable" */ "ant-design-vue/es/table")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ATable = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ATransfer = false;
    window.Vue.component("ATransfer", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/transfer/style/index.css")),
                import( /* webpackChunkName: "ATransfer" */ "ant-design-vue/es/transfer")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ATransfer = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ATree = false;
    window.Vue.component("ATree", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/tree/style/index.css")),
                import( /* webpackChunkName: "ATree" */ "ant-design-vue/es/tree")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ATree = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ATreeSelect = false;
    window.Vue.component("ATreeSelect", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/tree-select/style/index.css")),
                import( /* webpackChunkName: "ATreeSelect" */ "ant-design-vue/es/tree-select")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ATreeSelect = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ATabs = false;
    window.Vue.component("ATabs", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/tabs/style/index.css")),
                import( /* webpackChunkName: "ATabs" */ "ant-design-vue/es/tabs")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ATabs = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ATag = false;
    window.Vue.component("ATag", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/tag/style/index.css")),
                import( /* webpackChunkName: "ATag" */ "ant-design-vue/es/tag")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ATag = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ATimePicker = false;
    window.Vue.component("ATimePicker", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/time-picker/style/index.css")),
                import( /* webpackChunkName: "ATimePicker" */ "ant-design-vue/es/time-picker")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ATimePicker = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ATimeline = false;
    window.Vue.component("ATimeline", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/timeline/style/index.css")),
                import( /* webpackChunkName: "ATimeline" */ "ant-design-vue/es/timeline")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ATimeline = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ATooltip = false;
    window.Vue.component("ATooltip", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/tooltip/style/index.css")),
                import( /* webpackChunkName: "ATooltip" */ "ant-design-vue/es/tooltip")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ATooltip = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AUpload = false;
    window.Vue.component("AUpload", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/upload/style/index.css")),
                import( /* webpackChunkName: "AUpload" */ "ant-design-vue/es/upload")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AUpload = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.undefined = false;
    window.Vue.component("undefined", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/version/style/index.css")),
                import( /* webpackChunkName: "undefined" */ "ant-design-vue/es/version")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.undefined = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ADrawer = false;
    window.Vue.component("ADrawer", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/drawer/style/index.css")),
                import( /* webpackChunkName: "ADrawer" */ "ant-design-vue/es/drawer")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ADrawer = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.ASkeleton = false;
    window.Vue.component("ASkeleton", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/skeleton/style/index.css")),
                import( /* webpackChunkName: "ASkeleton" */ "ant-design-vue/es/skeleton")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.ASkeleton = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AComment = false;
    window.Vue.component("AComment", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/comment/style/index.css")),
                import( /* webpackChunkName: "AComment" */ "ant-design-vue/es/comment")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AComment = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AConfigProvider = false;
    window.Vue.component("AConfigProvider", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/config-provider/style/index.css")),
                import( /* webpackChunkName: "AConfigProvider" */ "ant-design-vue/es/config-provider")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AConfigProvider = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

    Vue.ANT_D_V_COMPONENTS.AEmpty = false;
    window.Vue.component("AEmpty", function (resolve, reject) {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/empty/style/index.css")),
                import( /* webpackChunkName: "AEmpty" */ "ant-design-vue/es/empty")
            ])
            .then(function (res) {
                Vue.ANT_D_V_COMPONENTS.AEmpty = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });

};