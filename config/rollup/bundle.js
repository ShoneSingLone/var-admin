(function (lodash) {
    "use strict";

    // src/foo.js
    var foo = "hello world!";

    // src/main.js
    function main () {
        console.log(lodash.merge(foo, {
            main: "main"
        }));
    }

    return main;

}(lodash));
