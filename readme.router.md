判断加载组件的类型 处理方式

监听 hash
触发修改
展示

当前的 即 parent 路径

完全由路径获取信息
从路径获取参数

局限性
ViewRouter=>ViewContainer自己定位处于哪一级，prop：path

1. VarRouter.constructor 入口：处理基本的路由信息，系统加载时从服务端获取的aside navTree 

```js
{
  id: "1067246875800000002"
  pid: "0"
  name: "权限管理"/*  */
  path:"patha"/* 在地址栏显示的部分 */
  /*  */
  handler:"1"/* vueComponent */
  children:[]/* 与handler不同时出现 */
  /*  */
  icon: "icon-safetycertificate"
  url:""/* 静态资源的访问路径 ./ / :// static  */
  permissions: null
}

ViewRouter是以a方式处理  

```

组件监听route变动
当前 true =》响应

对应的路由对应的显示

