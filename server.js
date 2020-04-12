const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const mount = require("koa-mount");
const webpack = require("webpack");
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
const staticPath = path.resolve(__dirname, "./public");
router.get("/a/api", async (ctx, next) => {
    ctx.response.body = "hello";
    next();
});
app.use(mount("/", serve(staticPath)));
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

const port = process.env.PORT || 8082;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on ${port} port`);
});