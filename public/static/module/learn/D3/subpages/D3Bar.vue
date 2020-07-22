<template>
  <div class="d3-container">
    <div class="description">
      <p>数据与图形的映射关系：当前的数值影响的是柱状体的高度。而这种简单的柱状体实现可以用div可以用svg可以用canvas，目前这个数据量用哪一个都是可以的。</p>
      <p>关键是理解这种数据与图形的映射关系，具体什么技术实现，由其他考量。</p>
      <p>max min 这些都是纯数据处理，不一定是d3 lodash 这些都可以做 ES6 好多原生的API也可以用（我不喜欢）</p>
      <p>有了Promise.all d3的defer也不是特别需要了</p>
    </div>
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
    <el-button @click="newData">
      new
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
      privateData: []
    };
  },
  computed: {
    currentData() {
      return (this.privateData.length && this.privateData) || this.data;
    }
  },
  methods: {
    only(tag) {
      this.privateData = this.data.filter(d => d.d > tag);
    },
    newData() {
      this.privateData=[];
      this.$emit("new");
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
    }
  }
};
</script>