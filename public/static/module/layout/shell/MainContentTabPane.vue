<template>
  <div
    class="el-tab-pane"
    v-if="!lazy || loaded || active"
    v-show="active"
    role="tabpanel"
    :aria-hidden="!active"
    :id="`pane-${paneName}`"
    :aria-labelledby="`tab-${paneName}`"
    @click.right="handleClickTab(tab)"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  TEMPLATE_PLACEHOLDER,
  name: "TabPane",
  componentName: "TabPane",
  props: {
    id: String,
    label: String,
    labelContent: Function,
    name: String,
    closable: Boolean,
    disabled: Boolean,
    lazy: Boolean,
  },

  data() {
    return {
      index: null,
      loaded: false,
    };
  },
  methods: {
    handleClickTab(event) {
      event.stopPropagation();
      event.preventDefault();
      debugger;
    },
  },

  computed: {
    isClosable() {
      return this.closable || this.$parent.closable;
    },
    active() {
      const active = this.$parent.currentName === (this.name || this.index);
      if (active) {
        this.loaded = true;
      }
      return active;
    },
    paneName() {
      return this.id || this.name || this.index;
    },
  },
  updated() {
    this.$parent.$emit("tab-nav-update");
  },
};
</script>
