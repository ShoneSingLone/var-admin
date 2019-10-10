(function (Vue) {
  window.win = self !== top ? window.parent : window;
  window.console.table = window.console.table || window.console.log;
  Vue.prototype.ruleCollection = {};
  /*  */

  Vue.prototype.$showImgs = function (items, index) {
    var _vm = window.win ? window.win.vm : window.vm;

    index = index || 0;

    _vm
      .setImgItems(items)
      .setImgIndex(index)
      .showImgs();
  };
  /*  */

  Vue.prototype.$getRules = function (mockRemoteRules) {
    function getValidateFunction(key) {
      var baseResult = key.match(/length\[(\w+),(\w+)\]/);

      if (baseResult) {
        return true;
      } else {
        return false;
      }
    }
    /* 后端返回的 */

    /*var mockRemoteRules = {
      /!* 左边key是表单绑定prop；右边数组里的value与formRules.js添加的字段对应 *!/
      firstName: ['required'],
      birth: ['entrytime'],
      phone: ['required', 'entrytime']
    };*/

    var targetRules = {};
    /*  */

    for (var field in mockRemoteRules) {
      /* const ruleKeyArray = JSON.parse(JSON.stringify(mockRemoteRules[field])); */
      var ruleKeyArray = mockRemoteRules[field];
      /*
       * $ruleCollection为实例可以访问的属性：vm.$ruleCollection
       * <el-item :model="firstName" prop='firstName' :rules="$ruleCollection['firstName']" ></el-item>
       */

      targetRules[field] = ruleKeyArray.map(function (ruleKey) {
        /* var resLength = getValidateFunction(ruleKey); */
        var ruleObj;
        var resLength = ruleKey.match(/length\[(\w+),(\w+)\]/);
        if (resLength && resLength.length > 1) {
          ruleObj = window.formValidate.length(resLength[1], resLength[2]);
        } else {
          ruleObj = window.formValidate[ruleKey];
        }
        if (ruleObj) return ruleObj;
        alert(ruleKey + "未找到匹配的验证规则");
      });
    }
    /*
     * 转换结果
     *      {
     *        "firstName": [
     *            {
     *            "required": true,
     *            "message": "此项必填！",
     *            "trigger": "blur"
     *            }
     *        ],
     *       ...
     *      }
     */

    return targetRules;
  };
  /**
   * 获取rules
   *
   * @returns
   */

  function getRuleCollectionFromRemote() {
    return new Promise(function (resolve, reject) {
      /* 从url获取当前模块表单验证的规则 */
      var currentModuleRulesKey = location.href.match(/\/(\w+).html/);

      if (currentModuleRulesKey && currentModuleRulesKey.length > 1) {
        currentModuleRulesKey = currentModuleRulesKey[1];
        /* 排除index页面 */

        var breakArray = ["index", "dept"];

        if (~breakArray.indexOf(currentModuleRulesKey)) {
          return resolve();
        }
        /* 发请求得到Rules 拿到rules*/

        window.axios
          .post("/security/validate/getRules", {
            key: currentModuleRulesKey
          })
          .then(function (res) {
            function getValidateFunction(key) {
              var baseResult = key.match(/length\[(\w+),(\w+)\]/);

              if (baseResult) {
                return true;
              } else {
                return false;
              }
            }
            /* 后端返回的 */

            /*var mockRemoteRules = {
            /!* 左边key是表单绑定prop；右边数组里的value与formRules.js添加的字段对应 *!/
            firstName: ['required'],
            birth: ['entrytime'],
            phone: ['required', 'entrytime']
          };*/

            var mockRemoteRules = res.data;
            var targetRules = {};
            /*  */

            for (var field in mockRemoteRules) {
              /* const ruleKeyArray = JSON.parse(JSON.stringify(mockRemoteRules[field])); */
              var ruleKeyArray = mockRemoteRules[field];
              /*
               * $ruleCollection为实例可以访问的属性：vm.$ruleCollection
               * <el-item :model="firstName" prop='firstName' :rules="$ruleCollection['firstName']" ></el-item>
               */

              targetRules[field] = ruleKeyArray.map(function (ruleKey) {
                var ruleObj; // var resLength = getValidateFunction(ruleKey);

                var resLength = ruleKey.match(/length\[(\w+),(\w+)\]/);

                if (resLength && resLength.length > 1) {
                  ruleObj = window.formValidate.length(
                    resLength[1],
                    resLength[2]
                  );
                } else {
                  ruleObj = window.formValidate[ruleKey];
                }

                if (ruleObj) return ruleObj;
                alert(ruleKey + "未找到匹配的验证规则");
              });
            }
            /*
             * 转换结果
             *      {
             *        "firstName": [
             *            {
             *            "required": true,
             *            "message": "此项必填！",
             *            "trigger": "blur"
             *            }
             *        ],
             *       ...
             *      }
             */

            Vue.prototype.$ruleCollection = targetRules;
            return resolve(Vue);
          });
      } else {
        var message = "无法获取当前模块验证规则";
        console.log()(message);
        return reject(message);
      }
    });
  }
  /**
   *
   * 同步转码表
   *
   * @returns Promise.resolve()
   */

  function syncDict() {
    var _sysDict = {};
    /* 如果shell已经加载，不需要再次查询*/

    if (window.parent && window.parent.sysDict) {
      window.sysDict = window.parent.sysDict;
      return Promise.resolve();
    }

    var sysDictTypeList = [];
    var IDBStorage = window.IDBStorage && window.IDBStorage.default || false;
    if (!IDBStorage) return Promise.resolve(false);
    var db = new IDBStorage();
    var sysDict = db.collection("sysDict");
    /*return sysDict
      .find({
        pid: {
          $eq: "0"
        }
      })
      .then(function (typeList) {
    	  let log=typeList.filter((a)=>{
    		  return a.pid==="0";
    		  })
    		  .sort((a,b)=>{
    			  return a.id-b.id;
    			  })
    	  console.table(log);
    	  
        sysDictTypeList = typeList.map(function (type) {
          return type.dictType;
        });
        return Promise.all(
          sysDictTypeList.map(function (sysDictType) {
            return sysDict.find({
              pid: {
                $ne: '0'
              },
              dictType: {
                $eq: sysDictType
              }
            });
          })
        );
      })*/

    return sysDict.find().then(function (sysDictList) {
      var _sysDict = {}; //    	console.time("_sysDict");

      for (var index = 0; index < sysDictList.length; index++) {
        var sysDict = sysDictList[index];
        _sysDict[sysDict.dictType] = _sysDict[sysDict.dictType] || [];

        _sysDict[sysDict.dictType].push(sysDict);
      } //        console.timeEnd("_sysDict");

      if (window.parent) {
        window.parent.sysDict = window.sysDict = _sysDict;
      }

      return Promise.resolve();
    });

    /*.then(function (sysDictList) {
      for (var index = 0; index < sysDictTypeList.length; index++) {
        var key = sysDictTypeList[index];
        _sysDict[key] = sysDictList[index];
      }
       if (window.parent) {
        window.parent.sysDict = window.sysDict = _sysDict;
      }
      return Promise.resolve();
    });*/
  }

  function loadAreaToGlobalValue() {
    return window.idb.get("sysArea").then(function (res) {
      window.globalValue = window.globalValue || {};
      window.globalValue.regionOptions = res;
      return Promise.resolve(window.globalValue.regionOptions);
    });
  }
  /**
   * 加载静态资源
   *
   * @param {any} prefixPath 可以根据是否本地切换单独的服务器
   * @returns
   */

  window.Vue.initAppStaticResource = function () {
    /* 懒加载组件 */
    Vue.lazyLoadComponents([
      "ElCForm",
      "ElCFormItem",
      "ElQuery",
      "ElIndustry",
      "ElSubPage",
      "ElAdministrative",
      "ElS"
    ], Vue.resolvePath("statics/components"));

    return Promise.all([
      syncDict(),
      loadAreaToGlobalValue()
    ]);
  };
})(window.Vue);
