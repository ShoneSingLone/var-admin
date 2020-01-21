import camelCase from "lodash/camelCase";
import merge from "lodash/merge";
import isArray from "lodash/isArray";
import isFunction from "lodash/isFunction";
import isObject from "lodash/isObject";
import last from "lodash/last";
import concat from "lodash/concat";
import forIn from "lodash/forIn";
import map from "lodash/map";

/* tree-shaking */
export default {
    camelCase,
    merge,
    isArray,
    isFunction,
    isObject,
    last,
    concat,
    forIn,
    map,
    $$regex: {
        email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
    }
};