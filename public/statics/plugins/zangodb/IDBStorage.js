function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== 'undefined' &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

!(function(t, e) {
  'object' ==
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) &&
  'object' == (typeof module === 'undefined' ? 'undefined' : _typeof(module))
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
      ? define([], e)
      : 'object' ==
        (typeof exports === 'undefined' ? 'undefined' : _typeof(exports))
        ? (exports.IDBStorage = e())
        : (t.IDBStorage = e());
})(window, function() {
  return (function(t) {
    var e = {};

    function n(r) {
      if (e[r]) return e[r].exports;
      var o = (e[r] = {
        i: r,
        l: !1,
        exports: {}
      });
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }

    return (
      (n.m = t),
      (n.c = e),
      (n.d = function(t, e, r) {
        n.o(t, e) ||
          Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
          });
      }),
      (n.r = function(t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, {
            value: 'Module'
          }),
          Object.defineProperty(t, '__esModule', {
            value: !0
          });
      }),
      (n.t = function(t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && 'object' == _typeof(t) && t && t.__esModule) return t;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', {
            enumerable: !0,
            value: t
          }),
          2 & e && 'string' != typeof t)
        )
          for (var o in t) {
            n.d(
              r,
              o,
              function(e) {
                return t[e];
              }.bind(null, o)
            );
          }
        return r;
      }),
      (n.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default;
              }
            : function() {
                return t;
              };
        return n.d(e, 'a', e), e;
      }),
      (n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ''),
      n((n.s = 2))
    );
  })([
    function(t, e, n) {
      'use strict';

      e.a = {
        isArray: function isArray(t) {
          return '[object Array]' === Object.prototype.toString.call(t);
        },
        isObject: function isObject(t) {
          return '[object Object]' === Object.prototype.toString.call(t);
        },
        merge: function merge(t, e) {
          for (var n in e) {
            try {
              e[n].constructor == Object
                ? (t[n] = Utils.merge(t[n], e[n]))
                : (t[n] = e[n]);
            } catch (r) {
              t[n] = e[n];
            }
          }

          return t;
        },
        clone: function clone(t) {
          return JSON.parse(JSON.stringify(t));
        },
        resolve: function resolve(t, e) {
          return t.split('.').reduce(function(t, e) {
            return t ? t[e] : void 0;
          }, e || self);
        },
        uuid: function uuid() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function(t) {
              var e = (16 * Math.random()) | 0;
              return ('x' == t ? e : (3 & e) | 8).toString(16);
            }
          );
        }
      };
    },
    function(t, e, n) {
      'use strict';

      var r = n(0);
      var o = {
        format: function format(t) {
          return t
            ? 'string' == typeof t || 'number' == typeof t
              ? {
                  _id: t
                }
              : t
            : {};
        },
        compare: function compare(t, e) {
          for (var n, i, s = Object.keys(e), c = 0; c < s.length; c++) {
            n = {
              name: s[c],
              value: e[s[c]]
            };
            var u = r.a.resolve(n.name, t);
            if (void 0 === u && 'function' != typeof o.Operators[n.name])
              return !1;
            if ('function' == typeof o.Operators[n.name])
              return o.Operators[n.name](t, n.value);

            if ('object' == _typeof(n.value)) {
              if (
                ((i = Object.keys(n.value)[0]),
                'function' == typeof o.Operators[i])
              )
                return o.Operators[i](u, n.value[i]);
              throw new Error('Unrecognised operator \'' + i + '\'');
            }

            return o.Operators.$eq(u, n.value);
          }

          return !0;
        },
        Operators: {
          $eq: function $eq(t, e) {
            return t == e;
          },
          $ne: function $ne(t, e) {
            return t != e;
          },
          $or: function $or(t, e) {
            if (!r.a.isArray(e))
              throw new Error('$or Operator expects an Array');
            var n;

            if (r.a.isObject(t)) {
              for (n = 0; n < e.length; n++) {
                if (o.compare(t, e[n])) return !0;
              }
            } else
              for (n = e.length; n >= 0; n--) {
                if (this.$eq(t, e[n])) return !0;
              }

            return !1;
          },
          $gt: function $gt(t, e) {
            return t > e;
          },
          $gte: function $gte(t, e) {
            return t >= e;
          },
          $lt: function $lt(t, e) {
            return t < e;
          },
          $lte: function $lte(t, e) {
            return t <= e;
          },
          $contains: function $contains(t, e) {
            return t.indexOf(e) > -1;
          },
          $in: function $in(t, e) {
            if (!r.a.isArray(e))
              throw new Error('$in Operator expects an Array');
            return e.indexOf(t) > -1;
          },
          $nin: function $nin(t, e) {
            if (!r.a.isArray(e))
              throw new Error('$nin Operator expects an Array');
            return -1 === e.indexOf(t);
          },
          $type: function $type(t, e) {
            return 'null' === e
              ? null === t
              : 'array' === e
                ? r.a.isArray(t)
                : _typeof(t) === e;
          }
        }
      };
      e.a = o;
    },
    function(t, e, n) {
      'use strict';

      n.r(e),
        function(t) {
          var r = n(0),
            o = n(1),
            i = window.idb.get,
            s = window.idb.set,
            c = window.idb.Store;
          /**
           * Pocket.js v2.2.0
           *
           * @file A blazing fast lightweight storage library
           * @author Vincent Racine vincentracine@hotmail.co.uk
           * @license MIT
           */

          var u = function u(t) {
            var e = (t && t.dbname) || 'GK',
              n = (t && t.tableName) || 'dict',
              a = new c(e, n);

            function f(t) {
              if (
                ((this.version = '2.2.0'),
                (this.collections = {}),
                (this.options = r.a.merge(
                  {
                    dbname: e,
                    driver: 'idb'
                  },
                  t || {}
                )),
                !this.options.driver)
              )
                throw new Error('Storage driver was not found');
            }

            function l(t, e) {
              if (!t) throw new Error('Collection requires a name');
              return (
                (this.name = t),
                (this.documents = []),
                (this.options = e || {}),
                (this.length = 0),
                this
              );
            }

            function d(t) {
              if (!r.a.isObject(t))
                throw new Error('Invalid argument. Expected an Object.');
              return (
                !1 === t.hasOwnProperty('_id') && (t._id = r.a.uuid()),
                (this.object = t),
                this.object
              );
            }

            return (
              (u.Drivers = {
                DEFAULT: window.localStorage,
                SESSION_STORAGE: window.sessionStorage
              }),
              (f.prototype = {
                collection: function collection(t, e) {
                  if (!t)
                    throw new Error(
                      'Invalid argument. Expected a collection name.'
                    );
                  var n = this.collections[t];
                  return (
                    n ||
                      ((n = new l(t, e || this.options)),
                      (this.collections[t] = n)),
                    n
                  );
                },
                removeCollection: function removeCollection(t) {
                  if (!t) return this;
                  var e = this.collections[t];
                  return e && (e.destroy(), delete this.collections[t]), this;
                },
                commit: function commit(t, e) {
                  if (!t)
                    throw new Error(
                      'Invalid arguments. Expected collection name'
                    );
                  var n = this.collections[t];
                  return n && n.commit(e), this;
                },
                restore: function restore(t) {
                  var e = this.options.driver;
                  if (
                    ('function' == typeof t && (t = {}),
                    this.options.driver === u.Drivers.DEFAULT ||
                      this.options.driver === u.Drivers.SESSION_STORAGE)
                  )
                    for (var n = this.options.driver, r = n.length; r--; ) {
                      var o = n.key(r);

                      if (0 == o.indexOf(this.options.dbname)) {
                        var i = n.getItem(o);

                        if ('string' == typeof i) {
                          var s,
                            c = JSON.parse(i);
                          ((s = new l(c.name, c.options)).options.driver = e),
                            (s.documents = c.documents),
                            (s.length = c.documents.length),
                            (this.collections[s.name] = s);
                        }
                      }
                    }
                  return this;
                },
                destroy: function destroy() {
                  for (var t in this.collections) {
                    this.collections.hasOwnProperty(t) &&
                      _instanceof(t, l) &&
                      (t.destroy(), delete this.collections[t]);
                  }

                  this.collections = [];
                }
              }),
              (l.prototype = {
                insert: function insert(t, e) {
                  var n;
                  return (
                    r.a.isArray(t)
                      ? (n = t.map(function(t) {
                          return (t = new d(t)), this.documents.push(t), t;
                        }, this))
                      : ((n = new d(t)), this.documents.push(n)),
                    (this.length = this.documents.length),
                    this.commit(e)
                  );
                },
                find: function find(t) {
                  var e,
                    n,
                    r = this;
                  return (0 === r.documents.length
                    ? i(r.options.dbname + '.' + r.name, a)
                    : Promise.resolve(r)
                  ).then(function(i) {
                    for (
                      r.documents = i.documents,
                        r.length = i.length,
                        n = r.documents.slice(0),
                        t = o.a.format(t),
                        e = Object.keys(t);
                      e.length > 0 && 0 !== n.length;

                    ) {
                      (n = n.filter(function(n) {
                        var r = {};
                        return (r[e[0]] = t[e[0]]), o.a.compare(n, r);
                      })),
                        e.splice(0, 1);
                    }

                    return Promise.resolve(n);
                  });
                },
                findOne: function findOne(t) {
                  return this.find(t)[0] || null;
                },
                update: function update(t, e, n) {
                  return (
                    this.find(o.a.format(t)).forEach(function(t) {
                      var n = this.documents.indexOf(t);
                      -1 !== n &&
                        (this.documents[n] = new d(
                          r.a.merge(this.documents[n], e)
                        ));
                    }, this),
                    this.commit(n)
                  );
                },
                remove: function remove(t, e) {
                  return (
                    this.find(o.a.format(t)).forEach(function(t) {
                      var e = this.documents.indexOf(t);
                      -1 !== e && (this.documents.splice(e, 1), this.length--);
                    }, this),
                    this.commit(e)
                  );
                },
                commit: function commit() {
                  var t = JSON.parse(JSON.stringify(this));
                  return 'idb' === this.options.driver
                    ? (console.log('commit', t.name, t),
                      s(this.options.dbname.concat('.' + t.name), t, a))
                    : Promise.reject('commit fail');
                },
                size: function size() {
                  return this.documents.length;
                },
                destroy: function destroy() {
                  var t = this;
                  return t.remove().then(function() {
                    return (
                      (t.documents = t.options = t.name = null),
                      Promise.resolve()
                    );
                  });
                }
              }),
              new f(t)
            );
          };

          'undefined' != typeof exports &&
            (t.exports && (exports = t.exports = u), (exports.Pocket = u)),
            (e.default = u);
        }.call(this, n(3)(t));
    },
    function(t, e) {
      t.exports = function(t) {
        if (!t.webpackPolyfill) {
          var e = Object.create(t);
          e.children || (e.children = []),
            Object.defineProperty(e, 'loaded', {
              enumerable: !0,
              get: function get() {
                return e.l;
              }
            }),
            Object.defineProperty(e, 'id', {
              enumerable: !0,
              get: function get() {
                return e.i;
              }
            }),
            Object.defineProperty(e, 'exports', {
              enumerable: !0
            }),
            (e.webpackPolyfill = 1);
        }

        return e;
      };
    }
  ]);
});
