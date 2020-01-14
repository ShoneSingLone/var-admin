const {
    _: {
        $loadJS,
        $resolvePath,
        $lazyLoadComponent,
        isObject
    },
    IS_DEV
} = window;


export default async (stopLoadingAnimation) => {
    try {
        await $loadJS($resolvePath("static/lib/vue-2.6.11.broswer.js"));
        // await $loadJS($resolvePath("static/lib/antd/antd.js"));
        const {
            antd
        } = window;

        function toStr(antd) {
            for (const key in antd) {
                if (antd.hasOwnProperty(key)) {
                    const element = antd[key];
                    if (isObject(element)) {
                        toStr(element);
                    } else if (element) {
                        console.log(element.toString());
                    }
                }
            }
        }
        // toStr(antd);
        // const DatePicker = await window.$system.import($resolvePath("static/lib/antd/es/index.js"));
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