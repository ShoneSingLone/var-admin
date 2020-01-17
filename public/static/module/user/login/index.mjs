import setDefaultVueAntdvJS from "../../../js/vue-antdv.mjs";
import VueRouter from "vue-router";
// import VueRouter from "../../../lib/vue-router.esm.browser.js";
// import VueX from "../../../lib/vuex.esm.browser.js";

const {
    _: {
        $resolvePath,
        $lazyLoadComponent,
    },
} = window;

(async (stopLoadingAnimation) => {
    try {
        const Vue = await setDefaultVueAntdvJS();
        Vue.use(VueRouter);
        var res = Vue.compile("<h1>Login Sub View</h1>");
        var render = res.render;
        const Foo = {
            render
        };
        const Bar = {
            template: "<div>bar</div>"
        };

        const routes = [{
                path: "/foo",
                component: Foo
            },
            {
                path: "/bar",
                component: Bar
            }
        ];

        // 3. 创建 router 实例，然后传 `routes` 配置
        // 你还可以传别的配置参数, 不过先这么简单着吧。
        const router = new VueRouter({
            routes // (缩写) 相当于 routes: routes
        });

        // 4. 创建和挂载根实例。
        // 记得要通过 router 配置参数注入路由，
        // 从而让整个应用都有路由功能

        new Vue({
            el: "#app",
            router,
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
})();