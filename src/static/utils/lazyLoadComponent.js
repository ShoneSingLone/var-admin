export default (path) => {

    const {
        Vue,
        $system,
        _: {
            $getIDFromURL
        }
    } = window;

    const id = $getIDFromURL(path);
    return Vue.component(id /* id */ , (resolve, reject) => {
        $system
            .import(path)
            .then((res) => {
                res.default.name = id;
                resolve(Vue.extend(res.default));
            })
            .catch(reject);
    });

};