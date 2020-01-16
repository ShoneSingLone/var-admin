const {
    _: {
        $loadJS,
        $resolvePath,
        merge,
        $axios
    }
} = window;

export default async () => {
    /* $loadJS($resolvePath())加载的代码不经过systemjs转码 */
    await $loadJS($resolvePath("static/lib/vue-2.6.11.broswer.js"));
    /* 获取完整lodash */
    await $loadJS($resolvePath("static/lib/lodash-4.17.11.js"));
    window._ = merge(window._.noConflict(), window._);
    await $loadJS($resolvePath("static/lib/antdv/antd.min.js"));
    /* axios 拦截配置 */

    /* message使用ant-design */
    window.Vue.prototype.$http = $axios;
    debugger;

    return Promise.resolve(window.Vue);
};