const {
    _: {
        $loadJS,
        $resolvePath,
        $lazyLoadComponent
    }
} = window;

export default async () => {
    try {
        await $loadJS($resolvePath("static/lib/vue-2.6.11.broswer.js"));
        const {
            Vue
        } = window;
        debugger;
        new Vue({
            el: "#app",
            mounted() {
                setTimeout(() => {
                    this.currentComponent = "appvue";
                }, 1000 * 1);
            },
            data: () => ({
                currentComponent: ""
            }),
            components: {
                appvue: $lazyLoadComponent($resolvePath("static/module/login/Login.vue"))
            }
        });
    } catch (error) {
        console.error(error);
    }
};