<template>
  <VarContainer>
    <VarChild :iAm="child.iAm" v-for="child in children" :key="child.iAm">
      <div :is="child.component" />
    </VarChild>
  </VarContainer>
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
import ClassRouter from "@@/static/components/VarRouter/ClassRouter.mjs";
import D3Main from "@@/static/module/learn/D3/subpages/D3Main.vue";
import D3Axes from "@@/static/module/learn/D3/subpages/D3Axes.vue";
import D3Scale from "@@/static/module/learn/D3/subpages/D3Scale.vue";
import D3Interpolator from "@@/static/module/learn/D3/subpages/D3Interpolator.vue";

export default {
  TEMPLATE_PLACEHOLDER,
  mixins: [basePageMixin],
  data() {
    return {
      children: [
        { iAm: "D3Axes", component: D3Axes },
        { iAm: "Interpolator", component: D3Interpolator },
        { iAm: "init", component: D3Main },
        { iAm: "scale", component: D3Scale },
      ],
      d3: false,
    };
  },
  mounted() {
    window._ &&
      window._.$loadLess &&
      window._.$loadLess("static/module/learn/D3/PageD3.less");
    /* TODO:<style></style> 是为了HRM 方便开发,也可以改system模板解析，再看 */

    const { APP_ROUTER } = window;
    const basePath = APP_ROUTER.currentRoute.path;
    /* 动态加载tab页的数据，但是必须先加载主页面 */
    const extendRoute = [
      new ClassRouter(
        "d3SubPage",
        "d3",
        "d3SubPage",
        "/d3/subpage",
        "@@/static/module/learn/D3/subpages/D3Bar.vue"
      ),
    ];
    APP_ROUTER.addRoutes(extendRoute);
  },
  methods: {},
};
</script>
<style lang="less" src="./PageD3.less">
</style>