<template>
  <div
    class="markdown-wrapper"
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
      html: ""
    };
  },
  async mounted() {
    const content = this.$slots.default[0].text;
    const MarkdownIt = await window.loadLibById("markdownit");
    this.html = MarkdownIt().render(content);
  }
};
</script>