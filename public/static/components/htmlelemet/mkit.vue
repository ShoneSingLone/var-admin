<template>
  <div class="markdown-wrapper description">
    <select class="markdown-theme" v-model="theme">
      <option v-for="item in cssList" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
    <div class="markdown-wrapper description" v-html="html"></div>
  </div>
</template>
<style>
</style>
<script>
import cssList from "@@/static/lib/highlightstyles/csslist.mjs";
export default {
  TEMPLATE_PLACEHOLDER,
  data() {
    const theme = localStorage.markdownHightlightTheme || "monokai-sublime.css";
    return {
      cssList,
      theme,
      originHTML: "",
      html: "",
    };
  },
  watch: {
    theme(theme) {
      localStorage.markdownHightlightTheme = theme;
      $("#markdonw-hightlight-style").attr(
        "href",
        window._.$resolvePath(`static/lib/highlightstyles/${theme}`)
      );
    },
  },
  async mounted() {
    this.originHTML = this.$slots.default[0].children[0].text;
    const {
      _: { $loadCSS, $resolvePath },
    } = window;
    const [marked, hljs] = await Promise.all([
      window.loadLibById("marked"),
      window.loadLibById("hljs"),
      $loadCSS($resolvePath(`static/lib/highlightstyles/${this.theme}`), {
        id: "markdonw-hightlight-style",
      }),
    ]);
    const { Renderer } = marked;
    marked.options = { langClass: "hljs" };
    const renderer = new Renderer();
    this.html = marked(this.originHTML, {
      renderer,
      highlight: (code) => hljs.highlightAuto(code).value,
    });
  },
};
</script>