const libCollection = {}
const PATH_PREFIX = window.APP_CONFIGS.PATH_PREFIX;
const parentUrl = getBaseurl();

__webpack_public_path__ = `${parentUrl}${PATH_PREFIX}/vlibs/`;

function getBaseurl() {
    const scriptMainSentryEle = document.getElementById("script-main-sentry");
    if (!scriptMainSentryEle) {
        const {
            pathname,
            href
        } = window.location;
        let baseURL = href.substring(0, href.indexOf(pathname));
        console.error("入口页面未设置script-main-sentry");
        return baseURL + "/";
    }
    let jsPath = scriptMainSentryEle.src;
    const _baseURL = jsPath.substring(0, jsPath.lastIndexOf(PATH_PREFIX + "/js/main.sentry.js")) || "/";
    /* 带有完成协议与域名的基本路径 */
    return _baseURL;
}

export const vlibs = {
  async get(libName) {
    var target = libCollection[libName];
    if(target)return target;
    const libMap = {
      Scrollbar: () => import("@@/static/module/dev/Scrollbar"),
      PageLogin: () => import("@@/static/module/dev/PageLogin")
    };
    const res = await (libMap[libName] && libMap[libName]())||"";
    if(res){
      libCollection[libName] = res&&res.default;
      return res;
    }else{
      console.error("vlibs load "+libName+" failed")
    }
  },
  async test() {
    let res = await vlibs.get("Scrollbar");
    console.log("res", res);
  },
};
