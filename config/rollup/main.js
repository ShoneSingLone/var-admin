// src/main.js
import foo from "./foo.js";
import merge from "lodash/merge";

export default function () {
    console.log(merge(foo, {
        main: "main"
    }));
}