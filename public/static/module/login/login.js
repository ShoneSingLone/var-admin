const {
    _: {
        $loadJS,
        $resolvePath,
        $lazyLoadComponent
    },
    IS_DEV
} = window;

export default async (stopLoadingAnimation) => {
    try {
        await $loadJS($resolvePath("static/lib/vue-2.6.11.broswer.js"));
        const DatePicker= await window.$system.import($resolvePath("static/lib/ant-design-vue/date-picker/index.js"));
        debugger;
        const {
            Vue
        } = window;
        new Vue({
            el: "#app",
            components: {
                DatePicker,
                appvue: $lazyLoadComponent($resolvePath("static/module/login/Login.vue"))
            },
            data: () => ({
                currentComponent: "appvue"
            }),
            mounted() {
                this.currentComponent = "appvue";
                stopLoadingAnimation();
            },
        });
    } catch (error) {
        console.error(error);
    }
};