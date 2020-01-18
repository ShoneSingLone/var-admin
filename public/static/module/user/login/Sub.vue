<template>
  <h1>spend time{{ time }}</h1>
</template>

<script>
export default {
  TEMPLATE_PLACEHOLDER,
  data() {
    var time = Date.now() - window.APP_CONFIGS.start;
    return { time };
  }
};
</script>