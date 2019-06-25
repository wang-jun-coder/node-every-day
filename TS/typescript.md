## TypeScript


### 基础使用

#### 基本类型
```typescript
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
```
#### 变量声明

```typescript
// var, 与 js 保持一致, 变量提升, 函数作用域等
import get = Reflect.get;

var a:number = 10;
function f():string {
    var message:string = 'hello, world';
    return message;
}

// let & const 与 es6 一致
const hello:string = "hello";
// 块级作用域
function f1(input:boolean) {
    const a:number = 100;
    if (input) {
        let b:number = a +1;
        return  b;
    }
    //return  b; // Cannot find name 'b'.
}


// 重定义与屏蔽
// 这个函数中的所有 x声明 引用相同的 x
function f2(x:any) {
    var x;
    var x;
    if (true) {
        var x;
    }
}
// 块级作用域变量的获取
function f3() {
    let getCity = null;
    if (true) {
        const city = 'seattle';
        getCity = function () {
            return city;
        }
    }
    return getCity();
}


// const 声明, 但被赋值后不能再改变
const numLivesForCat = 9;
const kitty = {
    name: 'Aurora',
    numLives: numLivesForCat
};

//kitty = {} // Cannot assign to 'kitty' because it is a constant.
kitty.name = 'Rory';
kitty.numLives--; // 可设置const 属性为只读


// 解构数组
let input:[number, number] = [1, 2];
let [first, second] = input;
console.log(`${first} ${second}`); // 1, 2
// 交换变量
[first, second] = [second, first];
console.log(`${first} ${second}`); // 2, 1
// 函数参数
function f4([first, second]: [number, number]) {
    console.log(`${first} ${second}`); // 1, 2
}
f4(input);
// 剩余变量
let [, , third, ...rest] = [1, 2, 3, 4];
console.log(`${third} -- ${rest}`); // 3 -- 4
// 对象解构
let o = {
    a: 'foo',
    b: 12,
    c: 'bar'
};
let {a:a1, b} = o;
console.log(`${a1} -- ${b}`); // foo -- 12
let {a: a2, ...rest1} = o;
console.log(`${a2} -- ${JSON.stringify(rest1)}`); // foo -- {"b":12,"c":"bar"}
// 属性重命名
let {a: newName1, b: newName2}:{a: string, b: number} = o;
// 默认值
function f5(wholeObject: { a: string, b?: number }) {
    let {a, b=1001} = wholeObject;
}


// 函数声明
type C = {a:string, b?:number};
function f6({a, b}: C):void {}
function f7({a, b = 0} = {a: 'a'}) {
    console.log(`${a} ${b}`);
}
f7({a:'yes'}); // yes 0
f7(); // a 0
//f7({}); // Error:(98, 4) TS2345: Argument of type '{}' is not assignable to parameter of type '{ a: string; b?: number | undefined; }'.Property 'a' is missing in type '{}' but required in type '{ a: string; b?: number | undefined; }'.


// 展开
let first1 = [1, 2];
let second1 = [3, 4];
let bothPlus = [0, ...first1, ...second1, 5]; // [0, 1, 2, 3, 4, 5]
let defaults = {food: 'spicy', price:'$$', ambiance: 'noisy'};
let search = {...defaults, food: 'rich'};
console.log(search); // { food: 'rich', price: '$$', ambiance: 'noisy' }
search = {food: 'rich', ...defaults};
console.log(search); // { food: 'spicy', price: '$$', ambiance: 'noisy' }
// 对象展开仅包含自身可枚举属性, 比如: 展开一个对象实例, 会丢失其方法
class C1 {
    p = 12;
    s = 's';
    m() {

    }
}
let c1 = new C1();
let clone = {...c1};
console.log(`${clone.p} ${clone.s}`);
//clone.m(); // Property 'm' does not exist on type '{ p: number; }'.
```
### 接口

```typescript
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
```

### 类
```typescript
// 类
    // 继承
    class Animal {
        name: string = '';
        constructor(theName: string) {
            this.name = theName;
        }

        move(distanceMeters: number=0) {
            console.log(`animal move ${distanceMeters}`);
        }
    }
    class Dog extends Animal {
        bark() {
            console.log(`woof! woof!`);
        }
    }
    class Snake extends Animal{
        constructor(name: string) {
            super(name);
        }
        move(distanceMeters: number = 5) {
            console.log(`slithering...`);
            super.move(distanceMeters);
        }
    }
    class Horse extends Animal{
        constructor(name: string) {super(name)};
        move(distanceMeters: number = 45) {
            console.log(`galloping...`);
            super.move(distanceMeters);
        }
    }

    const dog = new Dog('dog');
    dog.bark();
    dog.move(10);
    dog.bark();

    let sam = new Snake('sammy the python');
    let tom: Animal = new Horse('tommy the palomino');
    sam.move();
    tom.move(34);


    // 修饰符
    // 默认 public
    class Animal2 {
        public name: string = '';
        public constructor(theName: string) {
            this.name = theName;
        }
        public move(distanceMeters: number) {
            console.log(`${this.name} move ${distanceMeters}`);
        }
    }
    // private, 不能在声明的类之外访问
    class Animal3 {
        private name: string = '';
        public constructor(theName: string) {
            this.name = theName;
        }
    }
    // (new Animal3('cat')).name; // Property 'name' is private and only accessible within class 'Animal3'.

    class Rhino extends Animal3{
        constructor() {
            super('rhino');
        }
    }
    class Employee {
        private name: string = '';
        constructor(theName: string) {
            this.name = theName;
        }
    }
    let animal = new Animal3('goat');
    let rhino = new Rhino();
    let employee = new Employee('bob');
    animal = rhino;
    // animal = employee; // Type 'Employee' is not assignable to type 'Animal3'.Types have separate declarations of a private property 'name'.

    // protected 与 private 类似, 但protected 成员在派生类中仍然可以访问
    class Person {
        protected name: string = '';
        // constructor(name: string) {this.name = name};
        protected constructor(name: string) {this.name = name};
    }
    class Employee1 extends Person{
        private department: string = '';
        constructor(name: string, department: string) {
            super(name);
            this.department = department;
        }
        public getElevatorPitch() {
            return `hello: my name is ${this.name} and I work in ${this.department}`;
        }
    }
    let howard = new Employee1('Hoeard', 'Sales');
    console.log(howard.getElevatorPitch());
    // console.log(howard.name); // Property 'name' is protected and only accessible within class 'Person' and its subclasses.
    // 当构造函数被 protect 时, 这个类不能在被包含它的类的外部实例化. 但是可以继承
    //let john = new Person('john'); // Constructor of class 'Person' is protected and only accessible within the class declaration.
    
    // readonly 修饰, readonly 修饰的属性,只能在声明或 构造函数内初始化
    class Octopus {
        readonly name: string = '';
        readonly  numberLength: number = 8;
        constructor(theName: string) {
            this.name = theName;
        }
    }
    let dad = new Octopus('man with the 8 strong legs');
    //dad.name = 'man with the 3-piece suit';  //  Cannot assign to 'name' because it is a read-only property.
    
    // 参数属性
    class Animal4 {
        constructor(private name: string){};
        move(distanceMeters: number){

        };
        getName(): string {
            return this.name;
        }
    }
    let animal4 = new Animal4('animal4');
    console.log(animal4.getName()); // animal4

    // 存取器
    class Employee2 {
        fullName: string = '';
    }
    let employee2 = new Employee2();
    employee2.fullName = `bob smith`;
    if (employee2.fullName) console.log(employee2.fullName);

    let passcode = `secret passcode`;
    class Employee3 {
        private _fullName: string = '';
        get fullname() {
            return this._fullName;
        }
        set fullName(newName: string) {
            if (passcode && passcode === 'secret passcode') {
                this._fullName = newName;
            } else {
                console.log(`Error: Unauthorized update of employee`);
            }
        }
    }
    let employee3 = new Employee3();
    employee3.fullName = `bob smith`;
    if (employee3.fullname) {
        console.log(employee3.fullname);
    }


    // 静态属性
    class Grid {
        static origin = {x:0, y:0};
        calculateDistanceFromOrigin(point:{x:number; y:number;}) {
            let xDistance = point.x - Grid.origin.x;
            let yDistance = point.y - Grid.origin.y;
            return Math.sqrt(xDistance*xDistance + yDistance*yDistance) / this.scale;
        }
        // 参数属性
        constructor(public scale: number){};
    }
    let grid1 = new Grid(1.0);
    let grid2 = new Grid(5.0);
    console.log(grid1.calculateDistanceFromOrigin({x:10, y:10}));
    console.log(grid2.calculateDistanceFromOrigin({x:10, y:10}));


    // 抽象类
    abstract class Animal5 {
        // 抽象方法不包含具体实现,且必须在派生类中实现
        abstract makeSound():void;
        move():void {
            console.log(`roaming the earth...`);
        }
    }

    abstract class Department {

        constructor(public name: string){};
        printName():void {
            console.log(this.name);
        }
        abstract printMeting():void;
    }

    class AccountingDepartment extends Department {
        constructor() {
            super('accounting and auditing');
        }

        printMeting(): void {
            console.log(`the accounting department meets each monday at 10am.`);
        }
        generateReports():void {
            console.log(`generating accounting reports...`);
        }
    }
    let department:Department;
    // department = new Department(); // Cannot create an instance of an abstract class.
    department = new AccountingDepartment();
    department.printMeting();
    department.printName();
    // department.generateReports(); // Property 'generateReports' does not exist on type 'Department'.

    // 类的构造函数
    class Greeter {
        static standardGreeting = 'hello, there';
        greeting?: string;
        constructor(message?: string) {
            this.greeting = message;
        }
        greet() {
            if (this.greeting) {
                return `hello, ${this.greeting}.`;
            } else {
                return Greeter.standardGreeting;
            }

        }
    }
    let greeter:Greeter;
    greeter = new Greeter('world');
    console.log(greeter.greet()); // hello, world.

    let greeter1 = new Greeter();
    console.log(greeter1.greet()); // hello, there

    let greeterMaker: typeof Greeter = Greeter;
    greeterMaker.standardGreeting = 'hey there';

    let greeter2: Greeter = new greeterMaker();
    console.log(greeter2.greet()); // hey there


    let Greeter1 = (function () {
        function Greeter1(this:object,message:string) {
            // this.greeting = message; // Property 'greeting' does not exist on type 'object'.
        }
        Greeter1.prototype.greet = function () {
            return `hello, ${this.greeting}.`;
        };
        return Greeter1;
    })();
    // let greeter3;
    // greeter3 = new Greeter1('world'); // 'new' expression, whose target lacks a construct signature, implicitly has an 'any' type.
    
    
    // 类当做接口使用
    class Point {
        x:number = 0;
        y:number = 0;
    }
    interface Point3d  extends Point{
        z:number;
    }
    let point3d: Point3d = {x:1, y:2, z:3};
```
