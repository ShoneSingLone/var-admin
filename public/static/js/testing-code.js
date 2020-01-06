import app from "./testing-dep.js";
import _loadingAnimation from "./loadingAnimation.js";

export async function p() {
  window.isOldBrowser ? console.timeEnd("isOldBrowser") : (console.log(`str.toString()${isOldBrowser}`), console.timeEnd("smart"));
  console.log(`import app from "./foo/bar/vueapp"; ${app}`);
  return (await import('./testing-dep.js')).p;
}
_loadingAnimation();
function* responseTime(next) {
  let start = new Date()
  yield next
  var ms = new Date() - start
  this.set('X-Response-Time', ms + 'ms')
}

export const loadingAnimation = _loadingAnimation;
export default function init(app) {
  app.use(responseTime)
}