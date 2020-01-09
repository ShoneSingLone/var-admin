export default Vue => {
    const VueEventBus = new Vue({
        methods: {
            notification_error({
                message,
                description
            }) {
                alert(message);
                console.log(description);
            }
        },
    });
    VueEventBus.$on("notification_error", VueEventBus.notification_error)
    return VueEventBus;
};