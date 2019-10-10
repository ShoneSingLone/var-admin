[](https://zhuanlan.zhihu.com/p/32378432)
- 相互约定命名隔离。为 CSS、浏览器事件、Local Storage 和 Cookies 制定命名空间，以避免冲突和明确其所有权。

# 基本

## 拓展

- [Spring 5 响应式编程](https://www.ibm.com/developerworks/cn/java/spring5-webflux-reactive/index.html)
- [BaaS与IaaS、PaaS、SaaS的区别和关系要如何理解](https://www.zhihu.com/question/23048744)
- [ES2015](https://babeljs.io/docs/en/learn)
- [ES2015与ES6](http://es6.ruanyifeng.com/)
- [微前端](https://zhuanlan.zhihu.com/p/32378432)

## IIFE

[IIFE立即自调用函数表达式](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)

```js
window.gloableValue = (function(){
/* 独立的函数作用域，内部变量不会污染全局作用域，除非暴露出去 */
return {publicValue:""};
})();
```

## defer

- [defer](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)
- [http://es6.ruanyifeng.com/#docs/promise]()

## Promise

- [MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [ES6 入门 Promise 对象](http://es6.ruanyifeng.com/#docs/promise)

## Vue Element-ui

- [Vue](https://cn.vuejs.org/v2/guide/)

### 组件

- [组件](https://cn.vuejs.org/v2/guide/components.html)
- [element-ui](https://element.eleme.cn/#/zh-CN/component/installation)

#### 组件分类

1. 页面组件=》html
1. 独立于项目的高度抽象的功能基础组件=》Element-UI
1. 业务组件，由2构成，在1中切换=》form table

![组件的组织](../img/doc/components.png)
>解耦组件的交互逻辑，尽量把复杂的逻辑分发到不同的子组件中，然后彼此建立联系

- [通过 Prop 向子组件传递数据](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE)
- [使用事件抛出一个值](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E4%BA%8B%E4%BB%B6%E6%8A%9B%E5%87%BA%E4%B8%80%E4%B8%AA%E5%80%BC)
- [通过插槽分发内容](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87%E6%8F%92%E6%A7%BD%E5%88%86%E5%8F%91%E5%86%85%E5%AE%B9)

- [vue组件间通信六种方式](https://mp.weixin.qq.com/s?__biz=MzU3NjczNDk2MA==&mid=2247484242&idx=1&sn=4e235a9e3828e1bae7f5206beb943636&chksm=fd0e10cdca7999db1ec733d7b3aec9d81289dddc930072224483c4cd7ed72588ba1b17a11e69&mpshare=1&scene=2&srcid=&from=timeline&key=2284a33865482fc0d9be17065a192d3ffe3b8ef2d777135085ed2a697f89a6655181e73f125bfc240e6b4031659d13f3df8c03b1d9386af74c6707bcfaefb2a1faa6d848e54f65cf55f25b54b71b4c3e&ascene=14&uin=NTY4MTYyOTM1&devicetype=Windows+10&version=62060833&lang=zh_CN&pass_ticket=1ry6TctsVUumWrCOFVRXE1pqSL%2BzHPUgfXH9snSNy2w8XSMqFyOOW9pfi20xLbTy)
  >[Vue-Bus](https://juejin.im/post/5a4353766fb9a044fb080927)与[Vuex](https://juejin.im/entry/58cb4c36b123db00532076a2)

### 必知必会API

- [Prop](https://cn.vuejs.org/v2/guide/components-props.html#ad)
- [自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)
- [插槽](https://cn.vuejs.org/v2/guide/components-slots.html)

## requestFullScreen

- [requestFullScreen](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen)
- [fullscreen](https://javascript.ruanyifeng.com/htmlapi/fullscreen.html#toc1)

## 需要引入的JS 脚本

```js
/* security-enterprise-general\renren-admin\gulpworkspace\拼接lib.js */
  next([
    'polyfill.promise.nativeURLSearchParams.map.js',//垫片，promise是最重要的垫片
    'jquery.1.12.4/jquery.1.12.4.js',//DOM操作无出其右
    'vue-2.6.10/vue.js',
    'vue-2.6.10/vue.base.js',
  ]);
```

      <el-rich-editor v-model="contentCode"></el-rich-editor>


`/* security-enterprise-general\renren-admin\src\main\resources\statics\js\common.js */`

- axios的切面处理
- Vue 的基础components：比如导航栏的item

vue.base.js

```js
/* 现代浏览器支持ES6 新基本类型Symbol IE不支持*/
(function () {
    try {
        Symbol('test');
    } catch (error) {
        window.isBrowserOutdated = true;
    }
})();
```

`window.urlArgs().isDev;//如果是开发模式，可以直接获取`

//vm应该是页面唯一
var vm = window.vm = new Vue();

## 下拉

下拉选项的判断规则

 1. 自有data属性:[{
   lable:"显示用的",
   value:"数据库值"
 }]
 1. dataFn回调数据:[]//todo
 1. dataId:indexedDB读取

## 三方库

**main\resources\statics\plugins\qs-6.5.2\qs.js**: [qs](https://github.com/ljharb/qs)
**main\resources\statics\js\config.js**: 基本的配置信息
**main\resources\statics\i18n\index.js**: element 全局设置
**main\resources\statics\js\common.js**: http请求拦截
<!-- **main\resources\statics\plugins\zangodb\zangodb.min.js**: [zangodb](https://erikolson186.github.io/zangodb/Db.html) -->
**main\resources\statics\plugins\zangodb\idb-keyval.js**: [pocketjs](https://github.com/vincentracine/pocketjs)
**main\resources\statics\plugins\zangodb\IDBStorage.js**: [IDBStorage](https://github.com/vincentracine/pocketjs)

## 通用组件

renren-admin\src\main\resources\statics\plugins\vue-2.6.10\vue.base.initAppStaticResource.js中引入
```js
    window.Vue.initAppStaticResource = function () {
        return Promise.all([
            Vue.loadComponent(
                ['ElCForm', 'ElCFormItem', 'ElS','ElQuery','ElIndustry','ElAdministrative'],
                Vue.resolvePath('statics/components')
            ), syncDict()
        ]).then(function (components) {
            var _components = components[0];
            if (!_components) alert(_components);
            _components.forEach(function (component) {
                if (!component.name) {
                    debugger;
                }
                Vue.component(component.name, component);
            });
            return Promise.resolve();
        });
    };
```

## 明确依赖

fnMainNavbarUpdatePasswordComponent


## 前端通用下载文件方法（兼容IE）：
https://blog.csdn.net/weixin_42445133/article/details/84327849

```html
 <iframe :ref="camelCaselize(item.name)" :id="'iframe-'+item.name" v-show="iframeVisibleHandle(item)"
                :src="item.url" width="100%"
                height="100%" frameborder="0"
                scrolling="yes"></iframe>
```

- ifrme引用
- 图片预览

```js
// 参考bot03.html
// shell.js mixinImgView()

//['http://localhost:8080/statics/img/avatar.png']
//vue.base.initAppStaticResource.js
showLightbox: function (imageName, index) {
                var _this = this;
                var imgSrcArray = _this.images.map(function (image) {
                    return _this.thumbnailDir + image.name;
                });
                /* index 默认为0，图片数组的第一个图 */
                _this.$showImgs(imgSrcArray, index)
            },
            ...
 Vue.prototype.$showImgs = function (items, index) {
    var _vm = (window.win) ? window.win.vm : window.vm;
    index = index || 0;
    _vm.setImgItems(items).setImgIndex(index).showImgs()
  };

/* window.win.vm 是index.html（shell.js)的vm */
/* 可以传数组 */
```

## 

Route.to(target,params)//有params就跳转
Route.get(prop/*可选参数：没有返回整个对象，有就是对应的属性值*/)
Route.id

reload()是迫不得已，应该每一个页面都有一个init方法，这样就可以invoke init方法而不是整页reload

## 

[table tips](https://segmentfault.com/q/1010000014973813)

## axios
count > 0 
count ++ 
loading 的情况
openLoading
closeLoading

