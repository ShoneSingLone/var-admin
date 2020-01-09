const {
    _
} = window;
const {
    set,
    get
} = _.$idb;

export default function (path) {

    let id = _.camelCase(path).toLowerCase();
    let target = _.camelCase(_.last(path.split("/"))).toLowerCase();
    /* 白名单，如果资源在白名单上，尽量缓存 */
    if (~["systemjs"].indexOf(target)) {
        return cachePart(path, id);
    } else {
        return new Promise((resolve, reject) => {
            console.log(id);
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
}

function cachePart() {
    var opts = {
        // NB deprecate
        headers: {
            Accept: 'application/x-es-module, */*'
        }
    };


    fetch(url, opts)
        .then(function (res) {
            if (res.ok) {
                /* TODO:cache */
                source = res.blob()
                    .then(function (_blob) {
                        return _blob.text();
                    })
                    .then(function (text) {
                        return Promise.resolve(window._.$VueLoader(url, text));
                    })
            } else {
                throw new Error('Fetch error: ' + res.status + ' ' + res.statusText);
            }
        });
}