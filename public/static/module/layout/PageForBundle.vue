<template>
  <LoadingView :is="currentComponent" />
</template>

<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
export default {
  TEMPLATE_PLACEHOLDER,
  mixins: [basePageMixin],
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      currentComponent: "div",
    };
  },
  async mounted() {
    const {
      Vue,
      _: { $loadJS, $resolvePath },
    } = window;
    if (!window.vlibs) {
      await $loadJS($resolvePath("static/vlibs/vlibs.umd.js"));
    }

    const componentScrollbar = await window.vlibs.vlibs.get(
      this.options.bundle
    );

    if (!componentScrollbar) return;

    /* 
    // 注册组件，传入一个扩展过的构造器
    Vue.component('my-component', Vue.extend({  }))

    // 注册组件，传入一个选项对象 (自动调用 Vue.extend)
    Vue.component('my-component', {  })

    // 获取注册的组件 (始终返回构造器)
    var MyComponent = Vue.component('my-component')
    */
    debugger;
    this.currentComponent = Vue.extend(componentScrollbar);
  },
};
</script>