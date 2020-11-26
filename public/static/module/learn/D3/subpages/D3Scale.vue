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

```js
var start = new Date(2016, 0, 1),
      end = new Date(2016, 11, 31),
      range = [0, 1200],
      timeScale = d3 //是scale工具
        .scaleTime()
        .domain([start, end]) 
        .rangeRound(range)
```
- [time-scale](@@/static/module/learn/D3/subpages/cookbook/src/chapter4/time-scale.html)
- [D3时间格式化工具](https://github.com/d3/d3-time-format/blob/master/README.md#locale_format)
```js
var format = d3.timeFormat("%x");
```
      </pre>
    </mkit>
    <div id="time" class="clear">
      <span>Linear Time Progression<br /></span>
      <span>将时间 [01/01/2016, 12/31/2016] 映射成 [0, 1200]的数值<br /></span>
      <svg viewBox="0 0 1200 100">
        <g>
          <path
            d="M 0,50 1200,50"
            style="stroke-width: 10; stroke: #009688; fill: none"
          />
          <template v-for="date in dateLine">
            <circle
              :name="date.label"
              :title="date.label"
              :key="date.label"
              :cx="date.cx"
              cy="50"
              r="6"
              style="stroke: black; fill: #3f51b5"
            />
          </template>
        </g>
      </svg>
    </div>
    <mkit>
      <pre>
这些示例已经展示得很明显，可以将D3视为一个算法库，将数据做映射，如果线条不够平滑，还需要在处理成更细粒度的数据或者贝塞尔曲线的关键点。
                </pre
      >
    </mkit>
    <D3ScaleOrdinal />
  </div>
</template>
<style>
</style>
<script>
import { randomNumber } from "@@/static/js/app/github/utils.mjs";
import D3ScaleOrdinal from "@@/static/module/learn/D3/subpages/D3ScaleOrdinal.vue";

export default {
  TEMPLATE_PLACEHOLDER,
  components: {
    D3ScaleOrdinal,
  },
  props: ["data"],
  data() {
    return {
      dateLine: [],
      line: "M 0,0",
      lineCapped: "M 0,0",
      linePow: "M 0,0",
      linePowCapped: "M 0,0",
      lineLog: "M 0,0",
      lineLogCapped: "M 0,0",
    };
  },
  methods: {
    lineScale() {
      /* 300*300  */
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
    timeScale() {
      var start = new Date(2016, 0, 1), // <-A
        end = new Date(2016, 11, 31),
        range = [0, 1200],
        fnTimeScale = d3
          .scaleTime()
          .domain([start, end]) // <-B
          .rangeRound(range), // <-C
        max = 12,
        data = [];

      for (var i = 0; i < max; ++i) {
        var date = new Date(start.getTime());
        date.setMonth(start.getMonth() + i);
        data.push(date);
      }
      var format = d3.timeFormat("%x");
      this.dateLine = data.map((date) => {
        return {
          cx: fnTimeScale(date),
          label: format(date),
        };
      });
    },
  },
  async mounted() {
    const d3 = await window.loadLibById("d3");
    this.timeScale();
    this.lineScale();
  },
};
</script>