<template>
  <div>
    <p />
    <div
      v-for="(item, index) in data"
      :key="index"
      :class="['h-bar',getClass(item.width)]"
      :style="{width:item.width+'px'}"
    >
      <span>{{ item.width }}</span>
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  TEMPLATE_PLACEHOLDER,
  props: ["data"],
  methods: {
    getClass(width) {
      if (width > 90) {
        return "red";
      } else if (width > 70) {
        return "yellow";
      } else if (width > 50) {
        return "blue";
      } else {
        return "green";
      }
    }
  }
};
</script>