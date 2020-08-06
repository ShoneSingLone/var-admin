<template>
  <div class="var-container-child">
    <slot />
  </div>
</template>

<script>
const { APP_STATE, APP_ROUTER } = window;
export default {
  TEMPLATE_PLACEHOLDER,
  data() {
    return {
      APP_STATE,
      APP_ROUTER,
    };
  },
  async mounted() {},
  destroyed() {},
  methods: {},
};
</script>