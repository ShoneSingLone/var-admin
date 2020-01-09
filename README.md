# vue-admin

## 参考

- [Server-sent_events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools)
- [eventsource](https://github.com/EventSource/eventsource)
- [TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter)
- [stylus-lang 因 node而生](http://stylus-lang.com/)
- [实施微前端的六种方式](https://segmentfault.com/a/1190000015566927)
- [一个电商的微前端落地实现](https://www.jianshu.com/p/81272689a134)
- [网易严选企业级微前端解决方案与落地实践](https://mp.weixin.qq.com/s/x2N-Y5xZV-XbrqxDT_wLKA)
- [原子设计理论](https://www.uisdc.com/atomic-design-theory)
- [Atomic Design原子设计理念](http://www.woshipm.com/pd/728887.html)
- [设计系统](https://zhuanlan.zhihu.com/p/33345487)

## ？？？

- （一个组件就是一个应用？）

## package

``` bash
npm i -g webpack webpack-cli
npm i extract-text-webpack-plugin@next
npm i -S vue-highlightjs monaco-editor
yarn add -D webpack webpack-cli
yarn add -D stylus stylus-loader confman vue-loader vue-template-compiler stylus stylus-loader postcss-loader postcss-flexbugs-fixes

```

~~node-sass sass-loader~~安装失败神烦

## 生成vue组件的vs code插件

[generatevuecomponent](https://marketplace.visualstudio.com/items?itemName=ShoneSingLone.generatevuecomponent)

## 
[怎么使用 Service Worker](https://lavas.baidu.com/pwa/offline-and-cache-loading/service-worker/how-to-use-service-worker)
## Utils

LoadString
loadJS
loadCSS
md5

## 约定

在相同的目录下
page=compoentName?test=true

### page 业务页面

### test 测试、展示页面

## 文档

MainContent.js 主要是tab id 的问题 使用与selector相恰的变量名

VueLoader

public\static\lib\systemjs\system.src.js
public\static\lib\systemjs\extras\transform.js

- [idb-keyval](https://github.com/jakearchibald/idb-keyval/blob/master/README.md) 
- [localForage](https://github.com/localForage/localForage) 

缓存
hash 升级


---
<!-- 不明白 -->
req.end is not function
node_modules\webpack-hot-middleware\middleware.js

```js
req.on('close', function () {
  console.error("close")
  if (!res.finished) res.end && res.end();
  delete clients[id];
});
```

# axios 拦截封装

- 403 权限
  - 跳转 退出逻辑（清除敏感信息）
- 超时



EventBus 全局通信：messageBox not