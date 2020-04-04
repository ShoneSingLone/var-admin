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
  APP_STATE,
  EventBus,
  _: { $lazyLoadComponent, $resolvePath, $axios }
} = window;

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
      SHELL: this
    };
  },
  data() {
    return { APP_STATE };
  },
  async mounted() {
    try {
      const res = await $axios.get("https://www.singlone.top/api/movieinfo");
      console.table(res);
    } catch (error) {
      console.error(error);
      debugger;
    }
    /* MainSidebarSubmenu.vue 路由加载完成之后再加载内容 */
    EventBus.on("menus-loaded", () => {
      /* 默认是loading */
      APP_STATE.componentContent = "mainContent";
    });
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