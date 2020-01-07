import _ from "lodash";
export default function (path) {
    return new Promise((resolve, reject) => {
        var id = _.camelCase(path).toLowerCase()
        var ele = _.merge(document.createElement("script"), {
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