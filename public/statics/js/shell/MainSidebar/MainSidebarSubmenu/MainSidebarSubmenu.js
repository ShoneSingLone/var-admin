/**
 * main-sidebar-submenu组件
 */

(function (Vue) {
  var COMPONENT_NAME = "MainSidebarSubmenu";
  Vue.addC({
    name: COMPONENT_NAME,
    props: {
      menu: {
        type: Object,
        required: true
      }
    },
    beforeCreate: function () {
      self = this;
    },
    data: function () {
      return {
        isHide: false
      };
    },
    computed: {
      isShow: function () {
        var isShow = this.menu.children && this.menu.children.length >= 1;
        return isShow;
      }
    },
    methods: {
      // 通过menuId与路由列表进行匹配跳转至指定路由
      gotoRouteHandle: function (menuId, menu, isClick) {
        /* 单独打开大屏 */
        var origURL = menu.url;
        if (~origURL.indexOf("fullscreen=1")) {
          window.open(origURL, "fullscreen=1");
        }
        /*  */
        var route = win.SITE_CONFIG.routeList.filter(function (item) {
          return item.menuId === menuId;
        })[0];

        if (route) {
          Route.to(route.name);
        }
      }
    }
  });
})(window.Vue);