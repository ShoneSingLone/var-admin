const fs = require("fs-extra");
const _ = require("lodash");
const antdv = require("ant-design-vue");
// _.forIn(antdv, (value, key) => console.log(key));
const antdMap = {
    Affix: "affix",
    Anchor: "anchor",
    AutoComplete: "auto-complete",
    Alert: "alert",
    Avatar: "avatar",
    BackTop: "back-top",
    Badge: "badge",
    Base: "base",
    Breadcrumb: "breadcrumb",
    Button: "button",
    Calendar: "calendar",
    Card: "card",
    Collapse: "collapse",
    Carousel: "carousel",
    Cascader: "cascader",
    Checkbox: "checkbox",
    Col: "col",
    DatePicker: "date-picker",
    Divider: "divider",
    Dropdown: "dropdown",
    Form: "form",
    Icon: "icon",
    Input: "input",
    InputNumber: "input-number",
    Layout: "layout",
    List: "list",
    LocaleProvider: "locale-provider",
    message: "message",
    Menu: "menu",
    Modal: "modal",
    notification: "notification",
    Pagination: "pagination",
    Popconfirm: "popconfirm",
    Popover: "popover",
    Progress: "progress",
    Radio: "radio",
    Rate: "rate",
    Row: "row",
    Select: "select",
    Slider: "slider",
    Spin: "spin",
    Statistic: "statistic",
    Steps: "steps",
    Switch: "switch",
    Table: "table",
    Transfer: "transfer",
    Tree: "tree",
    TreeSelect: "tree-select",
    Tabs: "tabs",
    Tag: "tag",
    TimePicker: "time-picker",
    Timeline: "timeline",
    Tooltip: "tooltip",
    Upload: "upload",
    version: "version",
    Drawer: "drawer",
    Skeleton: "skeleton",
    Comment: "comment",
    ConfigProvider: "config-provider",
    Empty: "empty",
};

var temp = `
/* eslint-disable */
__webpack_public_path__ = window.__webpack_public_path__;

window.LAZY_LOADER.antdv=async () => {
    import base from "ant-design-vue/es/base";
    const {
        _: {
            $loadCSS,
            $resolvePath,
        },
        Vue
    } = window;
    Vue.ANT_D_V_COMPONENTS = {};
    $loadCSS($resolvePath("static/lib/antdv/es/style/index.css"))
    .catch(function (error) {
        console.error(error);
    });
    Vue.use(base);

    ${loadComponent(antdMap).join("")}
};
`;

function loadComponent(antdMap) {
    return _.map(antdMap, (path, key) => `
    Vue.ANT_D_V_COMPONENTS.${antdv[key].name}=false;
    window.Vue.component("${antdv[key].name}", function (resolve,reject) {
        Promise.all([
            $loadCSS($resolvePath("static/lib/antdv/es/${path}/style/index.css")),
            import( /* webpackChunkName: "${antdv[key].name}" */ "ant-design-vue/es/${path}")
        ])
        .then(function (res) {
            Vue.ANT_D_V_COMPONENTS.${antdv[key].name}=true;
            resolve(res[1].default);
        })
        .catch(reject);
    });
    `);
}

fs.writeFileSync("./antdv.js", temp);
console.log("make antdv file done");