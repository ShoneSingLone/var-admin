import setDefaultVueAntdvJS from "../../../js/vue-antdv.mjs";
const {
    _: {
        $resolvePath,
        $lazyLoadComponent,
    },
} = window;

export default async (stopLoadingAnimation) => {
    try {
        const Vue = await setDefaultVueAntdvJS();
        new Vue({
            el: "#app",
            components: {
                appvue: $lazyLoadComponent($resolvePath("static/module/user/login/Login.vue"))
            },
            data: () => ({
                currentComponent: "appvue"
            }),
            mounted() {
                stopLoadingAnimation();
            },
        });
    } catch (error) {
        console.error(error);
    }
};