var Vue = window.Vue;
var $ = window.$;
var MODE_MAP = true;
var currentMode = MODE_MAP;

/* HRM CSS 热更新 开发模式下 */
if (/localhost/g.test(location.href)) {
    Vue.loadJS([
            ["socket-io-2.2.0", Vue.resolvePath("statics/plugins/socket.io-2.2.0/socket.io.js")]
        ])
        .then(function () {
            var socket = window.io();
            socket.on("updateCSS", function () {
                $("#main-style").attr("href", "/statics/css/main.css?_t=" + Date.now());
            });
        })
        .catch(console.error.bind(console));
}

window.mixinsFilters = {
    filters: {
        convertDict: function convertDict(value, dictType) {
            function getName(collection) {
                var res = value;

                for (var index = 0; index < collection.length; index++) {
                    var element = collection[index];

                    if (element.dictValue === String(value)) {
                        res = element.dictName;
                        break;
                    }
                }

                return res;
            }

            if (!window.sysDict || !window.sysDict[dictType]) {
                /* F12 application 本地是否有数据；字段是否与数据匹配 */
                return console.warn("数据资料未加载");
            }

            return getName(window.sysDict[dictType]);
        }
    }
};

Vue.prototype.$showImgs = function (items, index) {
    var imgViewer = window.VueServer.imgViewer;
    index = index || 0;
    imgViewer
        .setImgs(items)
        .setIndex(index)
        .show();
};

Vue.prototype.$callMethod = function (method, args) {
    var src = args.row[args.prop];
    window.vm && window.vm[method] && window.vm[method](src);
};

Vue.componentList = Vue.componentList || {};
/* 通用 */

window.submixin = {
    data: function data() {
        return {
            paginationInfo: {
                total: 0,
                page: 1,
                limit: 10
            }
        };
    }
};
/* 修改页面Title */
var currentComponentIdName = window.urlArgs().page;
if (!currentComponentIdName) {
    currentComponentIdName = "PageDevDoc";
    Vue.lazyLoadComponents([currentComponentIdName], Vue.resolvePath("statics/modules/devdoc"));
}

function initIndexedDbInfo() {
    return Promise.resolve();
}

(function () {
    /* 剩下的组件以懒加载方式加载 */
    var $template = $("#template-hidden #app-wrapper");
    var templateString = $template[0].innerHTML;
    var vmOptions = {
        // components: Vue.componentList,
        template: templateString,
        name: "SubPage",
        provide: function provide() {
            return {
                /* map-conditions
                 * 使用 */
                APP: this
            };
        },
        beforeMount: function beforeMount() {},
        mounted: function mounted() {
            var _this = this;
            setTimeout(function () {
                $("#init").replaceWith(_this.$el);
                $template.remove();
                $template = null;
            }, 600);
        },
        data: function data() {
            return {
                currentMode: currentMode,
                /* 当前页面组件Name：String */
                currentComponentIdName: currentComponentIdName
            };
        },
        computed: {},
        methods: {}
    };
    var vm = (window.vm = new Vue(vmOptions));
    vm.$mount();
})();