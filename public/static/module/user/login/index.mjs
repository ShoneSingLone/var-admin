import setDefaultVueAntdvJS from "../../../js/vue-antdv.mjs";
const {
    _: {
        $resolvePath,
        $lazyLoadComponent,
    },
    $system
} = window;
export default async (stopLoadingAnimation) => {
    try {
        const Vue = await setDefaultVueAntdvJS();
        const { default: VueRouter } = await $system.import("vue-router");
        Vue.use(VueRouter);
        const Foo = {
            template: "<div>foo</div>"
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
};