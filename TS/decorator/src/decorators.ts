// 全局变量, 用于存储对应的数据
export const RouterList: any[] = [];
export const ControllerList: any = [];
export const ParseList: any[] = [];
export const ParamList: any[] = [];

// router 装饰器, 仅用于注册至全局变量, 项目启动时会根据全局变量统一创建 router
export function Router(basename = '') {
    return (constructor: any) => {
        RouterList.push({
            basename,
            constructor: constructor
        });
    }
}

// method 装饰器, 主要用来装饰 get/post 等方法
export function Method(type: any) {
    return (path: string = '') => (target: any, name: string, descriptor: any) => {
        ControllerList.push({
            target,
            type,
            path,
            method: name,
            controller: descriptor.value
        });
    }
}

// 参数装饰器, 用来获取参数
export function Param(position: string) {
    return (key: any) => (target: any, name: string, index: any) => {
        ParamList.push({
            target,
            key,
            position,
            index,
            method: name
        })
    }
}

export function Parse(type: string) {
    return (target: any, name: any, index: any) => {
        ParseList.push({
            target,
            type,
            method: name,
            index
        });
    }
}

export const Query = Param('query');
export const Body = Param('body');
export const Header = Param('header');
export const cookie = Param('cookie');
export const Get = Method('get');
export const Post = Method('post');
