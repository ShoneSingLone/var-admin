import isArray from "lodash/isArray";
import each from "lodash/each";
import concat from "lodash/concat";
import last from "lodash/last";

export function $log() {
    if (/localhost/g.test(location.href)) {
        let argsArray = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        try {
            throw new Error("开发模式");
        } catch (error) {
            let stack = error.stack;
            let optionStringArray = stack.split(" at ");
            let stackInfo = [];
            if (isArray(optionStringArray)) {
                each(optionStringArray, function (optionString, index) {
                    if (/[^console.window.console.dev]/g.test(optionString)) {
                        stackInfo = [String(optionStringArray[index]).match(/(.*)/)];
                    }
                });
            }
            let target = concat("%c INFO ", "background:green;color:white", argsArray, stackInfo);
            if (stackInfo.length === 0) console.log.apply(console, target);
        }
    }
}
export function $error() {
    var argsArray = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
    try {
        throw new Error();
    } catch (error) {
        var stack = error.stack;
        var optionString = stack.split(" at ");
        if (isArray(optionString)) {
            argsArray.push(last(optionString));
        }
        /* //todo 埋点 */
        if (/localhost/g.test(location.href)) {
            /* 红色警告错误 */
            argsArray.unshift("background:#f00;color:green");
            argsArray.unshift("%c Error ");
            console.log.apply(console, argsArray);
        }
    }
}