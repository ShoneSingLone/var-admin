(function (lodash) {
    "use strict";

    var foo = "foo.js";

    // src/main.js

    function main() {
        console.log(lodash.merge(foo, {
            main: "main"
        }));
    }

    return main;

}(lodash));