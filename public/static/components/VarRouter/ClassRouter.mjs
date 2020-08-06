function checkValue(prop) {
    if (!(this[prop] || "number" === typeof this[prop])) {
        alert(prop);
    }
}

export default class router {
    constructor(id, pid, name, path, url, type = 0, handler = 1, icon = "icon-unorderedlist") {
        this.id = id; // "d3_init",
        this.pid = pid; // "",
        this.name = name; // "init",
        this.path = path; // "/d3/init",
        this.url = url; // "static/module/learn/D3/PageD3.vue",
        this.type = type; // 0,
        this.handler = handler; // 1,
        this.icon = icon; // ""
        ["id", "pid", "name", "path", "url", "type", "handler", "icon"].forEach(checkValue.bind(this));
    }
}