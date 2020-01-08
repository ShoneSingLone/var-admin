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
    console.table([...c]);
    if (window.isOldBrowser) {
        await loadJS(resolvePath("static/lib/polyfill/babel-polyfill.js"));
    }
})(c);

console.log('a', a);