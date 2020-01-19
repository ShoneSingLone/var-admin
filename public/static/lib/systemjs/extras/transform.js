/*
 * Support for a "transform" loader interface
 */
(function (global) {
  const systemJSPrototype = global.System.constructor.prototype;

  const instantiate = systemJSPrototype.instantiate;
  systemJSPrototype.instantiate = function (url, parent) {
    if (url.slice(-5) === '.wasm')
      return instantiate.call(this, url, parent);
    const loader = this;
    return window._.$xhrFetchWithCache(url, {
        credentials: 'same-origin'
      })
      .then(function (source) {
        console.time(window._.$getIDFromURL(url))
        return loader.transform.call(this, url, source);
      })
      .then(function (source) {
        (0, eval)(source + '\n//# sourceURL=' + url);
        console.timeEnd(window._.$getIDFromURL(url))
        return loader.getRegister();
      });
  };

  // Hookable transform function!
  systemJSPrototype.transform = function (_id, source) {
    return source;
  };
})(typeof self !== 'undefined' ? self : global);