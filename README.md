# vue-admin

## 参考

- [TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter)
- [stylus-lang 因 node而生](http://stylus-lang.com/)
- [实施微前端的六种方式](https://segmentfault.com/a/1190000015566927)
- [一个电商的微前端落地实现](https://www.jianshu.com/p/81272689a134)
- [网易严选企业级微前端解决方案与落地实践](https://mp.weixin.qq.com/s/x2N-Y5xZV-XbrqxDT_wLKA)

## ？？？

- （一个组件就是一个应用？）

## package

``` bash
npm i -g webpack 
npm i extract-text-webpack-plugin@next
npm i -S vue-highlightjs monaco-editor
npm i -D stylus stylus-loader confman vue-loader vue-template-compiler stylus stylus-loader postcss-loader 
```

## 生成vue组件的vs code插件

[generatevuecomponent](https://marketplace.visualstudio.com/items?itemName=ShoneSingLone.generatevuecomponent)

## 约定

在相同的目录下
page=compoentName?test=true

### page 业务页面

### test 测试、展示页面

## 文档

MainContent.js 主要是tab id 的问题 使用与selector相恰的变量名
