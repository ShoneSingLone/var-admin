/* eslint-disable */
__webpack_public_path__ = window.__webpack_public_path__;

window.LAZY_LOADER.antdv = () => {
    const {
        _: {
            $loadCSS,
            $resolvePath,
        },
        Vue
    } = window;
    Vue.ANT_D_V_COMPONENTS = {};
    Promise.all([
            $loadCSS($resolvePath("static/lib/antdv/es/style/index.css")),
            import("ant-design-vue/es/base"),
        ])
        .then(function (res) {
            Vue.ANT_D_V_COMPONENTS.base = true;
            Vue.use(res[1].default);
        })
        .catch(function (error) {
            console.error(error);
        });


    Vue.ANT_D_V_COMPONENTS.AAffix = false;
    window.Vue.component("AAffix", (resolve, reject) => {
        Promise.all([
                $loadCSS($resolvePath("static/lib/antdv/es/affix/style/index.css")),
                import( /* webpackChunkName: "AAffix" */ "ant-design-vue/es/affix")
            ]).then((res) => {
                Vue.ANT_D_V_COMPONENTS.AAffix = true;
                resolve(res[1].default);
            })
            .catch(reject);
    });
};