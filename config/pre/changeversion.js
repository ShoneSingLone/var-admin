const fs = require("fs-extra");
const path = require("path");
let str = fs.readFileSync(path.resolve(__dirname, "../..", "public/static/js/main.sentry.js"), "utf-8");
const strnew = `STATIC_RES_VERSION: IS_DEV ? Date.now() : "${Date.now()}",`;
const regExp = /STATIC_RES_VERSION: IS_DEV \? Date.now\(\) : "([^"].*)",/;
fs.writeFileSync(path.resolve(__dirname, "../..", "public/static/js/main.sentry.js"), str.replace(regExp, strnew));