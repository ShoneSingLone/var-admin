/*
 * Support for a "transform" loader interface
 */
(function (global) {
  const systemJSPrototype = global.System.constructor.prototype;
  const instantiate = systemJSPrototype.instantiate;
  systemJSPrototype.instantiate = async (url, parent) => {
    if (url.slice(-5) === '.wasm') {
      return instantiate.call(systemJSPrototype, url, parent);
    }
    const loader = systemJSPrototype;
    console.time(window._.$getIDFromURL(url));
    let source = await window._.$$STORE_T.getCache(url);
    if (!source) {
      source = await window._.$xhrFetchWithCache(url, {
        credentials: 'same-origin'
      });
      source = await loader.transform.call(systemJSPrototype, url, source);
      await window._.$$STORE_T.setCache(url, source)
    };
    (0, eval)(source + '\n//# sourceURL=' + url);
    console.timeEnd(window._.$getIDFromURL(url));
    return loader.getRegister();
  };

  // Hookable transform function!
  systemJSPrototype.transform = function (_id, source) {
    return source;
  };
})(typeof self !== 'undefined' ? self : global);