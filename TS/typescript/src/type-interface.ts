namespace TypeInterfaceNameSpace {
    // 基础
    // 变量x的类型被推断为数字。 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时
    let x = 3;

    // 最佳通用类型
    let y = [0, 1, 'string']; // 推断为 (string | number)[]
    class Animal {}
    class Rhino extends Animal{}
    class Elephant extends Animal{}
    class Snake extends Animal {}
    class Lion extends Animal{}
    // 推断为联合类型 (Rhino | Elephant | Snake) []
    let zoo = [new Rhino(), new Elephant(), new Snake()];
    // 强制指定类型
    let zoo1: Animal[] = [new Rhino(), new Elephant(), new Snake()];


    // 上下文归类
    // 根据左侧表达式推断右侧函数参数类型
    window.onmousedown = function (mouseEvent) {
        console.log(mouseEvent.button);
        // console.log(mouseEvent.kangaroo); // Property 'kangaroo' does not exist on type 'MouseEvent'.
    };
    window.onscroll = function (uiEvent) {
        // console.log(uiEvent.button); // Property 'button' does not exist on type 'Event'.
    };

    // 无法推断时, 隐式 any
    const handler = function (uiEvent) {
        console.log(uiEvent.button);
    };

    // 强制类型赋值覆写上下文类型
    window.onscroll = function (uiEvent: any) {
        console.log(uiEvent.button) // undefined;
    };

    function createZoo():Animal[] {
        return [new Rhino(), new Elephant(), new Snake()];
    }
}
