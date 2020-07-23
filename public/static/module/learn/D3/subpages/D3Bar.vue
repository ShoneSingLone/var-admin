<template>
  <div class="d3-container chart-bar">
    <div
      v-for="(item, index) in currentData"
      :key="index"
      :class="['h-bar',getClass(item.d)]"
      :style="{height:item.d+'px'}"
    >
      <span class="h-bar-text">{{ item.d }}</span>
    </div>
    <el-button @click="only(50)">
      >50
    </el-button>
  </div>
</template>
<style>
</style>
<script>
export default {
  TEMPLATE_PLACEHOLDER,
  props: ["data"],
  data() {
    return {
      privateData: [],
    };
  },
  computed: {
    currentData() {
      return (this.privateData.length && this.privateData) || this.data;
    },
  },
  watch: {
    data() {
      this.privateData = [];
    },
  },
  methods: {
    only(tag) {
      this.privateData = this.data.filter((d) => d.d > tag);
    },
    getClass(d) {
      if (d > 90) {
        return "red";
      } else if (d > 70) {
        return "yellow";
      } else if (d > 50) {
        return "blue";
      } else {
        return "green";
      }
    },
  },
};
</script>