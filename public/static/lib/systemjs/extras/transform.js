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
        if (url.slice(-4) === ".vue") {
          source = (function (code) {
            function getSource(source, type) {
              var regex = new RegExp("<" + type + "[^>]*>");
              var openingTag = source.match(regex);
              if (!openingTag) return "";
              else openingTag = openingTag[0];
              return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf("</" + type + ">"));
            }

            function splitCode() {
              var template = getSource(code, "template");
              var script = getSource(code, "script").replace(
                /TEMPLATE_PLACEHOLDER/,
                "template:`" + template + "`"
              );
              return script;
            }
            return splitCode();
          })(source);
        }

        return loader.transform.call(this, url, source);
      })
      .then(function (source) {
        console.log(source,null,2);
        (0, eval)(source + "\n//# sourceURL=" + url);
        return loader.getRegister();
      });
  }; // Hookable transform function!

  systemJSPrototype.transform = function (_id, source) {
    return source;
  };
})(typeof self !== "undefined" ? self : global);