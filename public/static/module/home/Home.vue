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
const {_}=window;
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
    // var a = pathname.lastOf("/");
    var index = _.lastIndexOf(pathname,"/");
    let baseURL = href.substring(0, index);
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