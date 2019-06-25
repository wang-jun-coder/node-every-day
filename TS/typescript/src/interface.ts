// basic
interface LabelValue {
    label: string
}
function printLabel(labelObj: LabelValue) {
    console.log(labelObj.label);
}
let myObj = { size: 10, label: 'Size 10 Object'};
// 编译器并不检查属性顺序, 只要属性存在且类型正确即可
printLabel(myObj);


// Optional Properties
interface SquareConfig {
    color?: string;
    width?: number;
    // [propName: string]: any // 字符串索引签名,可避开对多余属性的检查
}
function createSquare(config: SquareConfig): {color: string, area: number } {
    let newSquare = {color: 'white', area: 100};
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

// Readonly Properties
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = {x: 10, y: 20};
// p1.x = 5; // Cannot assign to 'x' because it is a read-only property.

let array: number [] = [1, 2, 3, 4];
// let readonlyArray: ReadonlyArray<number> = a; // Type 'number' is not assignable to type 'readonly number[]'.
let readonlyArray: ReadonlyArray<number> = [1, 2, 3, 4];
//readonlyArray[0] = 12; // Index signature in type 'readonly number[]' only permits reading.
//readonlyArray.push(1); // Property 'push' does not exist on type 'readonly number[]'.
// a = readonlyArray; // Type 'readonly number[]' is not assignable to type 'number'.
// a = readonlyArray as number[]; // Type 'number[]' is not assignable to type 'number'.


// Excess Property Checks
// 对于字面量对象的多出属性 ts 会检测出问题, 可以强制指定类型, 变量声明, 可避开检测,
//createSquare({colur: 'red', width: 100}); // Argument of type '{ colur: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.Object literal may only specify known properties, but 'colur' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
createSquare({colur: 'red', width: 100} as SquareConfig);
// 变量引用这种方式,需要与指定类型有共同属性才可以
// let squareConfig = {colur: 'red'};
// createSquare(squareConfig); // Type '{ colur: string; }' has no properties in common with type 'SquareConfig'.
let squareConfig = {colur: 'red', width: 100};
createSquare(squareConfig);

// 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch:SearchFunc;
// 参数名可以与接口定义不同,只要类型兼容即可
mySearch = function (source: string, sub: string): boolean {
    let result = source.search(sub);
    return result > -1;
};


// 可索引类型
// 描述可以通过索引得到的类型, 如 a[10]
interface StringArray {
    [index: number]: string
}
let myArray: StringArray;
myArray = ['bob', 'fred'];
let myStr = myArray[0];

// 字符串索引和数字索引
class Animal {
    name: string = '';
}
class Dog extends Animal {
    breed: string = '';
}

interface NotOk {
    //[x: number]: Animal; // Numeric index type 'Animal' is not assignable to string index type 'Dog'.
    [x: number]: Dog;
    [x: string]: Dog
}

// 描述 字典
interface NumberDictionary {
    [index: number]: string;
    length: number;
    name: string
}
// 也可以给索引添加 readonly, 避免给索引赋值
interface ReadOnlyArray {
    readonly [index: number]: string;
}
let myArray1: ReadOnlyArray = ['Alice', 'Bob'];
// myArray1[2] = 'xx'; // Index signature in type 'ReadOnlyArray' only permits reading.


// 类类型
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
    tick():void;
    // new(hour: number, minute: number):ClockInterface;
}
class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date): void {
        this.currentTime = d;
    }
    tick(): void {
        console.log('clock');
    }

    constructor(h: number, m: number) {

    }
}

interface ClockConstructor {
    new(hour: number, minute: number):ClockInterface;
}
function createClock(ctor: ClockConstructor, hour: number, minute: number):ClockInterface {
    return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
    constructor(h: number, m:number){};

    currentTime: Date = new Date();
    setTime(d: Date): void {
        this.currentTime = d;
    }
    tick(): void {
        console.log(`beep beep`);
    }
}
class AnalogClock implements ClockInterface{
    constructor(h: number, m:number){};
    currentTime: Date = new Date();
    setTime(d: Date): void {
        this.currentTime = d;
    }
    tick(): void {
        console.log(`beep beep`);
    }
}
const AnotherClock:ClockConstructor = class AnotherClock implements ClockInterface {
    constructor(h: number, m:number){};
    currentTime: Date = new Date();
    setTime(d: Date): void {
        this.currentTime = d;
    }
    tick(): void {
        console.log(`beep beep`);
    }
};
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 12, 17);

// 接口继承
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
let square:Square = <Square>{};
square.color = 'blue';
square.sideLength = 10;
square.penWidth = 5.0;

// 混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter():Counter {
    let counter:Counter = <Counter>function (start: number):string {
        return ''
    };
    counter.interval = 123;
    counter.reset = function () {};
    return counter;
}

let counter = getCounter();
counter(10);
counter.reset();
counter.interval = 5.0;

// 接口继承类
class Control {
    private state: any;
}
interface SelectableControl extends Control{
    select():void;
}
class Button extends Control implements SelectableControl{
    select(): void {
    }
}
class TextBox extends Control{
    select(): void {
    }
}
// SelectableControl 继承了 private 属性,仅子类可以实现
// class ImageClass implements SelectableControl{
//     select(): void {
//     }
// }
// Class 'ImageClass' incorrectly implements interface 'SelectableControl'.
// Property 'state' is missing in type 'ImageClass' but required in type 'SelectableControl'.

class LocationClass {
    constructor(){};
}
