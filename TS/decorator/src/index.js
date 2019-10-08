"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_compose_1 = __importDefault(require("koa-compose"));
require("./controllers/index");
require("./controllers/users");
const decorators_1 = require("./decorators");
function bootstrap() {
    // 根据全局变量, 动态创建对应路由
    const routes = [];
    decorators_1.RouterList.forEach(({ basename, constructor }) => {
        const router = new koa_router_1.default({
            prefix: basename
        });
        routes.push(router.routes());
        // 挂载对应路由函数
        decorators_1.ControllerList.filter(i => i.target === constructor.prototype)
            .forEach((controller) => {
            router[controller.type](controller.path, async (ctx, next) => {
                // 整合对应参数
                const args = [];
                decorators_1.ParamList
                    .filter(({ target, method }) => target === constructor.prototype && method === controller.method)
                    .forEach(({ index, key, position }) => {
                    switch (position) {
                        case 'body':
                            args[index] = ctx.request.body[key];
                            break;
                        case 'header':
                            args[index] = ctx.headers[key];
                            break;
                        case 'cookie':
                            args[index] = ctx.cookies.get('key');
                            break;
                        case 'query':
                            args[index] = ctx.request.query[key];
                            break;
                        default:
                            break;
                    }
                });
                ctx.body = controller.controller(...args);
            });
        });
    });
    // 开启服务
    const app = new koa_1.default();
    app.use(koa_bodyparser_1.default());
    app.use(koa_compose_1.default(routes));
    app.listen(3000, () => console.log('server listen on 127.0.0.1:3000'));
}
bootstrap();
//# sourceMappingURL=index.js.map