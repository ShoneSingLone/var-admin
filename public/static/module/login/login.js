const {
    _: {
        $loadJS,
        $resolvePath,
        $lazyLoadComponent
    },
    isOldBrowser
} = window;
console.log('isOldBrowser', isOldBrowser);
(async () => {
    try {
        await $loadJS($resolvePath("static/lib/vue-2.6.11.broswer.js"));
        const {
            Vue
        } = window;
        new Vue({
            el: "#app",
            components: {
                appvue: $lazyLoadComponent("static/module/login/Login.vue")
            }
        });
    } catch (error) {
        console.error(error);
    }
})();