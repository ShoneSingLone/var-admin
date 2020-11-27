<template>
  <div class="d3-wrapper">
    <mkit>
      <pre>
## title

- [compound-interpolation](@@/static/module/learn/D3/subpages/cookbook/src/chapter4/compound-interpolation.html)
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
  data() {
    return {
      html: "",
      data: [...new Array(10)].map((i, ii) => ({
        d: `${randomNumber(100)}`,
      })),
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
      debugger;
    },
  },
};
</script>