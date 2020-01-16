import json from "rollup-plugin-json";
import {
    terser
} from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";

export default {
    input: "src/antdv/index.js",
    output: [{
        dir: "src/antdv/bundle",
        // format: "cjs"
        format: "es"
    }, {
        dir: "src/antdv/bundle.min",
        // format: "iife",
        format: "es",
        name: "version",
        sourcemap: true,
        plugins: [terser()]
    }],
    plugins: [
        commonjs(),
        resolve(),
        babel(),
        json()
    ]
};