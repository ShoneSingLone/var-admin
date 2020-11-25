<template>
  <div class="var-container-child" :data-layout="zIndex" v-show="zIndex === 1">
    <slot />
  </div>
</template>

<script>
const { APP_STATE, APP_ROUTER } = window;
export default {
  TEMPLATE_PLACEHOLDER,
  props: {
    iAm: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      zIndex: 0,
      APP_STATE,
      APP_ROUTER,
    };
  },
  watch: {
    zIndex(zIndex) {
      this.$el.style.zIndex = zIndex;
    },
  },
  async mounted() {
    if (this.$parent.register) {
      this.$parent.register(this.iAm, this);
    } else {
      console.error("VarChild must nest in VarContainer directly");
    }
  },
  async destroyed() {
    if (this.$parent.unregister) {
      this.$parent.unregister(this.iAm, this);
    } else {
      console.error("VarChild must nest in VarContainer directly");
    }
  },
  methods: {},
};
</script>