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
    return fetch(url, {
        credentials: "same-origin"
      })
      .then(function (res) {
        if (!res.ok)
          throw Error("Fetch error: " + res.status + " " + res.statusText + (parent ? " loading from " + parent : ""));
        return res.text();
      })
      .then(function (source) {
        /* TODO:cache */
        if (url.slice(-4) === ".vue") {
          source = window._.$VueLoader(url, source);
        }
        return loader.transform.call(this, url, source);
      })
      .then(function (source) {
        (0, eval)(source + "\n//# sourceURL=" + url);
        return loader.getRegister();
      });
  }; // Hookable transform function!

  systemJSPrototype.transform = function (_id, source) {
    return source;
  };
})(typeof self !== "undefined" ? self : global);