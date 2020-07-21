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
      <li>node()=>获取集合</li>
      <p>
        进入-更新-退出：
        说人话
        数据和画布上的可视化元素是两个东西。可能数据多，元素少，可能数据少元素多，吧啦吧啦，而我们需要保证数据和元素一一对应。以面向过程的思考方式，我们需要确定，何时、如何、根据数据增加、减少元素，但是面向对象（MVVM模式）不需要人来关心这些细节。所以这个模式看看就好，不用太在意。
      </p>
    </ul>
    <div id="d3" />
    {{ dataAa }}
    <D3Aa :data="dataAa" />
  </div>
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
import { SimpleWidget } from "@@/static/module/learn/D3/a1.mjs";
import D3Aa from "@@/static/module/learn/D3/subpages/D3Aa.vue";
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
export default {
  TEMPLATE_PLACEHOLDER,
  components: {
    D3Aa
  },
  mixins: [basePageMixin],
  data() {
    return {
      dataAa: [...new Array(10)].map((i, ii) => ({
        width: `${randomNumber(100)}`
      }))
    };
  },
  mounted() {
    window._ &&
      window._.$loadLess &&
      window._.$loadLess("static/module/learn/D3/PageD3.less");
    this.init();
    this.changeData();
  },
  methods: {
    changeData() {
      setTimeout(() => {
        this.dataAa.shift();
        this.dataAa.push({
          width: `${randomNumber(100)}`
        });
        this.changeData();
      }, 1000*2);
    },
    async init() {
      const d3 = await window.loadLibById("d3");
      console.log("init -> d3", d3);
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