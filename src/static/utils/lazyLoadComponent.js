export default (path) => {

    const {
        Vue,
        _: {
            $getIDFromURL
        }
    } = window;

    const id = $getIDFromURL(path);
    return Vue.component(id /* id */ , (resolve, reject) => {
        window.$system
            .import(path)
            .then((res) => {
                res.default.name = id;
                resolve(Vue.extend(res.default));
            })
            .catch(
                error => {
                    console.log("path", path);
                    reject(error);
                }
            );
    });

};