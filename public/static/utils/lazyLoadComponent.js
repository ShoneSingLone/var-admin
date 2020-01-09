export default (path) => {

    const {
        Vue,
        $system,
        _: {
            camelCase
        }
    } = window;

    return Vue.component(camelCase(path).toLowerCase(), (resolve, reject) => {
        $system
            .import(path)
            .then(function (res) {
                debugger;
                resolve(Vue.extend(res));
            })
            .catch(function (error) {
                debugger;
                reject(error);
            });
    });

};