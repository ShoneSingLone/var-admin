<template>
  <div
    v-show="APP_STATE.contentTabsActiveName===tab.id"
    class="var-view-router-container"
  >
    <!-- <div
      :style="containerStyle"
      class="elevation2"
    >
      <h6>{{ start }} options {{ (time-start)/1000 }}</h6>
      <h6>{{ APP_STATE.contentTabsActiveName===tab.id }}</h6>
    </div>-->
    <!-- 
    {{ tab.matched }}
    {{ currentComponent }}
    {{ tab }}
    -->
    <div
      :is="currentComponent"
      :options="tab"
    />
    <!-- <pre> {{ JSON.stringify(options.tab,null,2) }} </pre> -->
  </div>
</template>

<script>
const {
  _: { $lazyLoadComponent, $resolvePath, $loadComponentByURL },
  APP_STATE,
  APP_ROUTER
} = window;

// const { $system } = _;

export default {
  TEMPLATE_PLACEHOLDER,
  components: {
    VarViewRouterContainerIframe: $lazyLoadComponent(
      $resolvePath("static/components/VarRouter/VarViewRouterContainerIframe.vue")
    )
  },
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      APP_STATE,
      APP_ROUTER,
      currentComponent: "LoadingView",
      start: Date.now(),
      time: "",
      containerStyle: {
        width: "400px",
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "white",
        padding: "10px"
      }
    };
  },

  computed: {
    tab() {
      return (
        (this.options && this.options.tab && this.options.tab.content) || {}
      );
    }
  },
  async mounted() {
    setInterval(() => {
      this.time = Date.now();
    }, 600);
    this.init(this.tab);
  },
  destroyed() {
    console.log(this, "destroyed");
  },
  methods: {
    init(tab) {
      if (!tab.path) return;
      if (tab.handler) {
        const HANDLER_MAP = {
          "1": "vueComponentHandler",
          "2": "iframeHandler"
        };
        const fn = this[HANDLER_MAP[tab.handler]];
        return fn && fn(tab);
      } else if (tab.url) {
        this.iframeHandler(tab);
      } else {
        console.error("未找到任何匹配路由信息的容器");
      }
    },
    iframeHandler() {
      this.currentComponent = "VarViewRouterContainerIframe";
    },
    async vueComponentHandler(tab) {
      try {
        let res;
        if (this.tab.id === "home") {
          res = await $loadComponentByURL("static/module/home/Home.vue");
        } else {
          res = await $loadComponentByURL(tab.url);
        }
        this.currentComponent = res;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>