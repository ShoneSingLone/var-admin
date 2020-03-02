<template>
  <div class="main-content overflow-auto">
    <el-button @click="goto(1)">
      goto1
    </el-button>
    <el-button @click="goto(2)">
      goto2
    </el-button>
    <el-button @click="goto(3)">
      goto3
    </el-button>
    <div class="pre flex-horizon">
      <pre>
{{ JSON.stringify(matched,null,2) }}
</pre>
      <pre>
{{ JSON.stringify(APP_STATE.currentRoute,null,2) }}
</pre>
    </div>
  </div>
</template>
<script>
const { APP_STATE, APP_ROUTER, _ } = window;
console.log("MainContent", APP_STATE, APP_ROUTER);

export default {
  TEMPLATE_PLACEHOLDER,
  components: {},
  data() {
    return {
      APP_ROUTER,
      APP_STATE,
      collapsed: false,
      mainNavbarName: "div",
      mainSidebarName: "div",
      mainContentName: "div"
    };
  },
  computed: {
    matched() {
      return _.last(this.APP_ROUTER.currentRoute.matched);
    }
  },
  watch: {
    APP_ROUTER(route, oldRoute) {
      console.log("route,oldRoute", route, oldRoute);
    }
  },
  methods: {
    goto(type) {
      if (type === 1) {
        APP_ROUTER.push({
          path: "/shell/id39393",
          query: {
            hash: "changed"
          }
        });
      }
      if (type === 2) {
        APP_ROUTER.push({ name: "user", params: { userId: "123" } });
      }
      if (type === 3) {
        APP_ROUTER.push({
          path: "/shell/0932313/user/admin",
          query: { rank: "123" }
        });
      }
    }
  }
};
</script>