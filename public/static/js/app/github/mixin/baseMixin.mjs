const {
    APP_STATE,
    APP_ROUTER
} = window;

export default {
    data() {
        return {
            APP_STATE,
            APP_ROUTER
        };
    },
    computed: {
        currentView() {
            return this.APP_ROUTER.currentRoute.query.sub || "main";
        },
    },
};