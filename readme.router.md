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

id 的必要性

```js

{
  id: "1067246875800000002"
  pid: "0"
  name: "权限管理"/*  */
  /* 强制要求以/开头 */
  /* 通过UI添加有校验 */
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

初始化 匹配 不匹配=》首页（可配置）
不匹配404


单向触发 push

1. 侧边栏点击
    1. 未打开
    1. 已打开
1. 页面刷新初始化
    1. 子页面没有加载路由
    1. 侧边栏自动打开
1. tab页面切换
    1. 地址栏
    1. 侧边栏
    1. 记录当前的根路由信息 rootRoute
1. 自己推送