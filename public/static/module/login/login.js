const {
    _: {
        $loadJS,
        $resolvePath,
        $lazyLoadComponent,
    },
    IS_DEV
} = window;


export default async (stopLoadingAnimation) => {
    try {
        await $loadJS($resolvePath("static/lib/vue-2.6.11.broswer.js"));
        await $loadJS($resolvePath("static/lib/bundle/antdv.bundle.js"));
        console.log(window.ANT_D_V_COMPONENTS);
        const {
            Vue
        } = window;

        new Vue({
            el: "#app",
            components: {
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