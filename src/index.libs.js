export const vlibs = {
  get(libName) {
    const libMap = {
      Scrollbar: () => import("@@/static/module/dev/Scrollbar"),
    };

    return libMap[libName] && libMap[libName]();
  },
  async test() {
    let res = await vlibs.get("Scrollbar");
    console.log("res", res.default);
  },
};
