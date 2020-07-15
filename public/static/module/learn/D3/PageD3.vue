<template>
  <div id="d3" />
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
import SimpleWidget from "./a1.mjs";
import d3 from "d3";

export default {
  TEMPLATE_PLACEHOLDER,
  mixins: [basePageMixin],
  mounted() {},
  methods: {
    init() {
      var widget = SimpleWidget(d3, {
        color: "#6495ed"
      })
        .headline("Simple Widget")
        .description(
          "This is a simple widget demonstrating functional javaScript."
        );
      widget.render();
    }
  }
};
</script>