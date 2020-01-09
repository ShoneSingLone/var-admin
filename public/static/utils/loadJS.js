export default function (path) {
    const { _ } = window;

    return new Promise((resolve, reject) => {
        let id = _.camelCase(path).toLowerCase()
        let ele = _.merge(document.createElement("script"), {
            id,
            src: path
        });
        ele.onerror = function (e) {
            ele = ele.onerror = ele.onload = null;
            reject(e);
        }
        ele.onload = function (e) {
            ele = ele.onerror = ele.onload = null;
            resolve();
        }
        document.body.appendChild(ele);
    });
}