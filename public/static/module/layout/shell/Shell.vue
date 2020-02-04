<template>
  <a-layout
    style="height:100vh;"
    :class="['layout', device]"
  >
    test
    {{ device }}
  </a-layout>
</template>
<script>
export default {
  TEMPLATE_PLACEHOLDER,
  data() {
    return {
      collapsed: false
    };
  }
};
</script>