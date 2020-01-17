/*
 * Support for a "transform" loader interface
 */
(function (global) {
  var systemJSPrototype = global.System.constructor.prototype;
  var instantiate = systemJSPrototype.instantiate;

  systemJSPrototype.instantiate = function (url, parent) {
    if (url.slice(-5) === ".wasm") {
      return instantiate.call(this, url, parent);
    }
    var loader = this;
    return window._.$$STORE
      .getCache(url)
      .then(function (res) {
        if (res) {
          return Promise.resolve(res);
        } else {
          return fetch(url, {
              credentials: "same-origin"
            })
            .then(function (res) {
              if (!res.ok) {
                throw Error("Fetch error: " + res.status + " " + res.statusText + (parent ? " loading from " + parent : ""));
              }
              return res.text();
            })
            .then(function (source) {
              if (url.slice(-4) === ".vue") {
                source = window._.$VueLoader(url, source);
              }
              return loader.transform.call(this, url, source);
            });
        };
      })
      .then(function (source) {
        source = source + "\n//# sourceURL=" + url;
        return window._.$$STORE
          .setCache(url, source)
          .then(function () {
            (0, eval)(source);
            return loader.getRegister();
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // Hookable transform function!

  systemJSPrototype.transform = function (_id, source) {
    return source;
  };
})(typeof self !== "undefined" ? self : global);