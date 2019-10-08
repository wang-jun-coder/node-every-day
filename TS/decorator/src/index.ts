import Koa from 'koa';
import Router from 'koa-router';
import bodyParse from 'koa-bodyparser';
import compose from 'koa-compose';
import './controllers/index';
import './controllers/users';
import { RouterList, ControllerList, ParamList, ParseList } from './decorators';


function bootstrap() {
    // 根据全局变量, 动态创建对应路由
    const routes: any[] = [];

    RouterList.forEach(({ basename, constructor }) => {
        const router = new Router({
            prefix: basename
        });
        routes.push(router.routes());

        // 挂载对应路由函数
        ControllerList.filter(i => i.target === constructor.prototype)
            .forEach((controller) => {
                router[controller.type](controller.path, async (ctx: any, next) => {
                    // 整合对应参数
                    const args: any[] = [];
                    ParamList
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
            })

    });

    // 开启服务
    const app = new Koa();
    app.use(bodyParse());
    app.use(compose(routes));
    app.listen(3000, () => console.log('server listen on 127.0.0.1:3000'));
}

bootstrap();


