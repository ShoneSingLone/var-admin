<template>
  <div class="main-content overflow-auto">
    <div class="pre flex-horizon">
      <VarViewRouterContainer />
      <h1>currentRoute</h1>
      <pre>
{{ JSON.stringify(APP_STATE.currentRoute,null,2) }}
</pre>
    </div>
  </div>
</template>


<script>
const { APP_STATE, APP_ROUTER, _ } = window;
import VarViewRouterContainer from "@@/static/components/VarRouter/VarViewRouterContainer.vue";
console.log("MainContent", APP_STATE, APP_ROUTER);

export default {
  TEMPLATE_PLACEHOLDER,
  components: {
    VarViewRouterContainer
  },
  data() {
    return {
      APP_ROUTER,
      APP_STATE
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
  methods: {}
};
</script>