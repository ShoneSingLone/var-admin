<template>
  <iframe
    ref="iframe"
    :src="iframeSrc"
    style="width: 100%; height: 100%; border: 0"
    :title="id"
    :id="'iframe-' + id"
  />
</template>

<script>
const { _, APP_STATE, APP_ROUTER } = window;
export default {
  TEMPLATE_PLACEHOLDER,
  props: {
    options: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    var iframeSrc = this.options.iframe;
    var id = _.camelCase(this.options.path);
    return {
      iframeSrc,
      id,
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less">
</style>