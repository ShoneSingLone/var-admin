let {
    APP_STATE,
    APP_ROUTER
} = window;

export default {
    data() {
        APP_STATE = APP_STATE || window.APP_STATE
        APP_ROUTER = APP_ROUTER || window.APP_ROUTER
        return {
            APP_STATE,
            APP_ROUTER
        };
    },
    computed: {
        currentView() {
            debugger;
            this.options
            return this.APP_ROUTER.currentRoute.query.sub || "main";
        },
    },
};