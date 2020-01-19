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
          return window._.$xhrFetchWithCache(url, {
              credentials: 'same-origin'
            })
            .then(function (source) {
              return loader.transform.call(this, url, source);
            })
        }
      })
      .then(function (source) {
        /* TODO:cache */
        return window._.$$STORE_T
          .setCache(url, source)
          .then(function () {
            (0, eval)(source + '\n//# sourceURL=' + url);
            console.timeEnd(window._.$getIDFromURL(url))
            return Promise.resolve();
          })
          .catch(function (error) {
            console.error(error);
          });
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