(() => {
    new Vue({
        el: "#app",
        data() {
            return {
                urls: [{
                        url: "nav.png",
                        question: [
                            '使用的第三方库有哪些',
                            '多边形如何制作'
                        ]
                    },
                    {
                        url: "login.png",
                        question: [
                            '布局方案',
                            '组件划分',
                            '预计以后会修改的部分'
                        ]

                    },
                    {
                        url: "首页.png",
                    },
                    {
                        url: "下钻.png",
                    },
                    {
                        url: "info.png",
                    },
                    {
                        url: "et.gif",
                    },
                    {
                        url: "list.png",
                    },
                    {
                        url: "detail.png",
                    }
                ]
            }
        }
    });
})();