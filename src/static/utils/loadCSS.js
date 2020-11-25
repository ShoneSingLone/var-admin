import merge from "lodash/merge";
import camelCase from "lodash/camelCase";
import {
	getIDFromURL
} from "./resolvePath.js";

function loadCSSByAddLinkElement(url, _opts) {
	return new Promise((resolve, reject) => {
		let ele = merge(document.createElement("link"), {
			id: getIDFromURL(url),
			rel: "stylesheet"
		});
		ele.onerror = function(e) {
			ele = ele.onerror = ele.onload = null;
			reject(e);
		};
		ele.onload = function(e) {
			ele = ele.onerror = ele.onload = null;
			resolve(e);
		};
		document.getElementsByTagName("head")[0].appendChild(ele);
		ele.href = url;
	});
}

const LoadedCSS = {};
export default function loadCss(url) {
	if (LoadedCSS[getIDFromURL(url)]) return Promise.resolve();
	return loadCSSByAddLinkElement(url)
		.then(function() {
			LoadedCSS[getIDFromURL(url)] = true;
			console.log("loaded", url);
		})
		.catch(function(error) {
			console.error(error);
		});
}
