(() => {
    new Vue({
        el: "#app",
        data() {
            return {
                urls: [{
                        url: "nav",
                    },
                    {
                        url: "login",
                    },
                    {
                        url: "首页",
                    },
                    {
                        url: "下钻",
                    },
                    {
                        url: "info",
                    },
                    {
                        url: "list",
                    },
                    {
                        url: "detail",
                    }
                ]
            }
        }
    });
})();