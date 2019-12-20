<template>
  <div class="Demo">
    <h1>Demo</h1>
  </div>
</template>
<script>
export default {
  name: "Demo",
  data() {
    return {};
  },
  methods: {},
  async mounted() {
    try {
      const axios = await import("axios").then(axios => axios);
      const res = await axios.get("/");
      console.log("res");
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
<style lang="scss">
</style>