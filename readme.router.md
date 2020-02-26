判断加载组件的类型 处理方式

监听 hash
触发修改
展示

当前的 即 parent 路径

从路径获取参数

局限性
ViewRouter=>ViewContainer自己定位处于哪一级，prop：parentPathName

1. VarRouter.constructor 入口：处理基本的路由信息，系统加载时从服务端获取的aside navTree 

```js
{
  pathName:"patha"
  handler:"a"/* vueComponent */
  url:""/* 静态资源的路径 */
}

ViewRouter是以a方式处理
```

