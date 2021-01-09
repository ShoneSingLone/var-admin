<template>
  <div
    v-show="APP_STATE.contentTabsActiveName === tab.id"
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
    <div :is="currentComponent" :options="tab" />
    <!-- <pre> {{ JSON.stringify(options.tab,null,2) }} </pre> -->
  </div>
</template>

<script>
const {
  _: { $lazyLoadComponent, $resolvePath, $loadComponentByURL },
  APP_STATE,
  APP_ROUTER,
  EventBus,
} = window;

// const { $system } = _;

/* 懒加载 */
function getComponentPath(path) {
  return $lazyLoadComponent($resolvePath(path));
}
export default {
  TEMPLATE_PLACEHOLDER,
  components: {
    VarViewRouterContainerIframe: getComponentPath(
      "static/components/VarRouter/VarViewRouterContainerIframe.vue"
    ),
    PageForBundle: getComponentPath("static/module/layout/PageForBundle.vue"),
  },
  props: {
    options: {
      type: Object,
      default: function () {
        return {};
      },
    },
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
        padding: "10px",
      },
    };
  },

  computed: {
    tab() {
      return (
        (this.options && this.options.tab && this.options.tab.content) || {}
      );
    },
  },
  async mounted() {
    EventBus.on("refresh-content", (name) => {
      if (this.options.tab.name === name) this.refresh();
    });
    setInterval(() => {
      this.time = Date.now();
    }, 600);
    this.init(this.tab);
  },
  destroyed() {
    console.log(this, "destroyed");
  },
  methods: {
    refresh() {
      /* 将要刷新的组件暂存 function是特殊的对象，也可以有属性 */
      this.refresh.component = this.currentComponent;
      /* 切换成其他的组件 div也可以 */
      this.currentComponent = "LoadingView";
      /* 切换之后原组件会被销毁，再切换回来就会重新加载 */
      setTimeout(() => {
        this.currentComponent = this.refresh.component;
        delete this.refresh.component;
      }, 1000);
    },
    init(tab) {
      if (!tab.path) return;
      this.vueComponentHandler(tab);
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
    },
  },
};
</script>