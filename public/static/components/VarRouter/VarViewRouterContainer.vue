<template>
  <div class="var-view-router-container" v-show="APP_STATE.contentTabsActiveName===tab.id">
    <div
      style="width:400px;position:absolute;top:10px;right:10px;background:white;padding:10px;"
      class="elevation2"
    >
      <h6>{{ start }} options {{ (time-start)/1000 }}</h6>
      <h6>{{APP_STATE.contentTabsActiveName===tab.id}}</h6>
    </div>
    <div :is="currentComponent" :options="tab"></div>
    <!-- <pre> {{ JSON.stringify(options.tab,null,2) }} </pre> -->
  </div>
</template>
<script>
const { _, APP_STATE, APP_ROUTER } = window;
// const { $system } = _;

export default {
  TEMPLATE_PLACEHOLDER,
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
      time: ""
    };
  },
  computed: {
    tab() {
      return (
        (this.options && this.options.tab && this.options.tab.content) || {}
      );
    }
  },
  destroyed() {
    console.log(arguments);
    debugger;
  },
  async mounted() {
    setInterval(() => {
      this.time = Date.now();
    }, 600);
    const lazyLoadUrl = `@@/${this.tab.url}`;
    try {
      // const { default: component } = await import(lazyLoadUrl);
      let res;
      if (this.tab.id === "home") {
        res = await import("@@/static/module/dev/dev/Iframe.vue");
      } else {
        res = await import("@@/static/module/dev/dev/Test.vue");
      }
      this.currentComponent = res.default;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
<style lang="scss">
</style>