export default (path) => {

    const {
        Vue,
        $system,
        _: {
            camelCase
        }
    } = window;

    return Vue.component(camelCase(path).toLowerCase() /* id */ , (resolve, reject) => {
        $system
            .import(path)
            .then((res) => resolve(Vue.extend(res.default)))
            .catch(reject);
    });

};