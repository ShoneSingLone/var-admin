(function (axios, _, Cookies) {
    var service = axios.create({
        baseURL: window.APP_CONFIGS.BASE_URL,
        timeout: 1000 * 180,
        headers: {
            Accept: "application/json"
        },
        withCredentials: true
    });

    /****** request拦截器==>对请求参数做处理 ******/
    service.interceptors.request.use(
        function (config) {
            config.headers = config.headers || {};
            // app.$vux.loading.show({});
            var token = _.$ls.get("access_token");
            if (token) {
                config.headers["Authorization"] = "token  " + token;
            }
            /* 菜单显示的语言，如果没有则为null */
            config.headers["Accept-Language"] = Cookies.get("language") || "zh-CN";
            return config;
        },
        function (error) {
            //请求错误处理
            // app.$vux.toast.show({ type: "warn", text: error });
            return Promise.reject(error);
        }
    );
    /****** respone拦截器==>对响应做处理 ******/

    service.interceptors.response.use(
        debugger;
        function (response) {
            //成功请求到数据
            // app.$vux.loading.hide();
            //这里根据后端提供的数据进行对应的处理
            if (response.status === 200) {
                return response.data;
            } else {
                return response; //常规错误处理
                // app.$vux.toast.show({ type: "warn", text: response.data.data.msg });
            }
        },
        function (error) {
            //响应错误处理
            console.log("error");
            console.log(error);
            console.log(JSON.stringify(error));
            // let text = JSON.parse(JSON.stringify(error)).response.status === 404 ?
            //     "404" :
            //     "网络异常，请重试";
            // app.$vux.toast.show({
            //     type: "warn",
            //     text: text
            // });

            return Promise.reject(error);
        }
    );
    window._.$axios = service;
})(window._.$axios, window._, window.Cookies);