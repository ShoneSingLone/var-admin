<template>
  <!--  <div
    class="Demo"
    style="height:100%;"
  >
    <div
      style="width:400px;position:absolute;top:210px;right:10px;background:white;padding:10px;"
      class="elevation2"
    >
      Iframe:{{ options }}
    </div>
  </div>-->
  <iframe
    ref="iframe"
    :src="iframeSrc"
    style="width:100%;height:100%;"
    frameborder="0"
  />
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
    let iframeSrc = (url => {
      if (/\/statics\/base\/page.html/g.test(url)) {
        return url;
      } else {
        return "./modules/" + url + ".html";
      }
    })(this.options.url);
    return { iframeSrc };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less">
</style>