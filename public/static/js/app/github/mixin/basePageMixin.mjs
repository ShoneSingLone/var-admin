let { APP_STATE, APP_ROUTER } = window;

export default {
    data() {
        return {
            APP_STATE:APP_STATE || window.APP_STATE,
            APP_ROUTER:APP_ROUTER || window.APP_ROUTER
        };
    },
    computed: {
        currentView() {
            return this.APP_ROUTER.currentRoute.query.sub || "main";
        },
    },
};