import("./_main.styl");
import restful_url_list from "./RESTFUL_URL_LIST.js";

window.RESTFUL_URL_LIST = restful_url_list;
window.VueComponents = window.VueComponents || {
    add(component) {
        if (this[component.name]) {
            console.error(`${component.name} is exited`);
        } else {
            this[component.name] = component;
        }
    }
};
window.VueComponents.add(test);