<template>
  <div
    class="markdown-wrapper description"
    v-html="html"
  />
</template>
<style>
</style>
<script>
export default {
  TEMPLATE_PLACEHOLDER,
  data() {
    return {
      originHTML: "",
      html: "",
    };
  },
  async mounted() {
    this.originHTML = this.$slots.default[0].children[0].text;
    const [marked, hljs] = await Promise.all([
      window.loadLibById("marked"),
      window.loadLibById("hljs"),
    ]);
    const { Renderer } = marked;
    const renderer = new Renderer();
    this.html = marked(this.originHTML, {
      renderer,
      highlight: (code) => hljs.highlightAuto(code).value,
    });
  },
};
</script>