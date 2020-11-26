<template>
  <div class="d3-container d3-scale">
    <mkit>
      <pre>
### 有序尺度
- [ordinal-scale](@@/static/module/learn/D3/subpages/cookbook/src/chapter4/ordinal-scale.html)
- [d3-scaleordinal](https://observablehq.com/@d3/d3-scaleordinal)
- [schemeCategory10](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#schemeCategory10)

```js
//返回的函数fnNumberToAlphabet是映射数值的工具函数
    this.fnNumberToAlphabet = this.d3
      .scaleOrdinal()
      .domain([...new Array(10)].map((i, ii) => ii + 1))
      .range(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);
```
```js
//对应的就是字母，颜色等等
      this.dataArrayColor = this.dataArray.map((i, ii) => ({
        d: this.fnNumberToColor(i.d),
        index: ii + 1,
      }));

```
      </pre>
    </mkit>
    <div>
      <el-button @click="setData">new Data</el-button>
      <div>
        <span
          class="d3-block"
          v-for="item in dataArray"
          :key="item.index"
          :style="{ height: 20 + Number(item.d) + 'px' }"
          >{{ item.d }}</span
        >
      </div>
      <div>
        <h6>字母</h6>
        <span
          class="d3-block"
          v-for="item in dataArrayAlphabet"
          :key="item.index"
          >{{ item.d }}</span
        >
      </div>
      <div style="color: white">
        <h6 style="color: black">颜色</h6>
        <span
          class="d3-block"
          v-for="item in dataArrayColor"
          :key="item.index"
          :style="{ background: item.d }"
          >{{ item.d }}</span
        >
      </div>
    </div>
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
      dataArrayAlphabet: [],
      dataArrayColor: [],
      dataArray: [...new Array(10)].map((i, ii) => ({
        index: ii,
        d: ii + 1,
      })),
    };
  },
  methods: {
    setData(isNew) {
      if (isNew) {
        this.dataArray = [...new Array(10)].map((i, ii) => ({
          index: ii,
          // d: ii,
          d: randomNumber(100),
        }));
      }
      this.ordinal();
      this.color();
    },
    color() {
      this.dataArrayColor = this.dataArray.map((i, ii) => ({
        d: this.fnNumberToColor(i.d),
        index: ii + 1,
      }));
    },
    ordinal() {
      this.dataArrayAlphabet = this.dataArray.map((i, ii) => ({
        d: this.fnNumberToAlphabet(i.d),
        index: ii + 1,
      }));
    },
  },
  async mounted() {
    this.d3 = await window.loadLibById("d3");
    this.fnNumberToAlphabet = this.d3
      .scaleOrdinal()
      .domain([...new Array(10)].map((i, ii) => ii + 1))
      .range(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);
    this.fnNumberToColor = this.d3.scaleOrdinal(this.d3.schemeCategory10);
    this.setData();
  },
};
</script>
