Promise.all([
    Vue.loadComponent(["MainContent", "MainNavbar", "MainThemeTools", "MainSidebar"], Vue.resolvePath("statics/js/shell")),
    Vue.loadJS([
      ["vue-easy-lightbox", Vue.resolvePath("statics/plugins/vue-2.6.10/vue-easy-lightbox.umd.min.js")]
    ])
  ])
  .then(() => {
    var minxinImgView = {
      mounted() {
        this.$imgViewer = this.$refs.imgViewer;
        window["vue-easy-lightbox"] = null;
      },
      data() {
        return {
          imgVisible: false,
          imgIndex: 0, // default
          imgItems: [],
        };
      },
      methods: {
        setImgItems(path) {
          if (path.length) {
            this.imgItems = path;
          } else {
            this.imgItems = [path];
          }
          return this;
        },
        setImgIndex(index) {
          this.imgIndex = index;
          return this;
        },
        showImgs() {
          this.imgVisible = true;
          return this;
        },
        handleHideImgs() {
          this.imgVisible = false;
          this.imgItems = [];
          return this;
        }
      }
    };

    var vm = new Vue({
      el: ".aui-wrapper",
      i18n: window.SITE_CONFIG.i18n,
      provide() {
        return {
          APP: this
        };
      },
      mixins: [minxinImgView],
      data: function data() {
        return {
          loading: true,
          // 导航条, 布局风格, defalut(白色) / colorful(鲜艳)
          navbarLayoutType: "colorful",
          // 侧边栏, 布局皮肤, default(白色) / dark(黑色)
          sidebarLayoutSkin: "blue",
          // 侧边栏, 折叠状态
          sidebarFold: false,
          // 侧边栏, 菜单
          sidebarMenuList: [],
          sidebarMenuActiveName: "",
          // 内容, 是否需要刷新
          contentIsNeedRefresh: false,
          // 内容, 标签页
          contentTabs: [{
            menuId: "home",
            name: "home",
            title: "home",
            url: "./home.html",
            params: {}
          }],
          contentTabsActiveName: "",
          // 用户信息
          user: {
            id: 0,
            name: "",
            areacode: "",
            realName: "",
            superAdmin: 0
          }
        };
      },
      components: {
        "img-viewer": window["vue-easy-lightbox"],
        "main-navbar": Vue.componentList.MainNavbar,
        "main-sidebar": Vue.componentList.MainSidebar,
        "main-content": Vue.componentList.MainContent,
        "main-theme-tools": Vue.componentList.MainThemeTools
      },
      watch: {
        "$i18n.locale": "i18nHandle",
        contentTabsActiveName: function (currenTabs) {
          console.log(currenTabs);
        }
      },
      created() {
        vm = this;
        vm.proxyForGetIFrame();
        /* sys_area放到缓存 */
        vm.initArea();
        /* 下拉数据的预处理 */
        // vm.initIndexedDbInfo()
        Promise.resolve()
          .then(() => vm.getMenuList())
          .then(() => {
            vm.addMenuRouteList(vm.sidebarMenuList);
            return Promise.all([vm.getUserInfo(), vm.getPermissions()]);
          })
          .then(() => {
            vm.loading = false;
            vm.$nextTick(() => {
              /* 监听hash处理路由变动 */
              window.addEventListener("hashchange", vm.routerHandle);
              vm.routerHandle(true);
              vm.i18nHandle(vm.$i18n.locale);
            });
          })
          .catch((error) => {
            console.error(error);
            alert(JSON.stringify(error.message, null, 2));
          });
      },
      methods: {
        initArea: function initArea() {},
        initIndexedDbInfo: () => {},
        /* 在index的console获取子页面window */
        proxyForGetIFrame: () => {
          Object.defineProperty(vm, "$iframes", {
            get: () => {
              var refs = vm.$refs.content.$refs;
              var targetObj = {};
              for (var key in refs) {
                if (refs.hasOwnProperty(key)) {
                  var element = refs[key];
                  if (element[0]) {
                    targetObj[key] = element[0].contentWindow;
                  }
                }
              }
              return targetObj;
            }
          });
        },
        // 设置导航条, 布局风格
        setNavbarLayoutType: function setNavbarLayoutType(val) {
          vm.navbarLayoutType = val;
        },
        // 设置侧边栏, 布局皮肤
        setSidebarLayoutType: function setSidebarLayoutType(val) {
          vm.sidebarLayoutSkin = val;
        },
        // 设置侧边栏, 菜单选中
        setSidebarMenuActiveName: function setSidebarMenuActiveName(val) {
          vm.sidebarMenuActiveName = val;
        },
        // 设置内容, 标签页
        setContentTabs: function setContentTabs(val) {
          vm.contentTabs = val;
        },
        // 设置内容, 标签页选中
        setContentTabsActiveName: function setContentTabsActiveName(val) {
          vm.contentTabsActiveName = val;
        },
        // 获取菜单列表
        getMenuList: function getMenuList() {
          return vm.$http
            .get("/sys/menu/nav")
            .then(function (res) {
              if (res.data.code !== 0) {
                return vm.$message.error(res.data.msg);
              }
              vm.sidebarMenuList = res.data.data;
            })
            .catch(console.error.bind(console));
        },
        // 添加菜单路由列表
        addMenuRouteList: function addMenuRouteList(menuList) {
          var temp = [];
          for (var i = 0; i < menuList.length; i++) {
            if (menuList[i].children && menuList[i].children.length >= 1) {
              temp = temp.concat(menuList[i].children);
              continue;
            }
            /* 组装路由 */
            var route = {
              menuId: menuList[i].id,
              name: "",
              title: menuList[i].name,
              url: "",
              params: {}
            };
            var URL = (menuList[i].url || "").replace(/{{([^}}]+)?}}/g, function (
              s1,
              s2
            ) {
              return eval(s2);
            }); // URL支持{{ window.xxx }}占位符变量

            if (vm.$validate.isURL(URL)) {
              route.name = "i-" + menuList[i].id;
              route.url = URL;
            } else {
              URL = URL.replace(/(.+)\.html/, "$1")
                .replace(/^\//, "")
                .replace(/_/g, "-");
              route.name = URL.replace(/\//g, "-");
              route.url = "./modules/" + URL + ".html";
            }
            window.SITE_CONFIG.routeList.push(route);
          }

          if (temp.length >= 1) {
            return vm.addMenuRouteList(temp);
          }
        },
        // 路由
        routerHandle: function (isInit) {
          var routeName = window.location.hash.substring(1).split("?")[0]; // 初始化
          if (isInit && typeof isInit === "boolean") {
            /* 初始化 */
            localStorage.setItem("RouteParams", "{}");
            /* 如路由为空, 默认为home首页 */
            if (!/\S/.test(routeName)) {
              Route.to("home");
              return false;
            } // 如重定向路由包含__双下划线, 为临时添加路由

            if (/__.*/.test(routeName)) {
              Route.to(routeName.replace(/__.*/, ""));
              return false;
            }

            if (routeName === "sys-log-error") {
              return Route.to("home");
            }
          }

          var route = window.SITE_CONFIG.routeList.filter(function (item) {
            return item.name === routeName;
          })[0];

          if (!route) {
            return false;
          }

          var tab = vm.contentTabs.filter(function (item) {
            return item.name === routeName;
          })[0];

          if (!tab) {
            tab = route;
            vm.contentTabs.push(tab);
          }
          vm.sidebarMenuActiveName = tab.menuId;
          vm.contentTabsActiveName = tab.name;
        },
        // 国际化
        i18nHandle: function i18nHandle(val, oldVal) {
          Cookies.set("language", val);
          document.querySelector("html").setAttribute("lang", val);
          document.title = vm.$i18n.messages[val].brand.lg;

          if (oldVal) {
            window.location.reload();
          }
        },
        // 获取当前管理员信息
        getUserInfo: function getUserInfo() {
          return vm.$http
            .get("/sys/user/info")
            .then(function (res) {
              if (res.data.code !== 0) {
                return vm.$message.error(res.data.msg);
              }
              vm.user.id = res.data.data.id;
              vm.user.areacode = res.data.data.areacode;
              vm.user.name = res.data.data.username;
              vm.user.realName = res.data.data.realName;
              vm.user.superAdmin = res.data.data.superAdmin;
              vm.user.orgType = res.data.data.orgType;
              localStorage.currentUser = JSON.stringify(vm.user);
            })
            .catch(() => {});
        },
        // 获取权限
        getPermissions: function getPermissions() {
          return vm.$http
            .get("/sys/menu/permissions")
            .then(function (res) {
              if (res.data.code !== 0) {
                return vm.$message.error(res.data.msg);
              }
              window.SITE_CONFIG["permissions"] = res.data.data;
            })
            .catch(console.error.bind(console));
        },
        toggleThemeTools: () => {
          this.$refs.themeTools.isOpen = !this.$refs.themeTools.isOpen;
        }
      }
    });

    /* vm是不可改变的单例 */
    Object.defineProperty(window, "vm", {
      value: vm,
      writable: false,
      configurable: false
    });
  })
  .catch(console.error.bind(console));