<template>
  <div class="var-view-router-container">
    <div>
      <h6>{{ start }} options {{ (time-start)/1000 }}</h6>
      <pre>
{{ JSON.stringify(options.tab,null,2) }}  
          </pre>
    </div>
  </div>
</template>
<script>
export default {
  name: "Demo",
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      start: Date.now(),
      time: ""
    };
  },
  mounted() {
    setInterval(() => {
      this.time = Date.now();
    }, 600);
  }
};
</script>
<style lang="scss">
</style>