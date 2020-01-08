import appvue from "./App.vue";
console.log('appvue', appvue);
let a = {
    a: "aaa"
};
let b = {
    a: "aaa"
};
let c = {
    a,
    b
};

(async (c) => {
    try {
        console.log({
            ...c
        });
        if (window.isOldBrowser) {
            await loadJS(resolvePath("static/lib/polyfill/babel-polyfill.js"));
        }
    } catch (error) {
        console.error(error);
    }
})(c);

console.timeEnd('a');