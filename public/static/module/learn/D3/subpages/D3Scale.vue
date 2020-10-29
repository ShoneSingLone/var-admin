<template>
  <div class="d3-container d3-scale">
    <mkit>
      <pre>
 ## scale

 - 线性
 - 指数
 - 对数
      </pre>
    </mkit>
    <svg>
      <g>
        <path :d="lineCapped" style="stroke: black; fill: none" />
        <path :d="line" style="stroke: green; fill: none" />
      </g>
    </svg>
    <svg>
      <g>
        <path :d="linePowCapped" style="stroke: black; fill: none" />
        <path :d="linePow" style="stroke: green; fill: none" />
      </g>
    </svg>
    <svg>
      <g>
        <path :d="lineLogCapped" style="stroke: black; fill: none" />
        <path :d="lineLog" style="stroke: green; fill: none" />
      </g>
    </svg>
    <mkit>
      <pre>
## 时间

      </pre>
    </mkit>
  </div>
</template>
<style>
</style>
<script>
import { randomNumber } from "@@/static/js/app/github/utils.mjs";

export default {
  TEMPLATE_PLACEHOLDER,
  props: ["data"],
  data() {
    return {
      line: "M 0,0",
      lineCapped: "M 0,0",
      linePow: "M 0,0",
      linePowCapped: "M 0,0",
      lineLog: "M 0,0",
      lineLogCapped: "M 0,0",
    };
  },
  async mounted() {
    /* 300*300  */
    const d3 = await window.loadLibById("d3");
    const data = [...new Array(10)].map((i, ii) => (ii + 1) * 3);

    /* 定义域 映射到值域 */
    const fnLine = d3.scaleLinear().domain([1, 10]).range([1, 10]);
    const fnLineCapped = d3.scaleLinear().domain([1, 10]).range([1, 30]);

    /* exponet指数 */
    /* 定义域 domain */
    /* 值域 range */
    /* 值域 rangeRound 结果四舍五入 */

    const fnLinePow = d3.scalePow().exponent(2);
    const fnLinePowCapped = d3
      .scalePow()
      .exponent(2)
      .domain([1, 10])
      .rangeRound([1, 10]);

    /* 对数 */
    const fnLineLog = d3.scaleLog();
    const fnLineLogCapped = d3.scaleLog().domain([1, 10]).rangeRound([1, 10]);

    function getLine(fn, data) {
      return data.map((d, i) => `L${(i + 1) * 30},${fn(d)}`).join(" ");
    }
    this.line += getLine(fnLine, data);
    this.lineCapped += getLine(fnLineCapped, data);
    this.linePow += getLine(fnLinePow, data);
    this.linePowCapped += getLine(fnLinePowCapped, data);
    this.lineLog += getLine(fnLineLog, data);
    this.lineLogCapped += getLine(fnLineLogCapped, data);
  },
};
</script>