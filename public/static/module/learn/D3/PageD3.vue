<template>
  <div class="d3-wrapper">
    <ul>
      <li>
        <a href="https://observablehq.com/@d3/gallery">observablehq</a>
      </li>
      <li>
        <a href="https://christopheviau.com/d3list/gallery.html">christopheviau's gallery</a>
      </li>
      <li>
        <a href="https://github.com/d3/d3/wiki/Tutorials">d3 Tutorials</a>
      </li>
      <li>
        <a href="https://github.com/d3/d3-plugins">d3-plugins</a>
      </li> 
      <li>
        <a href="https://bl.ocks.org/mbostock">mbostock</a>
      </li>
      <li>类似jQuery的选择器，链式调用方法，面向过程</li>
      <li>
        node()=>获取集合
      </li>
    </ul>
    <div id="d3" />
  </div>
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
import { SimpleWidget } from "./a1.mjs";

export default {
  TEMPLATE_PLACEHOLDER,
  mixins: [basePageMixin],
  mounted() {
    window._ &&
      window._.$loadLess &&
      window._.$loadLess("static/module/learn/D3/PageD3.less");
  },
  methods: {
    async init() {
      const d3 = await window.loadLibById("d3");
      var widget = SimpleWidget(d3, { color: "#6495ed" })
        .headline("Simple Widget")
        .description(
          "This is a simple widget demonstrating functional javaScript."
        );
      widget.render();

      d3.selectAll("li").style("color", "green");
      d3.selectAll("li a")
        .style("color", "green")
        .classed("red", function() {
          /* 真值添加，假值移除 无则测试 */
          return !d3.select(this).classed("red");
        });
    }
  }
};
</script>
<style lang="less" src="./PageD3.less">
</style>