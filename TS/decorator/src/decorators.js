"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 全局变量, 用于存储对应的数据
exports.RouterList = [];
exports.ControllerList = [];
exports.ParseList = [];
exports.ParamList = [];
// router 装饰器, 仅用于注册至全局变量, 项目启动时会根据全局变量统一创建 router
function Router(basename = '') {
    return (constructor) => {
        exports.RouterList.push({
            basename,
            constructor: constructor
        });
    };
}
exports.Router = Router;
// method 装饰器, 主要用来装饰 get/post 等方法
function Method(type) {
    return (path = '') => (target, name, descriptor) => {
        exports.ControllerList.push({
            target,
            type,
            path,
            method: name,
            controller: descriptor.value
        });
    };
}
exports.Method = Method;
// 参数装饰器, 用来获取参数
function Param(position) {
    return (key) => (target, name, index) => {
        exports.ParamList.push({
            target,
            key,
            position,
            index,
            method: name
        });
    };
}
exports.Param = Param;
function Parse(type) {
    return (target, name, index) => {
        exports.ParseList.push({
            target,
            type,
            method: name,
            index
        });
    };
}
exports.Parse = Parse;
exports.Query = Param('query');
exports.Body = Param('body');
exports.Header = Param('header');
exports.cookie = Param('cookie');
exports.Get = Method('get');
exports.Post = Method('post');
//# sourceMappingURL=decorators.js.map