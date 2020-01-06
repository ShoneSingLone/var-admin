import path from "path";
const resolve = (subPath) => path.resolve(__dirname, subPath);

export default {
    input: resolve('./src/main.js'),
    output: {
        name: "NULL_BUNDLE",
        file: resolve('./bundle.js'),
        format: 'iife'
    }
};