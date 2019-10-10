(function (Vue) {
  // 在当前窗口作用域下，储存父窗口window对象
  window.win = self !== top ? window.parent : window;
  window.console.dev = function () {
    if (/localhost/g.test(location.href)) {
      var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
      try {
        throw new Error(args);
      } catch (error) {
        var optionString = error.stack.split("\n")[2];
        let regex = new RegExp("\(.*\)");
        let regexMatch = optionString.match(/\((.*)\)/ig);
        console.log(regexMatch[0]);
      }
      window.console.log.apply(console, args);
    }
  };
  /**
   * HTTP 请求处理
   */
  var http = Vue.prototype.$http = axios.create({
    baseURL: window.SITE_CONFIG["apiURL"],
    timeout: 1000 * 180,
    withCredentials: true
  });
  // 请求拦截
  http.interceptors.request.use(function (config) {
    ELEMENT.Loading.service({
      background: "rgba(255,255,255,0.1)",
      customClass: "none",
      spinner: "none",
    });
    config.headers["Accept-Language"] = Cookies.get("language") || "zh-CN";
    // 默认参数
    var defaults = {};
    // 防止缓存，GET请求默认带_t参数
    if (config.method === "get") {
      config.params = _.merge({}, config.params, {
        "_t": new Date().getTime()
      });
    }
    if (_.isPlainObject(config.params)) {
      config.params = _.merge({}, defaults, config.params);
    }
    if (_.isPlainObject(config.data)) {
      config.data = _.merge({}, defaults, config.data);
      if (/^application\/x-www-form-urlencoded/.test(config.headers["content-type"])) {
        config.data = Qs.stringify(config.data);
      }
    }
    return config;
  }, function (error) {
    ELEMENT.Loading.service({
      background: "transparent",
      customClass: ""
    }).close();
    return Promise.reject(error);
  });
  // 响应拦截
  http.interceptors.response.use(function (response) {
    ELEMENT.Loading.service().close();
    var whiteList = ["/gotoProjectRegister.do"];
    if (~whiteList.indexOf(location.pathname)) return response;
    if (localStorage.currentUser) {
      if (typeof response.data === "string") {
        var reg = new RegExp("<html|<body|<!DOCTYPE", "g");
        if (reg.test(response.data))
          return win.location.href = "/";
      }
      if (response.data.code === 500) {
        return Promise.reject(response.data.msg);
      }
      if (response.data.code === 401) {
        win.location.href = "/login.html";
      }
    }
    return response;
  }, function (error) {
    ELEMENT.Loading.service({
      background: "transparent",
      customClass: ""
    }).close();
    console.error(error);
    return Promise.reject(error);
  });

  /**
   * 权限
   */
  Vue.prototype.$hasPermission = function (key) {
    return win.SITE_CONFIG["permissions"].indexOf(key) !== -1 || false;
  };

  /**
   * 工具类
   */
  Vue.prototype.$utils = {

    formatDate: function (date) {
      /* ('YYYY-MM-DDTHH:mm:ss SSS [Z] A') */
      return dayjs(date).format("YYYY-MM-DD");
    },
    // 获取svg图标(id)列表
    transformDictType: function (dictType, value, scope) {
      var _this = this;
      var prop = scope.column.property;
      var IDBStorage = window.IDBStorage.default;
      var db = new IDBStorage();
      var sysDict = db.collection("sysDict");
      sysDict.find({
          dictType: {
            $eq: dictType
          },
          dictValue: {
            $eq: String(value)
          }
        }).then(function (_res) {
          _res = _res[0];
          scope.row[prop + "_t"] = _res;
          Vue.set(scope.row, prop + "_t", _res);
        })
        .catch(console.error.bind(console));

    },
    // 获取svg图标(id)列表
    getIconList: function () {
      var res = [];
      var list = document.querySelectorAll("svg symbol");
      for (var i = 0; i < list.length; i++) {
        res.push(list[i].id);
      }
      return res;
    },
    // 获取url地址栏参数
    getRequestParams: function () {
      var str = win.location.search || win.location.hash.indexOf("?") >= 1 ? win.location.hash.replace(/.*(\?.*)/, "$1") : "";
      var args = {};
      if (!/\^?(=+)/.test(str)) {
        return args;
      }
      var pairs = str.substring(1).split("&");
      var pos = null;
      for (var i = 0; i < pairs.length; i++) {
        pos = pairs[i].split("=");
        if (pos == -1) {
          continue;
        }
        args[pos[0]] = pos[1];
      }
      return args;
    }
  };

  /**
   * 验证
   */
  Vue.prototype.$validate = {
    // 邮箱
    isEmail: function (s) {
      return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
    },
    // 手机号码
    isMobile: function (s) {
      return /^1[0-9]{10}$/.test(s);
    },
    // 电话号码
    isPhone: function (s) {
      return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
    },
    // URL地址
    isURL: function (s) {
      return /^http[s]?:\/\/.*/.test(s);
    }
  };
  window.Vue = Vue;
})(window.Vue);


/* 路由跳转 */
(function () {
  var Route = {
    to: function (target, params) {
      var targetId = null;

      function go() {
        /* TODO：加上时间戳，可以完成过期失效EXPIRE */
        routeParams._timeStamp = Date.now();
        localStorage.setItem("RouteParams", JSON.stringify(routeParams));
        /* 跳转 */
        win.location.hash = _.isString(target) ? target : target.name;
      }

      if (_.isString(target)) {
        // var oldParms = routeParams[targetId];
        targetId = _.camelCase(target);
      } else if (_.isObject(target)) {
        win.SITE_CONFIG["routeList"].push(target);
        targetId = _.camelCase(target.name);
      } else {
        return console.error("route 信息有误");
      }
      /* 如果传参 */
      var objString = localStorage.getItem("RouteParams");
      var routeParams = objString ? JSON.parse(objString) : {};
      if (_.isObject(params)) {
        /* 刷新页面 */
        routeParams[targetId] = params;
        /* 已经打开 */
        if (win.vm.$iframes[targetId]) {
          go();
          /*跳转并刷新*/
          return win.vm.$iframes[targetId].location.reload();
        } else {
          return go();
        }
      } else {
        /* 已经打开 */
        if (win.vm.$iframes[targetId]) {
          /* 保持以前，只是跳转 */
          return go();
        } else {
          /*清空以前的数据*/
          routeParams[targetId] = {};
          return go();
        }
      }
    },
    get: function (prop /* 有参数就是参数对应的值否则就是整个对象 */ , needClear) {
      var objString = localStorage.getItem("RouteParams");
      var routeParams = objString ? JSON.parse(objString) : {};
      var targetParam = routeParams[Route.id] || {};
      if (needClear) {
        /* 清空对应的整个params */
        routeParams[Route.id] = {};
        localStorage.setItem("RouteParams", JSON.stringify(routeParams));
      }
      return (_.isString(prop) && prop) ? targetParam[prop] : targetParam;
    },
    set: function (prop, value) {
      var objString = localStorage.getItem("RouteParams");
      var routeParams = objString ? JSON.parse(objString) : {};
      var targetParam = routeParams[Route.id] || {};
      targetParam[prop] = value;
      routeParams[Route.id] = targetParam;
      localStorage.setItem("RouteParams", JSON.stringify(routeParams));
      return;
    }
  };

  Object.defineProperty(Route, "id", {
    get: function () {
      /* 根据当前页的hash确定id */
      return _.camelCase(window.win.location.hash);
    }
  });
  window.Route = Route;
})();