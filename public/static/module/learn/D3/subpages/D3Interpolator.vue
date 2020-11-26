<template>
  <div class="d3-container d3-scale">
    <mkit>
      <pre>
### Interpolator插值器 
- 与补间有何关联？
      </pre>
    </mkit>
    <article class="article">
      <h6>interpolate(0.1);{{ interpolate(0.1) }}</h6>
      <h6>interpolate(0.99);{{ interpolate(0.99) }}</h6>
      <span
        class="d3-block"
        v-for="item in dataFont"
        :key="item.d"
        :style="item.style"
        >{{ item.d }}{{ item.style }}</span
      >
    </article>
  </div>
</template>
<style></style>
<script>
import { randomNumber } from "@@/static/js/app/github/utils.mjs";

export default {
  TEMPLATE_PLACEHOLDER,
  props: ["data"],
  data() {
    return {
      d3: "",
      dataArray: [...new Array(10)].map((i, ii) => ii + 1),
      dataFont: [],
    };
  },
  methods: {
    interpolate() {},
  },
  async mounted() {
    const d3 = await window.loadLibById("d3");
    this.d3 = d3;
    this.interpolate = d3.interpolateNumber(0, 100);

    const sizeScale = d3
      .scaleLinear() // <-A
      .domain([0, 10])
      .range([
        "italic bold 12px/30px Georgia, serif",
        "italic bold 120px/180px Georgia, serif",
      ]);

    var style = d3.style("font", sizeScale(2));
    debugger;
    this.dataFont = this.dataArray.map((i) => ({
      d: i,
      style: sizeScale(i),
    }));
  },
};
</script>
