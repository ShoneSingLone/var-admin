<template>
  <VarContainer>
    <VarChild i-am="init">
      <div class="d3-wrapper">
        <mkit>
          <pre>
- [observablehq](https://observablehq.com/@d3/gallery)
- [christopheviau's gallery](https://christopheviau.com/d3list/gallery.html)
- [d3 Tutorials](https://github.com/d3/d3/wiki/Tutorials)
- [d3-plugins](https://github.com/d3/d3-plugins)
- [mbostock](https://bl.ocks.org/mbostock)
---
### 大概

类似`jQuery`的选择器，链式调用方法，面向过程（有听说是函数式，感觉不太明显...不过纯函数每次都是`render`出来倒还挺符合）; `node()=>`获取集合

### 进入-更新-退出

说人话:数据、画布上的可视化元素（图形）是两个东西。可能数据多，元素少，可能数据少元素多，吧啦吧啦，而我们需要保证数据和元素一一对应。以面向过程的思考方式，我们需要确定，何时、如何、根据数据增加、减少元素，但是面向对象（MVVM模式）不需要人来关心这些细节。所以这个模式看看就好，不用太在意。
数据可视化的所有内容——将数据高效、准确地映射为图形,通过图形讲故事，透露出数据隐藏的信息。

> 单射函数 

> 满射函数

> 假设A和B为两个非空集合。函数f是A到B的一个映射，使得集合A中的任何一个元素在集合B中都有唯一的元素与它对应。当元素b是集合A中的元素a通过函数f映射到集合B中的唯一元素时，记作f(a)=b。
      </pre>
        </mkit>
        <div v-html="html" />
        <div id="d3" />
        <div>
          <el-button @click="newData">
            new data
          </el-button>
          <div>{{ dataBar }}</div>
        </div>
        <mkit>
          <pre>
数据与图形的映射关系：当前的数值影响的是柱状体的高度。

而这种简单的柱状体实现可以用`div`可以用`svg`可以用`canvas`，目前这个数据量用哪一个都是可以的。
关键是理解这种数据与图形的映射关系，具体什么技术实现，由其他考量。
`max` `min` 这些都是纯数据处理，并不一定用`d3`，像`lodash` 这些都可以做，特别是ES6原生的API也可以用（尽管我不喜欢用）。
有了`Promise.all` `d3`的`defer`也不是特别需要了。
      </pre>
        </mkit>
        <D3Bar :data="dataBar" />
      </div>
    </VarChild>
    <VarChild i-am="scale">
      <mkit>
        <pre> ## scale
        ###  </pre>
      </mkit>
      <D3Scale />
    </VarChild>
  </VarContainer>
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
import { SimpleWidget } from "@@/static/module/learn/D3/a1.mjs";
import D3Bar from "@@/static/module/learn/D3/subpages/D3Bar.vue";
import D3Scale from "@@/static/module/learn/D3/subpages/D3Scale.vue";
import { randomNumber } from "@@/static/js/app/github/utils.mjs";
import ClassRouter from "@@/static/components/VarRouter/ClassRouter.mjs";

export default {
  TEMPLATE_PLACEHOLDER,
  components: {
    D3Bar,
    D3Scale,
  },
  mixins: [basePageMixin],
  data() {
    return {
      html: "",
      d3: false,
      dataBar: [...new Array(10)].map((i, ii) => ({
        d: `${randomNumber(100)}`,
      })),
    };
  },
  mounted() {
    window._ &&
      window._.$loadLess &&
      window._.$loadLess("static/module/learn/D3/PageD3.less");

    const { APP_ROUTER } = window;
    const basePath = APP_ROUTER.currentRoute.path;
    const extendRoute = [
      new ClassRouter(
        "d3SubPage",
        "d3",
        "d3SubPage",
        "/d3/subpage",
        "@@/static/module/learn/D3/subpages/D3Bar.vue"
      ),
    ];
    APP_ROUTER.addRoutes(extendRoute);

    this.init();
  },
  methods: {
    newData() {
      this.dataBar = [...new Array(10)].map((i, ii) => ({
        d: `${randomNumber(100)}`,
      }));
    },
    changeData() {
      this.dataBar.shift();
      this.dataBar.push({
        d: `${randomNumber(100)}`,
      });
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
        .classed("red", function () {
          /* 真值添加，假值移除 无则测试 */
          return !d3.select(this).classed("red");
        });

      d3.scaleLinear() // <-A
        .domain([1, 10]) // <-B
        .range([1, 10]);
    },
  },
};
</script>
<style lang="less" src="./PageD3.less">
</style>