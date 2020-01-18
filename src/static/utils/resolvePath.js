import camelCase from "lodash/camelCase";
import last from "lodash/last";
const backslashRegEx = /\\/g;
const parentUrl = getBaseurl();
window.__webpack_public_path__ = parentUrl + "static/lib/bundle/";
export function getIDFromURL(url) {
    return camelCase(url.substring(url.lastIndexOf("/static"))).toLowerCase();
}

function getBaseurl() {
    var jsPath = document.currentScript ? document.currentScript.src : function () {
        var js = document.scripts,
            last = js.length - 1,
            src;
        for (var i = last; i > 0; i--) {
            if (js[i].readyState === "interactive") {
                src = js[i].src;
                break;
            }
        }
        return src || js[last].src;
    }();
    return jsPath.substring(0, jsPath.lastIndexOf("static/js/main.js")) || "/";
}

/* system.js line:27 */
function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    if (relUrl.indexOf("\\") !== -1)
        relUrl = relUrl.replace(backslashRegEx, "/");
    // protocol-relative
    if (relUrl[0] === "/" && relUrl[1] === "/") {
        return parentUrl.slice(0, parentUrl.indexOf(":") + 1) + relUrl;
    }
    // relative-url
    else if (relUrl[0] === "." && (relUrl[1] === "/" || relUrl[1] === "." && (relUrl[2] === "/" || relUrl.length === 2 && (relUrl += "/")) ||
            relUrl.length === 1 && (relUrl += "/")) ||
        relUrl[0] === "/") {
        const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(":") + 1);
        // Disabled, but these cases will give inconsistent results for deep backtracking
        //if (parentUrl[parentProtocol.length] !== '/')
        //  throw Error('Cannot resolve');
        // read pathname from parent URL
        // pathname taken to be part after leading "/"
        let pathname;
        if (parentUrl[parentProtocol.length + 1] === "/") {
            // resolving to a :// so we need to read out the auth and host
            if (parentProtocol !== "file:") {
                pathname = parentUrl.slice(parentProtocol.length + 2);
                pathname = pathname.slice(pathname.indexOf("/") + 1);
            } else {
                pathname = parentUrl.slice(8);
            }
        } else {
            // resolving to :/ so pathname is the /... part
            pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === "/"));
        }

        if (relUrl[0] === "/")
            return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;

        // join together and split for removal of .. and . segments
        // looping the string instead of anything fancy for perf reasons
        // '../../../../../z' resolved to 'x/y' is just 'z'
        const segmented = pathname.slice(0, pathname.lastIndexOf("/") + 1) + relUrl;

        const output = [];
        let segmentIndex = -1;
        for (let i = 0; i < segmented.length; i++) {
            // busy reading a segment - only terminate on '/'
            if (segmentIndex !== -1) {
                if (segmented[i] === "/") {
                    output.push(segmented.slice(segmentIndex, i + 1));
                    segmentIndex = -1;
                }
            }

            // new segment - check if it is relative
            else if (segmented[i] === ".") {
                // ../ segment
                if (segmented[i + 1] === "." && (segmented[i + 2] === "/" || i + 2 === segmented.length)) {
                    output.pop();
                    i += 2;
                }
                // ./ segment
                else if (segmented[i + 1] === "/" || i + 1 === segmented.length) {
                    i += 1;
                } else {
                    // the start of a new segment as below
                    segmentIndex = i;
                }
            }
            // it is the start of a new segment
            else {
                segmentIndex = i;
            }
        }
        // finish reading out the last segment
        if (segmentIndex !== -1)
            output.push(segmented.slice(segmentIndex));
        return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join("");
    }
}

export function resolvePath(relUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (relUrl.indexOf(":") !== -1 ? relUrl : resolveIfNotPlainOrUrl("./" + relUrl, parentUrl));
}