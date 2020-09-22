<template>
  <div class="var-container">
    <div class="options">
      <el-button @click="toggle">
        switch
      </el-button>
    </div>
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
      children: {},
      childView: "",
    };
  },
  async mounted() {
    const {
      _: { debounce },
    } = window;

    this.$watch(
      "childView",
      debounce((childView, childViewLast) => {
        const child = this.children[childView];
        const childLast = this.children[childViewLast];
        if (child) {
          child.zIndex = 1;
        }
        if (childLast) {
          childLast.zIndex = 0;
        }
      }, 300),
      { immediate: true }
    );
  },
  destroyed() {},
  methods: {
    register(childName, child) {
      if (this.children[childName]) {
        console.error(`VarChild ${childName} i-am 属性值重复`);
      } else {
        this.$set(this.children, childName, child);
        if (!this.childView) {
          this.childView = childName;
        }
      }
    },
    unregister(childName, child) {
      delete this.children[childName];
    },
  },
};
</script>