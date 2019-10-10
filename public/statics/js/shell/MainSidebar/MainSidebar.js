/**
 * main-sidebar组件
 */
(function(Vue) {
  var COMPONENT_NAME = 'MainSidebar';
  Vue.componentList[COMPONENT_NAME] = Vue.loadComponent(
    ['MainSidebarSubmenu'],
    Vue.resolvePath('statics/js/shell/MainSidebar')
  ).then(function() {
    return Promise.resolve({
      name: COMPONENT_NAME,
      components: {
        'main-sidebar-submenu': Vue.componentList.MainSidebarSubmenu
      },
      inject: ['APP'],
      props: {
        sidebarLayoutSkin: {
          type: String,
          required: true
        },
        sidebarFold: {
          type: Boolean,
          required: true
        },
        sidebarMenuList: {
          type: Array,
          required: true
        },
        sidebarMenuActiveName: {
          type: String,
          required: true
        }
      },
      data: function data() {
        var privateSidebarMenuList = this.sidebarMenuList;
        return {
          searchKeyWord: '',
          privateSidebarMenuList: privateSidebarMenuList
        };
      },
      methods: {
        filter: function filter(value) {
          var _this = this;

          var arrayTreeFilter = window.Vue.arrayTreeFilter;
          var menuList = arrayTreeFilter(
            _this.sidebarMenuList,
            _this.searchKeyWord
          );
          return menuList;
        }
      },
      watch: {
        searchKeyWord: function searchKeyWord(value) {
          value = String(value).trim();
          this.privateSidebarMenuList = !value
            ? this.sidebarMenuList
            : this.filter(value);
        },
        sidebarMenuList: function sidebarMenuList(value) {
          if (!value) {
            return;
          } else {
            this.privateSidebarMenuList = this.sidebarMenuList;
          }
        }
      }
    });
  });
})(window.Vue);
