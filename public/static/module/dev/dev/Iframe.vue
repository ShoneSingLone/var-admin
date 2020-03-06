<template>
  <div
    class="Demo"
    style="height:100%;"
  >
    <div
      style="width:400px;position:absolute;top:210px;right:10px;background:white;padding:10px;"
      class="elevation2"
    >
      Iframe:{{ options }}
    </div>

    <iframe
      src="https://element.eleme.cn/#/zh-CN/component/menu"
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
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
</style>