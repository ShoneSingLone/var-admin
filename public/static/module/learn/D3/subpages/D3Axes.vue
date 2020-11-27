<template>
  <div class="d3-wrapper">
    {{ data }}
    <mkit>
      <pre>
## D3Axes 坐标

- [basic-axes](@@/static/module/learn/D3/subpages/cookbook/src/chapter5/basic-axes.html)

1. svg class width height
1. g 

      </pre>
    </mkit>

    <div>
      <svg width="500" height="500">
        
        
      </svg>
    </div>
  </div>
</template>
<style>
</style>
<script>
import { randomNumber } from "@@/static/js/app/github/utils.mjs";

export default {
  TEMPLATE_PLACEHOLDER,
  data() {
    return {
      html: "",
      data: [...new Array(10)].map((i, ii) => ii + 1),
    };
  },
  computed: {},
  watch: {
    data() {},
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const d3 = await window.loadLibById("d3");
      this.d3 = d3;
    },
  },
};
</script>
<style lang="less" scoped>
table {
  colspan: 9;
}
td {
  outline: 1px solid blue;
}
</style>