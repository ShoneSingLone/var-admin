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
      <p>
        数据可视化的所有内容——将数据高效、准确地映射为图形,通过图形讲故事，透露出数据隐藏的信息。
        单射函数 满射函数
      </p>
    </ul>
    <mkit>
      # asadfasfd
      \n
      ~~asdf~~
      \n
      # asdfasdf
      ---
      >假设A和B为两个非空集合。函数f是A到B的一个映射，使得集合A中的任何一个元素在集合B中都有唯一的元素与它对应。当元素b是集合A中的元素a通过函数f映射到集合B中的唯一元素时，记作f(a)=b。
    </mkit>
    <div v-html="html" />
    <div id="d3" />
    {{ dataBar }}
    d3.max:{{ d3&&d3.max(dataBar.map(d=>d.d)) }}
    <D3Bar
      :data="dataBar"
      @new="changeData"
    />
  </div>
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
import { SimpleWidget } from "@@/static/module/learn/D3/a1.mjs";
import D3Bar from "@@/static/module/learn/D3/subpages/D3Bar.vue";
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
export default {
  TEMPLATE_PLACEHOLDER,
  components: {
    D3Bar
  },
  mixins: [basePageMixin],
  data() {
    return {
      html: "",
      d3: false,
      dataBar: [...new Array(10)].map((i, ii) => ({
        d: `${randomNumber(100)}`
      }))
    };
  },
  mounted() {
    window._ &&
      window._.$loadLess &&
      window._.$loadLess("static/module/learn/D3/PageD3.less");
    this.init();
  },
  methods: {
    changeData() {
      this.dataBar.shift();
      this.dataBar.push({
        d: `${randomNumber(100)}`
      });
      this.changeData();
    },
    async init() {
      const d3 = await window.loadLibById("d3");
      this.d3 = d3;

      console.log("init -> d3", d3);
      var widget = SimpleWidget(d3, { color: "#6495ed" })
        .headline("Simple Widget")
        .description(
          "This is a simple widget demonstrating functional javaScript."
        );

      widget.render();
      d3.selectAll(".d3-wrapper li").style("color", "green");
      d3.selectAll(".d3-wrapper li a")
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