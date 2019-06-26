namespace EnumsNameSpace {
    // enum

    // 数字枚举
    enum Direction {
        Up = 1,
        Down, // 2
        Left, // 3
        Right // 4
    }
    enum Direction1 {
        Up ,    // 0
        Down,   // 1
        Left,   // 2
        Right   // 3
    }
    // 枚举使用
    enum Response {
        No = 0,
        Yes = 1,
    }
    function respond(recipient: string, message:Response ): void {

    }
    respond('princess caroline', Response.Yes);

    // 不带初始化器的枚举或者被放在第一的位置，或者被放在使用了数字常量或其它常量初始化了的枚举后面
    function getSomeValue():number {
        return 1;
    }
    enum E {
        A = getSomeValue(),
        // B, // Enum member must have initializer.
    }
    enum E1 {
        B,
        A = getSomeValue(),
    }

    // 字符串枚举, 无自增长行为, 每个成员都需要初始化
    enum Direction2 {
        Up = 'UP',
        Down = 'DOWN',
        Left = 'LEFT',
        Right = 'RIGHT'
    }

    // 异构枚举(不建议)
    enum BooleanLikeHeterogeneousEmum {
        No = 0,
        Yes = 'YES'
    }

    // 计算的和常量成员
    enum E2 {
        X // 0
    }
    enum E3 {
        X,  // 0
        Y,  // 1
        Z   // 2
    }
    enum E4 {
        X=1,    // 1
        Y,      // 2
        Z,      // 3
    }
    // 计算类型
    enum FileAccess {
        None,
        Read = 1 << 1,
        Write = 1 << 2,
        ReadWrite = Read | Write,
        G = '123'.length
    }

    // 联合枚举, 与枚举成员的类型
    enum ShapeKind {
        Circle,
        Square
    }
    interface Circle {
        kind: ShapeKind.Circle;
        radius: number;
    }
    interface Square {
        kind: ShapeKind.Square;
        sideLength: number;
    }
    let c: Circle = {
        //kind: ShapeKind.Square, // Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
        kind: ShapeKind.Circle,
        radius: 100,
    };
    enum E5 {
        Foo,
        Bar
    }
    function f(x: E5) {
        // x 是 E5枚举, 不是 E5.Foo 就是 E5.Bar, 所以表达式恒为真
        // if (x !== E5.Foo || x !== E5.Bar) {}
        // This condition will always return 'true' since the types 'E5.Foo' and 'E5.Bar' have no overlap.
    }

    // 运行时枚举
    enum E6 {
        X, Y, Z
    }
    function f1(obj: { X: number }) {
        return obj.X;
    }
    f1(E6); // E6, 有个属性 X 符合 f1 参数类型

    // 反向映射(不会为字符串类型的枚举成员生成反向映射)
    enum Enum {
        A
    }
    let a = Enum.A;
    let nameOfA = Enum[a];
    console.log(nameOfA); // "A"

    // const 枚举(const 枚举会在编译阶段被删除, 只能使用常量枚举表达式, 其成员在使用的地方会被内联起来)
    const enum Enum1 {
        A = 1,
        B = A * 2
    }
    const enum Enum2 {
        Up,
        Down,
        Left,
        Right
    }
    let directions = [Enum2.Up, Enum2.Down, Enum2.Left, Enum2.Right];
    // build result:  let directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

    // 外部枚举, 用来描述已存在的枚举类型的形状
    // 在正常的枚举里，没有初始化方法的成员被当成常量成员。 对于非常量的外部枚举而言，没有初始化方法时被当做需要经过计算的
    declare enum Enum3 {
        A = 1,
        B,
        C = 2
    }
}
