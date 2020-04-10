function isError(err) {
    return Object.prototype.toString.call(err).indexOf("Error") > -1;
}

const trailingSlashRE = /\/?$/;

function isObjectEqual(a = {}, b = {}) {
    // handle null value #1566
    if (!a || !b) return a === b;
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    return aKeys.every(key => {
        const aVal = a[key];
        const bVal = b[key];
        // check nested equality
        if (typeof aVal === "object" && typeof bVal === "object") {
            return isObjectEqual(aVal, bVal);
        }
        return String(aVal) === String(bVal);
    });
}


function isSameRoute(a, b) {
    if (b === START) {
        return a === b;
    } else if (!b) {
        return false;
    } else if (a.path && b.path) {
        return (
            a.path.replace(trailingSlashRE, "") === b.path.replace(trailingSlashRE, "") &&
            a.hash === b.hash &&
            isObjectEqual(a.query, b.query)
        );
    } else if (a.name && b.name) {
        return (
            a.name === b.name &&
            a.hash === b.hash &&
            isObjectEqual(a.query, b.query) &&
            isObjectEqual(a.params, b.params)
        );
    } else {
        return false;
    }
}


const inBrowser = typeof window !== "undefined";

function createHref(base, fullPath, mode) {
    var path = mode === "hash" ? "#" + fullPath : fullPath;
    return base ? cleanPath(base + "/" + path) : path;
}

/* 安全获取hash */
function getHash() {
    // We can't use window.location.hash here because it's not
    // consistent across browsers - Firefox will pre-decode it!
    let href = window.location.href;
    const index = href.indexOf("#");
    // empty path
    if (index < 0) return "";

    href = href.slice(index + 1);
    // decode the hash but not the search or hash
    // as search(query) is already decoded
    // https://github.com/vuejs/vue-router/issues/2708
    const searchIndex = href.indexOf("?");
    if (searchIndex < 0) {
        const hashIndex = href.indexOf("#");
        if (hashIndex > -1) {
            href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
        } else href = decodeURI(href);
    } else {
        href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
    }
    return href;
}


function getLocation(base) {
    let path = decodeURI(window.location.pathname);
    if (base && path.indexOf(base) === 0) {
        path = path.slice(base.length);
    }
    return (path || "/") + window.location.search + window.location.hash;
}


/* 确保斜杠 */
function ensureSlash() {
    const path = getHash();
    if (path.charAt(0) === "/") {
        return true;
    }
    replaceHash("/" + path);
    return false;
}

function getUrl(path) {
    const href = window.location.href;
    const i = href.indexOf("#");
    const base = i >= 0 ? href.slice(0, i) : href;
    return `${base}#${path}`;
}


function pushHash(path) {
    /* TODO:stack处理 */
    window.location.hash = path;
}

function replaceHash(path) {
    /* TODO:stack处理 */
    window.location.replace(getUrl(path));
}

/* 基本路径标准化  */
function normalizeBase(base) {
    if (!base) {
        if (inBrowser) {
            // respect <base> tag
            const baseEl = document.querySelector("base");
            base = (baseEl && baseEl.getAttribute("href")) || "/";
            // strip full URL origin
            base = base.replace(/^https?:\/\/[^\/]+/, "");
        } else {
            base = "/";
        }
    }
    // make sure there's the starting slash
    if (base.charAt(0) !== "/") {
        base = "/" + base;
    }
    // remove trailing slash
    return base.replace(/\/$/, "");
}


class History {
    // implemented by sub-classes
    constructor(router, base) {
        this.router = router;
        this.base = normalizeBase(base);
        // start with a route object that stands for "nowhere"
        Object.defineProperty(this, "current", {
            get: () => this._current || START,
            set: (route) => {
                this._current = route;
                this.router.options.onChange && this.router.options.onChange(route);
            }
        });
        this.current = START;
        this.ready = false;
        this.readyCbs = [];
        this.readyErrorCbs = [];
        this.errorCbs = [];
    }

    /* hook */
    listen(afterRouteChange) {
        this.afterRouteChange = afterRouteChange;
    }

    onReady(cb, errorCb) {
        if (this.ready) {
            cb();
        } else {
            this.readyCbs.push(cb);
            if (errorCb) {
                this.readyErrorCbs.push(errorCb);
            }
        }
    }

    onError(errorCb) {
        this.errorCbs.push(errorCb);
    }

    /* 路由转换 */
    transitionTo(location /* hash部分构成的location */, onComplete, reject) {
        /* 获取将要跳转的route info */
        const route = this.router.match(location, this.current);
        console.log("transitionTo", route);
        /* 判断是否需要跳转 */
        this.confirmTransition(route,
            /* onComplete 需要 */
            () => {
                this.updateRoute(route);
                onComplete && onComplete(route);
                this.ensureURL();

                // fire ready cbs once
                if (!this.ready) {
                    this.ready = true;
                    this.readyCbs.forEach(cb => {
                        cb(route);
                    });
                }
            },
            /* onAbort  不需要*/
            err => (reject && reject(err))
        );
    }

    /*  */
    confirmTransition(route, onComplete, onAbort) {
        const current = this.current;
        const abort = err => {
            onAbort && onAbort(err);
        };
        /* 如果是相同的路径， */
        /* 万一动态添加了in the case the route map has been dynamically appended to */
        console.log("confirmTransition route", route);
        if (isSameRoute(route, current) && route.matched.length === current.matched.length) {
            this.ensureURL();
            return abort("SAME_PATH");
        } else if (isarray(route.matched) && route.matched.length === 0) {
            this.ensureURL();
            /* TODO:404 */
            return abort("NOT_FOUND");
        } else {
            return onComplete(route);
        }
    }

    updateRoute(route) {
        const prev = this.current;
        this.current = route;
        this.afterRouteChange && this.afterRouteChange(route);
        this.router.afterHooks.forEach(hook => {
            hook && hook(route, prev);
        });
    }
}


class HashHistory extends History {
    constructor(router, base) {
        super(router, base);
        ensureSlash();
    }

    // this is delayed until the app mounts
    // to avoid the hashchange listener being fired too early
    /* 并无大碍，不会与Vue组件强依赖 */
    setupListeners() {
        window.addEventListener("hashchange", () => {
            if (!ensureSlash()) {
                return;
            }
            this.transitionTo(getHash(), route => replaceHash(route.fullPath));
        });
    }

    push(location, resolve, reject) {
        this.transitionTo(location, route => {
                pushHash(route.fullPath);
                resolve && resolve(route);
            },
            reject);
    }

    replace(location, onComplete, onAbort) {
        this.transitionTo(
            location,
            route => {
                replaceHash(route.fullPath);
                onComplete && onComplete(route);
            },
            onAbort
        );
    }

    go(n) {
        window.history.go(n);
    }

    /* 确保地址栏路径一致 */
    ensureURL(push) {
        const current = this.current.fullPath;
        if (getHash() !== current) {
            push ? pushHash(current) : replaceHash(current);
        }
    }

    getCurrentLocation() {
        return getHash();
    }
}


function resolveRecordPath(path, record) {
    return resolvePath(path, record.parent ? record.parent.path : "/", true);
}


/*  */
function assert(condition, message) {
    if (!condition) {
        throw new Error(`[vue-router] ${message}`);
    }
}


function matchRoute(
    regex,
    path,
    params
) {
    const m = path.match(regex);

    if (!m) {
        return false;
    } else if (!params) {
        return true;
    }

    for (let i = 1, len = m.length; i < len; ++i) {
        const key = regex.keys[i - 1];
        const val = typeof m[i] === "string" ? decodeURIComponent(m[i]) : m[i];
        if (key) {
            // Fix #1994: using * with props: true generates a param named 0
            params[key.name || "pathMatch"] = val;
        }
    }

    return true;
}


const decode = decodeURIComponent;


function parseQuery(query) {
    const res = {};

    query = query.trim().replace(/^(\?|#|&)/, "");

    if (!query) {
        return res;
    }

    query.split("&").forEach(param => {
        const parts = param.replace(/\+/g, " ").split("=");
        const key = decode(parts.shift());
        const val = parts.length > 0 ?
            decode(parts.join("=")) :
            null;
        if (res[key] === undefined) {
            res[key] = val;
        } else if (isarray(res[key])) {
            res[key].push(val);
        } else {
            res[key] = [res[key], val];
        }
    });

    return res;
}


function resolveQuery(
    query,
    extraQuery = {},
    _parseQuery
) {
    const parse = _parseQuery || parseQuery;
    let parsedQuery;
    try {
        parsedQuery = parse(query || "");
    } catch (e) {
        warn(false, e.message);
        parsedQuery = {};
    }
    for (const key in extraQuery) {
        parsedQuery[key] = extraQuery[key];
    }
    return parsedQuery;
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
    var parts = [];

    for (var i = 0; i < path.length; i++) {
        parts.push(pathToRegexp(path[i], keys, options).source);
    }

    var regexp = new RegExp("(?:" + parts.join("|") + ")", flags(options));

    return attachKeys(regexp, keys);
}

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    "(\\\\.)",
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
].join("|"), "g");

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
    return group.replace(/([=!:$\/()])/g, "\\$1");
}

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
    var tokens = [];
    var key = 0;
    var index = 0;
    var path = "";
    var defaultDelimiter = options && options.delimiter || "/";
    var res;

    while ((res = PATH_REGEXP.exec(str)) != null) {
        var m = res[0];
        var escaped = res[1];
        var offset = res.index;
        path += str.slice(index, offset);
        index = offset + m.length;

        // Ignore already escaped sequences.
        if (escaped) {
            path += escaped[1];
            continue;
        }

        var next = str[index];
        var prefix = res[2];
        var name = res[3];
        var capture = res[4];
        var group = res[5];
        var modifier = res[6];
        var asterisk = res[7];

        // Push the current path onto the tokens.
        if (path) {
            tokens.push(path);
            path = "";
        }

        var partial = prefix != null && next != null && next !== prefix;
        var repeat = modifier === "+" || modifier === "*";
        var optional = modifier === "?" || modifier === "*";
        var delimiter = res[2] || defaultDelimiter;
        var pattern = capture || group;

        tokens.push({
            name: name || key++,
            prefix: prefix || "",
            delimiter: delimiter,
            optional: optional,
            repeat: repeat,
            partial: partial,
            asterisk: !!asterisk,
            pattern: pattern ? escapeGroup(pattern) : (asterisk ? ".*" : "[^" + escapeString(delimiter) + "]+?")
        });
    }

    // Match any characters still remaining.
    if (index < str.length) {
        path += str.substr(index);
    }

    // If the path exists, push it onto the end.
    if (path) {
        tokens.push(path);
    }

    return tokens;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
    return options.sensitive ? "" : "i";
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
}


/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
    if (!isarray(keys)) {
        options = /** @type {!Object} */ (keys || options);
        keys = [];
    }

    options = options || {};

    var strict = options.strict;
    var end = options.end !== false;
    var route = "";

    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (typeof token === "string") {
            route += escapeString(token);
        } else {
            var prefix = escapeString(token.prefix);
            var capture = "(?:" + token.pattern + ")";

            keys.push(token);

            if (token.repeat) {
                capture += "(?:" + prefix + capture + ")*";
            }

            if (token.optional) {
                if (!token.partial) {
                    capture = "(?:" + prefix + "(" + capture + "))?";
                } else {
                    capture = prefix + "(" + capture + ")?";
                }
            } else {
                capture = prefix + "(" + capture + ")";
            }

            route += capture;
        }
    }

    var delimiter = escapeString(options.delimiter || "/");
    var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
        route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + "(?:" + delimiter + "(?=$))?";
    }

    if (end) {
        route += "$";
    } else {
        // In non-ending mode, we need the capturing groups to match as much as
        // possible by using a positive lookahead to the end or next path segment.
        route += strict && endsWithDelimiter ? "" : "(?=" + delimiter + "|$)";
    }

    return attachKeys(new RegExp("^" + route, flags(options)), keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
    return tokensToRegExp(parse(path, options), keys, options);
}


/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
    re.keys = keys;
    return re;
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g);

    if (groups) {
        for (var i = 0; i < groups.length; i++) {
            keys.push({
                name: i,
                prefix: null,
                delimiter: null,
                optional: false,
                repeat: false,
                partial: false,
                asterisk: false,
                pattern: null
            });
        }
    }

    return attachKeys(path, keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
    if (!isarray(keys)) {
        options = /** @type {!Object} */ (keys || options);
        keys = [];
    }

    options = options || {};

    if (path instanceof RegExp) {
        return regexpToRegexp(path, /** @type {!Array} */ (keys));
    }

    if (isarray(path)) {
        return arrayToRegexp( /** @type {!Array} */ (path), /** @type {!Array} */ (keys), options);
    }

    return stringToRegexp( /** @type {string} */ (path), /** @type {!Array} */ (keys), options);
}

var pathToRegexp_1 = pathToRegexp;


/*  */
const regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
    params = params || {};
    try {
        const filler =
            regexpCompileCache[path] ||
            (regexpCompileCache[path] = pathToRegexp_1.compile(path));

        // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
        if (params.pathMatch) params[0] = params.pathMatch;

        return filler(params, {
            pretty: true
        });
    } catch (e) {
        {
            // Fix #3072 no warn if `pathMatch` is string
            warn(typeof params.pathMatch === "string", `missing param for ${routeMsg}: ${e.message}`);
        }
        return "";
    } finally {
        // delete the 0 if it was added
        delete params[0];
    }
}


function extend(a, b) {
    for (const key in b) {
        a[key] = b[key];
    }
    return a;
}


/*  */

function resolvePath(
    relative,
    base,
    append
) {
    const firstChar = relative.charAt(0);
    if (firstChar === "/") {
        return relative;
    }

    if (firstChar === "?" || firstChar === "#") {
        return base + relative;
    }

    const stack = base.split("/");

    // remove trailing segment if:
    // - not appending
    // - appending to trailing slash (last segment is empty)
    if (!append || !stack[stack.length - 1]) {
        stack.pop();
    }

    // resolve relative path
    const segments = relative.replace(/^\//, "").split("/");
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        if (segment === "..") {
            stack.pop();
        } else if (segment !== ".") {
            stack.push(segment);
        }
    }

    // ensure leading slash
    if (stack[0] !== "") {
        stack.unshift("");
    }

    return stack.join("/");
}

function parsePath(path) {
    let hash = "";
    let query = "";

    const hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
        hash = path.slice(hashIndex);
        path = path.slice(0, hashIndex);
    }

    const queryIndex = path.indexOf("?");
    if (queryIndex >= 0) {
        query = path.slice(queryIndex + 1);
        path = path.slice(0, queryIndex);
    }

    return {
        path,
        query,
        hash
    };
}

/*  */

function normalizeLocation(raw, current, append, router) {
    let next = typeof raw === "string" ? {
        path: raw
    } : raw;
    // named target
    if (next._normalized) {
        return next;
    } else if (next.name) {
        next = extend({}, raw);
        const params = next.params;
        if (params && typeof params === "object") {
            next.params = extend({}, params);
        }
        return next;
    }

    // relative params
    if (!next.path && next.params && current) {
        next = extend({}, next);
        next._normalized = true;
        const params = extend(extend({}, current.params), next.params);
        if (current.name) {
            next.name = current.name;
            next.params = params;
        } else if (current.matched.length) {
            const rawPath = current.matched[current.matched.length - 1].path;
            next.path = fillParams(rawPath, params, `path ${current.path}`);
        } else {
            warn(false, "relative params navigation requires a current route.");
        }
        return next;
    }

    const parsedPath = parsePath(next.path || "");
    const basePath = (current && current.path) || "/";
    const path = parsedPath.path ?
        resolvePath(parsedPath.path, basePath, append || next.append) :
        basePath;

    const query = resolveQuery(
        parsedPath.query,
        next.query,
        router && router.options.parseQuery
    );

    let hash = next.hash || parsedPath.hash;
    if (hash && hash.charAt(0) !== "#") {
        hash = `#${hash}`;
    }

    return {
        _normalized: true,
        path,
        query,
        hash
    };
}


function compileRouteRegex(path, pathToRegexpOptions) {
    const regex = pathToRegexp_1(path, [], pathToRegexpOptions);
    {
        const keys = Object.create(null);
        regex.keys.forEach(key => {
            warn(
                !keys[key.name],
                `Duplicate param keys in route with path: "${path}"`
            );
            keys[key.name] = true;
        });
    }
    return regex;
}

function normalizePath(path, parent, strict) {
    if (!strict) path = path.replace(/\/$/, "");
    if (path[0] === "/") return path;
    if (!parent) return path;
    return cleanPath(`${parent.path}/${path}`);
}


function cleanPath(path) {
    return path.replace(/\/\//g, "/");
}

/* 将route添加到pathList pathMap  */
function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
    let {
        path,
        name
    } = route;
    path = path || "";
    name = name || "";

    if (!path || !name) {
        path = (function (url) {
            return /^\//g.test(url) ? url : url ? "/" + url : "/";
        })(route.url);
        console.warn(route, "非标准路由配置");
    }
    path = /^\//g.test(path) ? path : path ? "/" + path : "/";
    const pathToRegexpOptions = route.pathToRegexpOptions || {};
    const normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

    /* 大小写是否敏感 */
    if (typeof route.caseSensitive === "boolean") {
        pathToRegexpOptions.sensitive = route.caseSensitive;
    }

    const record = extend({
        id: route.id,
        pid: route.pid,
        icon: route.icon,
        url: route.url,
        permissions: route.permissions,
        path: normalizedPath,
        regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
        instances: {},
        handler: route.handler,
        name,
        parent,
        matchAs,
        redirect: route.redirect,
        beforeEnter: route.beforeEnter,
        meta: route.meta || {},
        props: route.props == null ? {} : route.components ?
            route.props : {
                default: route.props
            }
    }, route);

    if (route.children && isarray(route.children) && route.children.length > 0) {
        // Warn if route is named, does not redirect and has a default child route.
        // If users navigate to this route by name, the default child will
        // not be rendered (GH Issue #629)
        {
            if (
                route.name &&
                !route.redirect &&
                route.children.some(child => /^\/?$/.test(child.path))
            ) {
                warn(
                    false,
                    `Named Route '${route.name}' has a default child route. ` +
                    `When navigating to this named route (:to="{name: '${
                        route.name
                    }'"), ` +
                    "the default child route will not be rendered. Remove the name from " +
                    "this route and use the name of the default child route for named " +
                    "links instead."
                );
            }
        }
        route.children.forEach(child => {
            const childMatchAs = matchAs ?
                cleanPath(`${matchAs}/${child.path}`) :
                undefined;
            addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
        });
    }

    if (!pathMap[record.path]) {
        pathList.push(record.path);
        pathMap[record.path] = record;
    }

    if (route.alias !== undefined) {
        const aliases = isarray(route.alias) ? route.alias : [route.alias];
        for (let i = 0; i < aliases.length; ++i) {
            const alias = aliases[i];
            if (alias === path) {
                warn(
                    false,
                    `Found an alias with the same value as the path: "${path}". You have to remove that alias. It will be ignored in development.`
                );
                // skip in dev to make it work
                continue;
            }

            const aliasRoute = {
                path: alias,
                children: route.children
            };
            addRouteRecord(
                pathList,
                pathMap,
                nameMap,
                aliasRoute,
                parent,
                record.path || "/",
                matchAs
            );
        }
    }

    if (name) {
        if (!nameMap[name]) {
            nameMap[name] = record;
        } else if (!matchAs) {
            warn(false, "Duplicate named routes definition: " + `{ name: "${name}", path: "${record.path}" }`);
        }
    }
}


function warn(condition, message) {
    if (!condition) {
        typeof console !== "undefined" && console.warn(`[vue-router] ${message}`);
    }
}


/*
createRouteMap 函数的目标是把用户的路由配置转换成一张路由映射表，
它包含 3 个部分，
    pathList 存储所有的 path，
    pathMap 表示一个 path 到 RouteRecord 的映射关系，
    nameMap 表示 name 到 RouteRecord 的映射关系。
 */
function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
    // the path list is used to control path matching priority
    const pathList = oldPathList || [];
    /*  */
    /* Object.create(null)没有继承任何原型方法，即 toString 都没有 */
    const pathMap = oldPathMap || Object.create(null);
    /*  */
    const nameMap = oldNameMap || Object.create(null);

    routes.forEach(route => {
        addRouteRecord(pathList, pathMap, nameMap, route);
    });

    /* ensure wildcard通配符 routes are always at the end */
    for (let i = 0, l = pathList.length; i < l; i++) {
        if (pathList[i] === "*") {
            pathList.push(pathList.splice(i, 1)[0]);
            l--;
            i--;
        }
    }

    {
        // warn if routes do not include leading slashes
        const found = pathList
            // check for missing leading slash
            .filter(path => path && path.charAt(0) !== "*" && path.charAt(0) !== "/");

        if (found.length > 0) {
            const pathNames = found.map(path => `- ${path}`).join("\n");
            warn(false, `非嵌套路由需以"/"开头： \n${pathNames}`);
        }
    }

    console.log(pathList, pathMap, nameMap);


    return {
        pathList,
        pathMap,
        nameMap
    };

}

function formatMatch(record) {
    const res = [];
    while (record) {
        res.unshift(record);
        record = record.parent;
    }
    return res;
}


/*  */

const encodeReserveRE = /[!'()*]/g;
const encodeReserveReplacer = c => "%" + c.charCodeAt(0).toString(16);
const commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
const encode = str => encodeURIComponent(str)
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ",");

var isarray = (() => (Array.isArray && Array.isArray.bind(Array)) || ((arr) => Object.prototype.toString.call(arr) == "[object Array]"))();

function stringifyQuery(obj) {
    const res = obj ? Object.keys(obj).map(key => {
        const val = obj[key];

        if (val === undefined) {
            return "";
        }

        if (val === null) {
            return encode(key);
        }

        if (isarray(val)) {
            const result = [];
            val.forEach(val2 => {
                if (val2 === undefined) {
                    return;
                }
                if (val2 === null) {
                    result.push(encode(key));
                } else {
                    result.push(encode(key) + "=" + encode(val2));
                }
            });
            return result.join("&");
        }

        return encode(key) + "=" + encode(val);
    }).filter(x => x.length > 0).join("&") : null;
    return res ? `?${res}` : "";
}


function getFullPath({
                         path,
                         query = {},
                         hash = ""
                     }, _stringifyQuery) {
    const stringify = _stringifyQuery || stringifyQuery;
    return (path || "/") + stringify(query) + hash;
}

function clone(value) {
    if (isarray(value)) {
        return value.map(clone);
    } else if (value && typeof value === "object") {
        const res = {};
        for (const key in value) {
            res[key] = clone(value[key]);
        }
        return res;
    } else {
        return value;
    }
}

function createRoute(record, location, redirectedFrom, router) {
    const stringifyQuery = router && router.options.stringifyQuery;

    let query = location.query || {};
    try {
        query = clone(query);
    } catch (e) {
    }
    const route = {
        name: location.name || (record && record.name),
        meta: (record && record.meta) || {},
        path: location.path || "/",
        hash: location.hash || "",
        query,
        params: location.params || {},
        fullPath: getFullPath(location, stringifyQuery),
        matched: record ? formatMatch(record) : []
    };
    if (redirectedFrom) {
        route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery);
    }
    return Object.freeze(route);
}

function createMatcher(routes /* 用户传入的路由配置 */, router /* 当前VarRouter实例 */) /* :{ match, addRoutes } */ {
    const {
        pathList,
        pathMap,
        nameMap
    } = createRouteMap(routes);
    router.pathList = pathList;
    router.pathMap = pathMap;
    router.nameMap = nameMap;

    /* 动态添加路由与侧边栏展示信息无关 */
    function addRoutes(routes) {
        /*  */
        createRouteMap(routes, pathList, pathMap, nameMap);
    }

    /*  matched 表示匹配到的所有的 RouteRecord */
    function match(raw, currentRoute, redirectedFrom) {
        const location = normalizeLocation(raw, currentRoute, false, router);
        const {
            name
        } = location;

        if (name) {
            const record = nameMap[name];
            {
                warn(record, `Route with name '${name}' does not exist`);
            }
            if (!record) return _createRoute(null, location);
            const paramNames = record.regex.keys
                .filter(key => !key.optional)
                .map(key => key.name);

            if (typeof location.params !== "object") {
                location.params = {};
            }

            if (currentRoute && typeof currentRoute.params === "object") {
                for (const key in currentRoute.params) {
                    if (!(key in location.params) && paramNames.indexOf(key) > -1) {
                        location.params[key] = currentRoute.params[key];
                    }
                }
            }

            location.path = fillParams(record.path, location.params, `named route "${name}"`);
            return _createRoute(record, location, redirectedFrom);
        } else if (location.path) {
            location.params = {};
            for (let i = 0; i < pathList.length; i++) {
                const path = pathList[i];
                const record = pathMap[path];
                if (matchRoute(record.regex, location.path, location.params)) {
                    return _createRoute(record, location, redirectedFrom);
                }
            }
        }
        // no match
        return _createRoute(null, location);
    }

    function redirect(
        record,
        location
    ) {
        const originalRedirect = record.redirect;
        let redirect = typeof originalRedirect === "function" ?
            originalRedirect(createRoute(record, location, null, router)) :
            originalRedirect;

        if (typeof redirect === "string") {
            redirect = {
                path: redirect
            };
        }

        if (!redirect || typeof redirect !== "object") {
            {
                warn(
                    false, `invalid redirect option: ${JSON.stringify(redirect)}`
                );
            }
            return _createRoute(null, location);
        }

        const re = redirect;
        const {
            name,
            path
        } = re;
        let {
            query,
            hash,
            params
        } = location;

        query = re.hasOwnProperty("query") ? re.query : query;
        hash = re.hasOwnProperty("hash") ? re.hash : hash;
        params = re.hasOwnProperty("params") ? re.params : params;

        if (name) {
            // resolved named direct
            const targetRecord = nameMap[name];
            {
                assert(targetRecord, `redirect failed: named route "${name}" not found.`);
            }
            return match({
                _normalized: true,
                name,
                query,
                hash,
                params
            }, undefined, location);
        } else if (path) {
            // 1. resolve relative redirect
            const rawPath = resolveRecordPath(path, record);
            // 2. resolve params
            const resolvedPath = fillParams(rawPath, params, `redirect route with path "${rawPath}"`);
            // 3. rematch with existing query and hash
            return match({
                _normalized: true,
                path: resolvedPath,
                query,
                hash
            }, undefined, location);
        } else {
            {
                warn(false, `invalid redirect option: ${JSON.stringify(redirect)}`);
            }
            return _createRoute(null, location);
        }
    }

    function alias(record, location, matchAs) {
        const aliasedPath = fillParams(matchAs, location.params, `aliased route with path "${matchAs}"`);
        const aliasedMatch = match({
            _normalized: true,
            path: aliasedPath
        });
        if (aliasedMatch) {
            const matched = aliasedMatch.matched;
            const aliasedRecord = matched[matched.length - 1];
            location.params = aliasedMatch.params;
            return _createRoute(aliasedRecord, location);
        }
        return _createRoute(null, location);
    }

    function _createRoute(record, location, redirectedFrom) {
        if (record && record.redirect) {
            return redirect(record, redirectedFrom || location);
        }
        if (record && record.matchAs) {
            return alias(record, location, record.matchAs);
        }
        return createRoute(record, location, redirectedFrom, router);
    }

    return {
        match,
        addRoutes
    };
}


const START = createRoute(null, {
    path: "/"
});

export class VarRouter {
    constructor(options = {}) {
        this.options = options;
        this.beforeHooks = [];
        this.resolveHooks = [];
        this.afterHooks = [];
        /* 路由处理器根据路由条件处理 */
        this.dispatchHandler = {
            /* VueComponent */
            "1": () => console.log("handleVueComponent")
        };
        /* routers key-val map扁平化  */
        this.matcher = createMatcher(options.routes /* 用户传入的路由配置 */ || [], this /* 当前VarRouter实例 */);
        /* 目前是考虑hash模式 */
        this.mode = "hash";
        this.history = new HashHistory(this, options.base);
        return this.init();
    }

    match(raw, current, redirectedFrom) {
        return this.matcher.match(raw, current, redirectedFrom);
    }

    /* 每次直接从window.location获取 纯函数 */
    get currentRoute() {
        return this.history && this.history.current;
    }

    init() {
        const history = this.history;
        /* 当前只有Hash模式 */
        const setupHashListener = () => history.setupListeners();
        const location = history.getCurrentLocation();
        // this.current = history.router.match(location, this.current);
        history.transitionTo(location, setupHashListener, setupHashListener);
        /*   history.listen(route => {
              this.options.onChange && this.options.onChange(route);
              console.log("history listen routeChange", route);
          }); */
        return this;
    }


    onReady(cb, errorCb) {
        this.history.onReady(cb, errorCb);
    }

    onError(errorCb) {
        this.history.onError(errorCb);
    }

    push(location, onComplete, onAbort) {
        /*  */
        if (!onComplete && !onAbort && typeof Promise !== "undefined") {
            return new Promise((resolve, reject) => {
                this.history.push(location, resolve, reject);
            })
                .catch(reason => {
                    console.log("catch:", reason);
                });
        } else {
            this.history.push(location, onComplete, onAbort);
        }
    }

    replace(location, onComplete, onAbort) {
        /*  */
        if (!onComplete && !onAbort && typeof Promise !== "undefined") {
            return new Promise((resolve, reject) => {
                this.history.replace(location, resolve, reject);
            });
        } else {
            this.history.replace(location, onComplete, onAbort);
        }
    }

    go(n) {
        this.history.go(n);
    }

    back() {
        this.go(-1);
    }

    forward() {
        this.go(1);
    }

    getMatchedComponents(to) {
        const route = to ?
            to.matched ?
                to :
                this.resolve(to).route :
            this.currentRoute;
        if (!route) {
            return [];
        }
        return [].concat.apply([], route.matched.map(m => {
            return Object.keys(m.components).map(key => {
                return m.components[key];
            });
        }));
    }

    resolve(to, current, append) {
        current = current || this.history.current;
        const location = normalizeLocation(
            to,
            current,
            append,
            this
        );
        const route = this.match(location, current);
        const fullPath = route.redirectedFrom || route.fullPath;
        const base = this.history.base;
        const href = createHref(base, fullPath, this.mode);
        return {
            location,
            route,
            href,
            // for backwards compat
            normalizedTo: location,
            resolved: route
        };
    }

    addRoutes(routes) {
        this.matcher.addRoutes(routes);
        if (this.history.current !== START) {
            this.history.transitionTo(this.history.getCurrentLocation());
        }
    }

    addSubRoutes(parentRoute, routes) {

        routes = routes.map(route => {
            route.path = `${parentRoute.path}/${route.path}`;
            return route;
        });
        return this.addRoutes(routes);
    }
}

export default VarRouter;