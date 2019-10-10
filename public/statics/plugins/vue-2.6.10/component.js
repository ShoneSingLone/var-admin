/* addComponents */
(function ($) {
    /**
     * 
     * 处理静态资源链接
     * @param {any} subPath "resources/"后面的部分
     * @returns 
     */
    window.Vue.resolvePath = function (subPath) {
        var mainPathArray = ((localStorage.requestContextPath || '').split('/')).filter(function (content) {
            return content;
        });
        mainPathArray = (window.urlArgs().isDev ? './main/resources/'.split('/') : mainPathArray).filter(function (content) {
            return content;
        });
        var res = mainPathArray.concat([subPath]).join('/');
        console.log('path: ', res);
        return res;
    };
    window.Vue.log = function () {
        try {
            throw new Error();
        } catch (error) {
            var optionString = error.stack.split('\n')[2];
            var regexMatch = optionString.match(/\((.*)\)/gi);
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            console.log.apply(console, [regexMatch[0], '\n'].concat(args));
        }
    };



    /* addComponents */
    window.Vue.componentList = window.Vue.componentList || {};
    window.Vue.JSList = window.Vue.JSList || {};
    window.Vue.CSSList = window.Vue.CSSList || {};

    /**
     * @param {any} component 必须有name属性与文件名相同
     */
    window.Vue.addC = function (component) {
        if (!component.name) console.error(component, 'component no name');
        window.Vue.componentList[component.name] = Promise.resolve(component);
    };

    /**
     * 
     * 
     * @param {any} componentNameArray 组件名字组成的数组
     * @param {any} baseUrl 这一组组件的路径前缀
     * @returns Promise
     */

    window.Vue.loadComponent = function (componentNameArray, baseUrl) {
        var jsPromiseArray = componentNameArray.map(function (componentName) {
            if (window.Vue.componentList[componentName]) {
                /* 已被添加，不需要重复添加 */
                return Promise.resolve(componentName);
            }
            return new Promise(function (resolve, reject) {
                    if (!baseUrl) {
                        return alert('未设置 loadComponent baseUrl');
                    }
                    var scriptID = 'component-' + componentName;
                    var $script = $('#' + scriptID);

                    if ($script.length === 0) {
                        var script = document.createElement('script');
                        script.id = scriptID;
                        script.src = [baseUrl, componentName, componentName].join('/') + '.js';
                        script.onload = function () {
                            script.onload = script.onerror = null;
                            resolve(window.Vue.componentList[componentName]);
                        };
                        script.onerror = function (event) {
                            console.warn(event);
                            script.onload = script.onerror = null;
                            reject(event);
                        };
                        document.getElementsByTagName('head')[0].appendChild(script);
                    }

                })
                .then(function (targetNeedTemplate) {
                    return new Promise(function (resolve, reject) {
                        $.ajax({
                                url: [baseUrl, componentName, componentName].join('/') + '.html',
                                type: 'GET',
                                dataType: 'html',
                            })
                            .done(function success(templateString) {
                                if (targetNeedTemplate) {
                                    targetNeedTemplate.template = templateString;
                                    window.Vue.componentList[componentName] = targetNeedTemplate;
                                    resolve(window.Vue.componentList[componentName]);
                                } else {
                                    reject(console.warn(componentName + '加载错误'));
                                }
                            })
                            .fail(function (error) {
                                console.warn(error);
                                reject(error);
                            });
                    });

                });
        });
        return Promise.all(jsPromiseArray);
    };

    window.Vue.loadCSS = function (CSSArray) {
        var cssPromiseArray = CSSArray.map(function (cssObjArray) {
            var cssId = cssObjArray[0];
            var cssPath = cssObjArray[1];
            return new Promise(function (resolve, reject) {
                if (window.Vue.CSSList[cssId]) {
                    /* 已被添加，不需要重复添加 */
                    resolve(window.Vue.CSSList[cssId]);
                } else {
                    if (!cssPath) {
                        return alert('未设置 loadCSS cssPath');
                    }
                    var linkID = 'link-' + cssId;
                    var $link = $('#' + linkID);

                    if ($link.length === 0) {
                        var linkEle = document.createElement('link');
                        linkEle.id = linkID;
                        linkEle.href = cssPath;
                        linkEle.rel = 'stylesheet';

                        linkEle.onload = linkEle.onreadystatechange = function (event) {
                            linkEle.onload = linkEle.onreadystatechange = linkEle.onerror = null;
                            resolve(event);
                        };

                        linkEle.onerror = function (event) {
                            console.warn(event);
                            linkEle.onload = linkEle.onerror = null;
                            reject(event);
                        };
                        document.getElementsByTagName('head')[0].appendChild(linkEle);
                    }
                }
            });
        });
        return Promise.all(cssPromiseArray);
    };

    /**
     * 
     * 
     * @param {any} JSArray 
     * [
     *  [jsId,jsPath]
     * ]
     * @returns 
     */
    window.Vue.loadJS = function (JSArray) {
        var componentsPromiseArray = JSArray.map(function (jsObjArray) {
            var jsId = jsObjArray[0];
            var jsPath = jsObjArray[1];
            return new Promise(function (resolve, reject) {
                if (window.Vue.JSList[jsId]) {
                    /* 已被添加，不需要重复添加 */
                    resolve(window.Vue.JSList[jsId]);
                } else {
                    if (!jsPath) {
                        return alert('未设置 ' + jsId + ' loadJS jsPath');
                    }
                    var scriptID = 'script-' + jsId;
                    var $script = $('#' + scriptID);

                    if ($script.length === 0) {
                        var scriptEle = document.createElement('script');
                        scriptEle.id = scriptID;
                        scriptEle.src = jsPath;
                        scriptEle.defer = true;
                        scriptEle.onload = function (event) {
                            scriptEle.onload = scriptEle.onerror = null;
                            resolve(event);
                        };
                        scriptEle.onerror = function (event) {
                            console.warn(event);
                            scriptEle.onload = scriptEle.onerror = null;
                            reject(event);
                        };
                        var $scriptGroup = $('#script-group');
                        if ($scriptGroup.length === 0) {
                            $scriptGroup = $('<div></div>').attr('id', 'script-group').appendTo($('body'));
                        }
                        $scriptGroup[0].appendChild(scriptEle);
                    }
                }
            });
        });
        return Promise.all(componentsPromiseArray);
    };
    /* addComponents */
    /* mixinList */
    window.Vue.mixinList = window.Vue.mixinList || {};
    window.Vue.mixinList.methodsGoTo = {
        methods: {
            goTo: function goTo(item) {
                if (item && item.gotoURL) {
                    var target = item.target || '_blank';
                    window.open(item.gotoURL, target);
                } else {
                    alert('正在开发中,敬请期待!');
                }
            }
        }
    };
    window.Vue.mixinList.filterDate = {
        filters: {
            dateFilter: function dateFilter(value) {
                if (!value) {
                    console.warn('date missing');
                    return '';
                }
                var res = '';
                try {
                    res = dayjs(value).format('YYYY-MM-DD');
                } catch (error) {
                    console.warn('news date error');
                }
                return res;
            }
            /* mixinList */
        }
    };
})(window.jQuery);

/**
 * 不允许使用IE浏览器 * 
 */
function forbidIE() {
    if (window.isBrowserOutdated) {
        window.confirm('此浏览器已过时,请更换现代浏览器！', '提示', {
            confirmButtonText: '立即下载火狐浏览器',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(function () {
            window.open('http://www.firefox.com.cn/download/', '_self');
        }).catch(function () {

        });
        throw new Error('浏览器过时');
    }
}

(function (Vue) {
    /**
     * 加载静态资源
     * 
     * @param {any} prefixPath 可以根据是否本地切换单独的服务器
     * @returns 
     */
    window.Vue.initAppStaticResource = function () {
        return Vue.loadJS([
                ['config', Vue.resolvePath('statics/js/config.js')],
                ['axios', Vue.resolvePath('statics/plugins/axios-0.18.0/axios.js')],
                ['cookie', Vue.resolvePath('statics/plugins/js-cookie-2.2.0/js-cookie.min.js')],
                ['lodash', Vue.resolvePath('statics/plugins/lodash-4.17.10/lodash.js')],
                ['qs', Vue.resolvePath('statics/plugins/qs-6.5.2/qs.min.js')],
                ['idb', Vue.resolvePath('statics/plugins/idb-keyval.js')],
                /*  */
                ['iconfont', Vue.resolvePath('statics/icons/iconfont.js')],
                ['common', Vue.resolvePath('statics/js/common.js')],
                ['view-module', Vue.resolvePath('statics/mixins/view-module.js')],
                ['element', Vue.resolvePath('statics/plugins/element-2.8.2/index.js')],
            ])
            .then(function () {
                /**
                 * 劫持浏览器的常用API
                 * 
                 * @param {any} Vue 
                 */
                function proxyAPI(Vue) {
                    var vm = new Vue();
                    window.$$loading = vm.$loading;
                    window.oldAPI = window.oldAPI || {};
                    /* confirm */
                    window.oldAPI.confirm = window.confirm;
                    window.confirm = vm.$confirm;
                    /* alert */
                    window.oldAPI.alert = window.alert;
                    window.alert = function (content, title) {
                        if (title === void 0) {
                            title = '';
                        }
                        vm.$alert(content, title, {
                            showClose: false,
                            confirmButtonText: '已知悉',
                            callback: function callback() {}
                        });
                    };
                }
                proxyAPI(Vue);
                var loadCSS = Vue.loadCSS([
                    ['index', Vue.resolvePath('statics/element-theme/turquoise/index.css')],
                    ['aui', Vue.resolvePath('statics/element-theme/turquoise/aui.css')],
                    ['base', Vue.resolvePath('statics/css/base.css')],
                    // ['element', Vue.resolvePath('statics/plugins/element-2.8.2/index.css')],
                ]);
                /*  依赖vue element lodash 确保前置条件*/
                var loadJS = Vue.loadJS([
                    ['i18n', Vue.resolvePath('statics/plugins/vue-i18n-8.1.0/vue-i18n.min.js')],
                    ['i18n-locale-zh-CN', Vue.resolvePath('statics/plugins/element-2.4.5/locale/zh-CN.js')],
                    ['i18n-locale-zh-TW', Vue.resolvePath('statics/plugins/element-2.4.5/locale/zh-TW.js')],
                    ['i18n-locale-en', Vue.resolvePath('statics/plugins/element-2.4.5/locale/en.js')],
                    ['i18n-zh-CN', Vue.resolvePath('statics/i18n/zh-CN.js')],
                    ['i18n-zh-TW', Vue.resolvePath('statics/i18n/zh-TW.js')],
                    ['i18n-en-US', Vue.resolvePath('statics/i18n/en-US.js')],
                    ['i18n-index', Vue.resolvePath('statics/i18n/index.js')]
                ]);
                return Promise.all([loadCSS, loadJS]);
            });
    };
})(window.Vue);