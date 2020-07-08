const fs = require("fs-extra");
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const mount = require("koa-mount");
const webpack = require("webpack");
const bodyParser = require("koa-bodyparser");
const {
    koaDevMiddleware,
    koaHotMiddleware
} = require("./hmr");
const webpackDevConfig = require("./webpack.dev.config");
const {
    isProd
} = require("./config/phases");
const webpackCompiler = webpack(webpackDevConfig);

const app = new Koa();
const router = new Router();
app.use(bodyParser());
app.use(router.routes());
app.use(mount("/", serve(path.resolve(__dirname, "./public"))));
if (isProd) {
    const indexHtml = path.resolve(__dirname, "./public/index.html");
    app.use(ctx => {
        ctx.body = fs.readFileSync(indexHtml, {
            encoding: "utf8"
        });
    });
} else {
    app.use(koaDevMiddleware(webpackCompiler, {
        noInfo: true,
    }));
    app.use(koaHotMiddleware(webpackCompiler, {
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000,
    }));
}


router.get("/api/menu", async (ctx) => {
    const menuPath = path.resolve(__dirname, "./public/static/mock/menu.json");
    ctx.response.body = await fs.readJSON(menuPath);

});
router.post("/api/menu", async (ctx) => {
    const savePath4menu = path.resolve(__dirname, "./public/static/mock/menu.json");
    let res = await fs.writeJSON(savePath4menu, ctx.request.body);
    ctx.response.body = {
        body: ctx.request.body
    };
});


const port = process.env.PORT || 8082;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on ${port} port`);
});