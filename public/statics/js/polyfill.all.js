"use strict";

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

/*  */ !(function(e, n) {
  "object" ==
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) &&
  "undefined" != typeof module
    ? n()
    : "function" == typeof define && define.amd
      ? define(n)
      : n();
})(0, function() {
  "use strict";

  function e(e) {
    var n = this.constructor;
    return this.then(
      function(t) {
        return n.resolve(e()).then(function() {
          return t;
        });
      },
      function(t) {
        return n.resolve(e()).then(function() {
          return n.reject(t);
        });
      }
    );
  }

  function n() {}

  function t(e) {
    if (!(this instanceof t))
      throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof e) throw new TypeError("not a function");
    (this._state = 0),
      (this._handled = !1),
      (this._value = undefined),
      (this._deferreds = []),
      u(e, this);
  }

  function o(e, n) {
    for (; 3 === e._state; ) {
      e = e._value;
    }
    0 !== e._state
      ? ((e._handled = !0),
        t._immediateFn(function() {
          var t = 1 === e._state ? n.onFulfilled : n.onRejected;
          if (null !== t) {
            var o;
            try {
              o = t(e._value);
            } catch (f) {
              return void i(n.promise, f);
            }
            r(n.promise, o);
          } else (1 === e._state ? r : i)(n.promise, e._value);
        }))
      : e._deferreds.push(n);
  }

  function r(e, n) {
    try {
      if (n === e)
        throw new TypeError("A promise cannot be resolved with itself.");
      if (
        n &&
        ("object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ||
          "function" == typeof n)
      ) {
        var o = n.then;
        if (n instanceof t) return (e._state = 3), (e._value = n), void f(e);
        if ("function" == typeof o)
          return void u(
            (function(e, n) {
              return function() {
                e.apply(n, arguments);
              };
            })(o, n),
            e
          );
      }
      (e._state = 1), (e._value = n), f(e);
    } catch (r) {
      i(e, r);
    }
  }

  function i(e, n) {
    (e._state = 2), (e._value = n), f(e);
  }

  function f(e) {
    2 === e._state &&
      0 === e._deferreds.length &&
      t._immediateFn(function() {
        e._handled || t._unhandledRejectionFn(e._value);
      });
    for (var n = 0, r = e._deferreds.length; r > n; n++) {
      o(e, e._deferreds[n]);
    }
    e._deferreds = null;
  }

  function u(e, n) {
    var t = !1;
    try {
      e(
        function(e) {
          t || ((t = !0), r(n, e));
        },
        function(e) {
          t || ((t = !0), i(n, e));
        }
      );
    } catch (o) {
      if (t) return;
      (t = !0), i(n, o);
    }
  }
  var c = setTimeout;
  (t.prototype["catch"] = function(e) {
    return this.then(null, e);
  }),
    (t.prototype.then = function(e, t) {
      var r = new this.constructor(n);
      return (
        o(
          this,
          new function(e, n, t) {
            (this.onFulfilled = "function" == typeof e ? e : null),
              (this.onRejected = "function" == typeof n ? n : null),
              (this.promise = t);
          }(e, t, r)
        ),
        r
      );
    }),
    (t.prototype["finally"] = e),
    (t.all = function(e) {
      return new t(function(n, t) {
        function o(e, f) {
          try {
            if (
              f &&
              ("object" ==
                (typeof f === "undefined" ? "undefined" : _typeof(f)) ||
                "function" == typeof f)
            ) {
              var u = f.then;
              if ("function" == typeof u)
                return void u.call(
                  f,
                  function(n) {
                    o(e, n);
                  },
                  t
                );
            }
            (r[e] = f), 0 == --i && n(r);
          } catch (c) {
            t(c);
          }
        }
        if (!e || "undefined" == typeof e.length)
          throw new TypeError("Promise.all accepts an array");
        var r = Array.prototype.slice.call(e);
        if (0 === r.length) return n([]);
        for (var i = r.length, f = 0; r.length > f; f++) {
          o(f, r[f]);
        }
      });
    }),
    (t.resolve = function(e) {
      return e &&
        "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) &&
        e.constructor === t
        ? e
        : new t(function(n) {
            n(e);
          });
    }),
    (t.reject = function(e) {
      return new t(function(n, t) {
        t(e);
      });
    }),
    (t.race = function(e) {
      return new t(function(n, t) {
        for (var o = 0, r = e.length; r > o; o++) {
          e[o].then(n, t);
        }
      });
    }),
    (t._immediateFn =
      ("function" == typeof setImmediate &&
        function(e) {
          setImmediate(e);
        }) ||
      function(e) {
        c(e, 0);
      }),
    (t._unhandledRejectionFn = function(e) {
      void 0 !== console &&
        console &&
        console.warn("Possible Unhandled Promise Rejection:", e);
    });
  var l = (function() {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if ("undefined" != typeof global) return global;
    throw Error("unable to locate global object");
  })();
  "Promise" in l
    ? l.Promise.prototype["finally"] || (l.Promise.prototype["finally"] = e)
    : (l.Promise = t);
});
/*  */
(function() {
  window.TypeError = TypeError || Error;

  window.urlArgs = function() {
    var args = {}; // Start with an empty object
    var query = location.search.substring(1); // Get query string, minus '?'
    var pairs = query.split("&"); // Split at ampersands
    for (var i = 0; i < pairs.length; i++) {
      // For each fragment
      var pos = pairs[i].indexOf("="); // Look for "name=value"
      if (pos == -1) continue; // If not found, skip it
      var name = pairs[i].substring(0, pos); // Extract the name
      var value = pairs[i].substring(pos + 1); // Extract the value
      value = decodeURIComponent(value); // Decode the value
      args[name] = value; // Store as a property
    }
    return args; // Return the parsed arguments
  };
})();
/*  */

/**
 *
 *
 * @author Jerry Bendy <jerry@icewingcc.com>
 * @licence MIT
 *
 */

(function(self) {
  "use strict";

  var nativeURLSearchParams = self.URLSearchParams
      ? self.URLSearchParams
      : null,
    isSupportObjectConstructor =
      nativeURLSearchParams &&
      new nativeURLSearchParams({
        a: 1
      }).toString() === "a=1",
    // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
    decodesPlusesCorrectly =
      nativeURLSearchParams &&
      new nativeURLSearchParams("s=%2B").get("s") === "+",
    __URLSearchParams__ = "__URLSearchParams__",
    // Fix bug in Edge which cannot encode ' &' correctly
    encodesAmpersandsCorrectly = nativeURLSearchParams
      ? (function() {
          var ampersandTest = new nativeURLSearchParams();
          ampersandTest.append("s", " &");
          return ampersandTest.toString() === "s=+%26";
        })()
      : true,
    prototype = URLSearchParamsPolyfill.prototype,
    iterable = !!(self.Symbol && self.Symbol.iterator);

  if (
    nativeURLSearchParams &&
    isSupportObjectConstructor &&
    decodesPlusesCorrectly &&
    encodesAmpersandsCorrectly
  ) {
    return;
  }

  /**
   * Make a URLSearchParams instance
   *
   * @param {object|string|URLSearchParams} search
   * @constructor
   */
  function URLSearchParamsPolyfill(search) {
    search = search || "";

    // support construct object with another URLSearchParams instance
    if (
      search instanceof URLSearchParams ||
      search instanceof URLSearchParamsPolyfill
    ) {
      search = search.toString();
    }
    this[__URLSearchParams__] = parseToDict(search);
  }

  /**
   * Appends a specified key/value pair as a new search parameter.
   *
   * @param {string} name
   * @param {string} value
   */
  prototype.append = function(name, value) {
    appendTo(this[__URLSearchParams__], name, value);
  };

  /**
   * Deletes the given search parameter, and its associated value,
   * from the list of all search parameters.
   *
   * @param {string} name
   */
  prototype.delete = function(name) {
    delete this[__URLSearchParams__][name];
  };

  /**
   * Returns the first value associated to the given search parameter.
   *
   * @param {string} name
   * @returns {string|null}
   */
  prototype.get = function(name) {
    var dict = this[__URLSearchParams__];
    return name in dict ? dict[name][0] : null;
  };

  /**
   * Returns all the values association with a given search parameter.
   *
   * @param {string} name
   * @returns {Array}
   */
  prototype.getAll = function(name) {
    var dict = this[__URLSearchParams__];
    return name in dict ? dict[name].slice(0) : [];
  };

  /**
   * Returns a Boolean indicating if such a search parameter exists.
   *
   * @param {string} name
   * @returns {boolean}
   */
  prototype.has = function(name) {
    return name in this[__URLSearchParams__];
  };

  /**
   * Sets the value associated to a given search parameter to
   * the given value. If there were several values, delete the
   * others.
   *
   * @param {string} name
   * @param {string} value
   */
  prototype.set = function set(name, value) {
    this[__URLSearchParams__][name] = ["" + value];
  };

  /**
   * Returns a string containg a query string suitable for use in a URL.
   *
   * @returns {string}
   */
  prototype.toString = function() {
    var dict = this[__URLSearchParams__],
      query = [],
      i,
      key,
      name,
      value;
    for (key in dict) {
      name = encode(key);
      for (i = 0, value = dict[key]; i < value.length; i++) {
        query.push(name + "=" + encode(value[i]));
      }
    }
    return query.join("&");
  };

  // There is a bug in Safari 10.1 and `Proxy`ing it is not enough.
  var forSureUsePolyfill = !decodesPlusesCorrectly;
  var useProxy =
    !forSureUsePolyfill &&
    nativeURLSearchParams &&
    !isSupportObjectConstructor &&
    self.Proxy;
  /*
     * Apply polifill to global object and append other prototype into it
     */
  self.URLSearchParams = useProxy
    ? // Safari 10.0 doesn't support Proxy, so it won't extend URLSearchParams on safari 10.0
      new Proxy(nativeURLSearchParams, {
        construct: function construct(target, args) {
          return new target(new URLSearchParamsPolyfill(args[0]).toString());
        }
      })
    : URLSearchParamsPolyfill;

  var USPProto = self.URLSearchParams.prototype;

  USPProto.polyfill = true;

  /**
   *
   * @param {function} callback
   * @param {object} thisArg
   */
  USPProto.forEach =
    USPProto.forEach ||
    function(callback, thisArg) {
      var dict = parseToDict(this.toString());
      Object.getOwnPropertyNames(dict).forEach(function(name) {
        dict[name].forEach(function(value) {
          callback.call(thisArg, value, name, this);
        }, this);
      }, this);
    };

  /**
   * Sort all name-value pairs
   */
  USPProto.sort =
    USPProto.sort ||
    function() {
      var dict = parseToDict(this.toString()),
        keys = [],
        k,
        i,
        j;
      for (k in dict) {
        keys.push(k);
      }
      keys.sort();

      for (i = 0; i < keys.length; i++) {
        this.delete(keys[i]);
      }
      for (i = 0; i < keys.length; i++) {
        var key = keys[i],
          values = dict[key];
        for (j = 0; j < values.length; j++) {
          this.append(key, values[j]);
        }
      }
    };

  /**
   * Returns an iterator allowing to go through all keys of
   * the key/value pairs contained in this object.
   *
   * @returns {function}
   */
  USPProto.keys =
    USPProto.keys ||
    function() {
      var items = [];
      this.forEach(function(item, name) {
        items.push(name);
      });
      return makeIterator(items);
    };

  /**
   * Returns an iterator allowing to go through all values of
   * the key/value pairs contained in this object.
   *
   * @returns {function}
   */
  USPProto.values =
    USPProto.values ||
    function() {
      var items = [];
      this.forEach(function(item) {
        items.push(item);
      });
      return makeIterator(items);
    };

  /**
   * Returns an iterator allowing to go through all key/value
   * pairs contained in this object.
   *
   * @returns {function}
   */
  USPProto.entries =
    USPProto.entries ||
    function() {
      var items = [];
      this.forEach(function(item, name) {
        items.push([name, item]);
      });
      return makeIterator(items);
    };

  if (iterable) {
    USPProto[self.Symbol.iterator] =
      USPProto[self.Symbol.iterator] || USPProto.entries;
  }

  function encode(str) {
    var replace = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\x00"
    };
    return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function(
      match
    ) {
      return replace[match];
    });
  }

  function decode(str) {
    return decodeURIComponent(str.replace(/\+/g, " "));
  }

  function makeIterator(arr) {
    var iterator = {
      next: function next() {
        var value = arr.shift();
        return {
          done: value === undefined,
          value: value
        };
      }
    };

    if (iterable) {
      iterator[self.Symbol.iterator] = function() {
        return iterator;
      };
    }

    return iterator;
  }

  function parseToDict(search) {
    var dict = {};

    if (
      (typeof search === "undefined" ? "undefined" : _typeof(search)) ===
      "object"
    ) {
      for (var key in search) {
        if (search.hasOwnProperty(key)) {
          appendTo(dict, key, search[key]);
        }
      }
    } else {
      // remove first '?'
      if (search.indexOf("?") === 0) {
        search = search.slice(1);
      }

      var pairs = search.split("&");
      for (var j = 0; j < pairs.length; j++) {
        var value = pairs[j],
          index = value.indexOf("=");

        if (-1 < index) {
          appendTo(
            dict,
            decode(value.slice(0, index)),
            decode(value.slice(index + 1))
          );
        } else {
          if (value) {
            appendTo(dict, decode(value), "");
          }
        }
      }
    }

    return dict;
  }

  function appendTo(dict, name, value) {
    var val =
      typeof value === "string"
        ? value
        : value !== null &&
          value !== undefined &&
          typeof value.toString === "function"
          ? value.toString()
          : JSON.stringify(value);

    if (name in dict) {
      dict[name].push(val);
    } else {
      dict[name] = [val];
    }
  }
})(
  typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
      ? window
      : undefined
);
