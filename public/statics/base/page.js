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
    var self = this; // self.checkDict()

    /* var tableSysDictDataArray = window.mock.indexedDB.select; */

    var IDBStorage = window.IDBStorage.default;
    var db = new IDBStorage();
    var sysDict = db.collection("sysDict");
    /*
     * 每次登陆成功都会发请求检测是否需要更新
     * 如果
     * isNeedUpdate，total
     */

    var limit = 1000;
    var oldDBVersion, newDBversion;
    return Promise.all([
            window.idb.get("sysDictVersion"),
            self.$http.get("/sys/dict/loadStatu")
        ])
        .then(function (results) {
            oldDBVersion = String(results[0] || 0);
            var res = results[1] && results[1].data;

            if (typeof res === "string") {
                win.location.href = "/";
            }

            if (res.code !== 0) {
                self.$message.error(res.msg);
                return Promise.reject(res.msg);
            }

            res = res.data;
            /* res = { id: "", name: "", quantity: "", remarks: "", status: ""} */

            /* 根据res的信息得出isNeedUpdate，total */

            newDBversion = String(res.status);
            var isNeedUpdate = oldDBVersion !== newDBversion;
            var total = Number(res.quantity);

            if (isNeedUpdate) {
                /* 分批次 */
                return Promise.all(
                    Array.apply(null, Array(Math.ceil(total / limit))).map(function (
                        _,
                        index
                    ) {
                        /* index从0开始， */
                        var page = index + 1;
                        /* 分页查询 */

                        return self.$http.get("/sys/dict/loadDict", {
                            params: {
                                order: "",
                                orderField: "",
                                page: page,
                                limit: limit
                            }
                        });
                    })
                );
            } else {
                return Promise.resolve({
                    isSuccess: true,
                    msg: "已是最新"
                });
            }
        })
        .then(function (res) {
            if (res && res.isSuccess) {
                console.info("Dict State: " + res.msg);
                return Promise.resolve(res.msg);
            }

            if (res.length > 0) {
                return Promise.all(
                    res.map(function (res) {
                        res = res.data;

                        if (res.code !== 0) {
                            self.$message.error(res.msg);
                            return Promise.reject(res.msg);
                        }

                        res = res.data;
                        return sysDict.insert(res.list);
                    })
                );
            } else {
                return Promise.reject("loadDict有误，数据量为0");
            }
        })
        .then(function () {
            /* 修改版本号 */
            return window.idb.set("sysDictVersion", newDBversion);
        });
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
    initIndexedDbInfo = initIndexedDbInfo.bind(vm);
    initIndexedDbInfo()
        .then(function () {
            var IDBStorage =
                (window.IDBStorage && window.IDBStorage.default) || false;
            if (!IDBStorage) return Promise.resolve(false);
            var db = new IDBStorage();
            var sysDict = db.collection("sysDict");
            return sysDict.find().then(function (sysDictList) {
                var _sysDict = {};

                for (var index = 0; index < sysDictList.length; index++) {
                    var sysDict = sysDictList[index];
                    _sysDict[sysDict.dictType] = _sysDict[sysDict.dictType] || [];

                    _sysDict[sysDict.dictType].push(sysDict);
                }

                if (window.parent) {
                    window.parent.sysDict = window.sysDict = _sysDict;
                }

                return Promise.resolve();
            });
        })
        .then(function () {
            vm.$mount();
        })
        .catch(function (error) {
            console.error(error);
        });
})();