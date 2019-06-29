
// 基本类型的声明

// boolean
let isDone: boolean = false;


// number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// string
let color: string = 'blue';
color = 'red';
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `hello, my name is ${ fullName }.
I'll be ${ age + 1 } years old next month/`;


// array
let list: number[] = [1, 2, 3];
// let list: Array<number> = [1, 2, 3];


// tuple
let x: [string, number];
x = ['hello', 10];
// x = [10, 'hello']; //  Type 'number' is not assignable to type 'string'. Type 'string' is not assignable to type 'number'.
console.log(x[0].substr(1));
// console.log(x[1].substr(1)); // Property 'substr' does not exist on type 'number'.
// x[2] = 'world'; //   Tuple type '[string, number]' of length '2' has no element at index '2'
// 越界元素使用联合类型代替
x.push('world');
x.push(11);
// x.push({}); //  Argument of type '{}' is not assignable to parameter of type 'string | number'. Type '{}' is not assignable to type 'number'.


// enum, 默认从 0 开始编号, 可以手动指定
enum Color {
    Red=1, Green=2, Blue
}
let c:Color = Color.Blue;
let colorName:string = Color[2];
console.log(colorName); // Green


//any
let notSure:any = 4;
notSure = 'maybe a string';
notSure = false;
// notSure.ifExists(); // 编译通过, 运行报错
let notSureList: any = [1, true, 'free'];
notSureList[1] = 100;


// void
function warnUser():void {
    console.warn('this is my warning message');
}
let unusable:void = undefined;


// null && undefined,
// null 只能赋值null 类型, undefined 可以为 undefined 或 void
let u:undefined = undefined;
let n:null = null;
let v:void = undefined;
//let vn:void = null; // Type 'null' is not assignable to type 'void'.
// let y:null = undefined; // Type 'undefined' is not assignable to type 'null'.


// never 表示永不存在的值类型,
// never 是任何类型的子类型, 也可以赋值给任何类型,
// 但是除了 never(没有类型时 never 类型的子类), 没有任何类型可以赋值给 never 类型
// 返回 never 类型的函数,必须存在无法到达的终点
function error(message:string):never {
    throw new Error(message);
}
// 推断类型是 never
function fail() {
    return error('something failed');
}
// 死循环, 函数无法到达终点
function infiniteLoop():never {
    while (true) {

    }
}


// object
// 标记非原始类型,除基本类型外的
declare function create(o:object|null):void;
create({prop:0});
create(null);
//create(42); //  Argument of type '42' is not assignable to parameter of type 'object | null'.
//create('string'); // Argument of type '"string"' is not assignable to parameter of type 'object | null'.


// 类型断言
let someValue:any = 'this is a string';
let strLen:number = (<string>someValue).length;
strLen = (someValue as string).length;


export default {};
