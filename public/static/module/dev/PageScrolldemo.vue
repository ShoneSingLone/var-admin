<template>
    <LoadingView :is="currentComponent"></LoadingView>
</template>
<script>
    import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";

    export default {
        TEMPLATE_PLACEHOLDER,
        mixins: [basePageMixin],
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
            const res = await window.vlibs.vlibs.get("Scrollbar");
            const componentScrollbar = res.default;
            this.currentComponent = Vue.component("PageScrollDemoScrollbar", componentScrollbar);
        },
        data() {
            return {
                currentComponent: "div"
            }
        }
    }
</script>