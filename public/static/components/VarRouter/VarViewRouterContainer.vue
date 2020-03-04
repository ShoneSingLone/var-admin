<template>
  <div class="var-view-router-container">
    <div>
      {{ matched }}
      <h6>id</h6>
      {{ matched.id }}
    </div>
    <div>
      <h6>url</h6>
      {{ matched.url }}
    </div>
    <div>
      <h6>query</h6>
      {{ JSON.stringify(matched.query,null,2) }}
    </div>
  </div>
</template>
<script>
const { APP_STATE, APP_ROUTER, _ } = window;

export default {
  name: "Demo",
  data() {
    return {
      APP_STATE,
      APP_ROUTER
    };
  },
  computed: {
    matched() {
      return _.last(this.APP_ROUTER.currentRoute.matched);
    }
  },
  mounted() {},
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
        APP_ROUTER.push({ path: "/user", params: { userId: "123" } });
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
<style lang="scss">
</style>