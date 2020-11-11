<template>
  <LoadingView :is="currentComponent" />
</template>

<script>
    import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
    export default {
        TEMPLATE_PLACEHOLDER,
        mixins: [basePageMixin],
        data() {
            return {
                currentComponent: "div"
            };
        },
        async mounted() {
            const {
                Vue,
                _: {
                    $loadJS,
                    $resolvePath
                }
            } = window;

            if (!window.vlibs) {
                await $loadJS($resolvePath("static/vlibs/vlibs.umd.js"));
            }
            const componentScrollbar = await window.vlibs.vlibs.get("Scrollbar");
            this.currentComponent = Vue.component("PageScrollDemoScrollbar", componentScrollbar);
        }
    };
</script>