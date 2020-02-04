/*
 * Support for a "transform" loader interface
 */
(function (global) {
  const systemJSPrototype = global.System.constructor.prototype;
  const instantiate = systemJSPrototype.instantiate;
  systemJSPrototype.instantiate = function (url, parent) {
    if (url.slice(-5) === '.wasm') {
      return instantiate.call(this, url, parent);
    }
    const loader = this;
    console.time(window._.$getIDFromURL(url));
    return window
      ._.$$STORE_T
      .getCache(url)
      .then(function (sourceFormCache) {
        if (sourceFormCache) {
          return Promise.resolve(sourceFormCache);
        } else {
          /* fetch */
          return window._.$xhrFetchWithCache(url, {
              credentials: 'same-origin'
            })
            /* translate */
            .then(function (source) {
              return loader.transform.call(this, url, source);
            })
            /* cache */
            .then(function (source) {
              return window._.$$STORE_T
                .setCache(url, source)
                .then(function () {
                  return Promise.resolve(source);
                })
            });
        }
      })
      .then(function (source) {
        (0, eval)(source + '\n//# sourceURL=' + url);
        console.timeEnd(window._.$getIDFromURL(url))
        return Promise.resolve();
      })
      .then(function () {
        return loader.getRegister();
      });
  };
  // Hookable transform function!
  systemJSPrototype.transform = function (_id, source) {
    return source;
  };
})(typeof self !== 'undefined' ? self : global);