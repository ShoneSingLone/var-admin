<template>
  <div
    class="Demo"
    style="height:100%;"
  >
    <iframe
      ref="iframe"
      :src="iframeSrc"
      style="width:100%;height:100%;"
      frameborder="0"
    />
  </div>
</template>


<script>
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
    const { pathname, href } = window.location;
    let baseURL = href.substring(0, href.indexOf(pathname));
    return {
      iframeSrc: `${baseURL}/static/demo/THREE%20Image%20Transition/THREE%20Image%20Transition.html`
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
</style>