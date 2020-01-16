import _ from "lodash";
import {
    version
} from "../../../package.json";

export default function split() {
    import('./foo.js').then(({
        default: foo
    }) => console.log(version, foo, _.merge({
        a: "a"
    }, {
        b: "b"
    })));
}