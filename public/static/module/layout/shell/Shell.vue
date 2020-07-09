<template>
  <div class="shell">
    <!--
          <pre class="console202003045558 elevation12">
    {{ JSON.stringify(APP_ROUTER.currentRoute ,null,2) }}
          </pre>
        -->
    <LoadingView
      :is="APP_STATE.componentNavbar"
      class="navbar elevation2"
      @click-toggle="toggleSidebarFold"
    >
      {{ APP_STATE.isSidebarFold?APP_STATE.sysNavSubTitle:APP_STATE.sysNavTitle }}
    </LoadingView>

    <div class="main flex-horizon">
      <LoadingView
        :is="APP_STATE.componentSidbar"
        :class="['sidebar elevation6',{fold:APP_STATE.isSidebarFold}]"
      >
        sidebar
      </LoadingView>
      <LoadingView
        :is="APP_STATE.componentContent"
        class="content flex1"
      >
        content
      </LoadingView>
    </div>
  </div>
</template>

<script>
    const {
        EventBus,
        _: {$lazyLoadComponent, $resolvePath, $axios}
    } = window;
    let APP_STATE = window.APP_STATE;
    export default {
        TEMPLATE_PLACEHOLDER,
        components: {
            mainNavbar: $lazyLoadComponent(
                $resolvePath("static/module/layout/shell/MainNavbar.vue")
            ),
            mainSidebar: $lazyLoadComponent(
                $resolvePath("static/module/layout/shell/MainSidebar.vue")
            ),
            mainContent: $lazyLoadComponent(
                $resolvePath("static/module/layout/shell/MainContent.vue")
            )
        },
        provide() {
            return {
                SHE从哦媒婆嫩他LL: this
            };
        },
        data() {
            APP_STATE = APP_STATE || window.APP_STATE;
            return {APP_STATE};
        },
        created() {
            /* MainSidebarSubmenu.vue 路由加载完成之后再加载内容 */
            EventBus.on("menus-loaded", () => {
                /* 默认是loading */
                APP_STATE.componentContent = "mainContent";
            });
        },
        async mounted() {
           /*  try {
                const res = await $axios.get("https://www.singlone.top/api/movieinfo");
            } catch (error) {
                console.error(error);
            } */
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            handleInput(value) {
                console.log(value);
            },
            toggleSidebarFold() {
                APP_STATE.isSidebarFold = !APP_STATE.isSidebarFold;
            }
        }
    };
</script>