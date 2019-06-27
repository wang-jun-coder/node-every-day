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

#### 类
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

#### 函数

```typescript
// functions
    // named function
    function add(x:number, y:number):number {
        return x+y;
    }
    // anonymous
    let myAdd = function (x: number, y: number):number {
        return x+y;
    };
    let z = 100;
    function addToZ(x: number, y: number):number {
        return x+y+z;
    }


    // 函数类型
    // 函数类型包括参数类型 和 返回值类型, 参数仅匹配类型,不匹配变量名
    let myAdd1:(x:number, z:number)=>number = function (x:number, y:number):number {
        return x+y;
    };
    // 没有返回值需指定 void
    let printMsg:(msg:string)=>void = function (msg:string):void {
        console.log(msg);
    };


    // 可选参数和默认参数, 使用?表示
    // 可选参数必须跟在参数后面
    // 可选参数可以设置默认值(当没有传递此参数或者传递 undefined 时), 此时也标记此参数为可选参数
    // function buildName(firstName:string, lastName:string = 'smith):string {
    function buildName(firstName:string, lastName?:string):string {
        if (lastName) return `${firstName} ${lastName}`;
        return firstName;
    }
    let result1 = buildName('bob');
    let result2 = buildName('bob', 'adams');
    // let result3 = buildName('bob', 'adams', 'sr.'); // Expected 1-2 arguments, but got 3.
    // console.log(`${result1}\n${result2}`);

    // 剩余参数, 会被当做个数不限制的可选参数
    function buildName1(firstName: string, ...restOfNames: string[]):string {
        return `${firstName} ${restOfNames.join(' ')}`;
    }
    let buildName1Func:(firstName:string, ...rest:string[])=>string = buildName;


    // this and arrow function
    // js 中 this 的值, 在调用时才会被指定
    // 箭头函数能保存函数创建时的 this 值, 而不是调用值
    let deck = {
        suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        cards: Array(52),
        createCardPicker: function () {
            return ()=> {
                let pickedCard = Math.floor(Math.random()*52);
                let pickedSuit = Math.floor(pickedCard/13);
                return {suit: this.suits[pickedSuit], card: pickedCard%13};
            }
        }
    };
    let cardPicker = deck.createCardPicker();
    let pickCard = cardPicker();
    console.log(`card: ${pickCard.card} of ${pickCard.suit}`);

    // this 参数, 这是一个假参数, 出现在参数列表最前方
    function f(this: void) {
        // 确保 this 不可用
        // this.a = 'a'; // Property 'a' does not exist on type 'void'.
    }
    interface Card {
        suit: string;
        card: number;
    }
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this:Deck):()=>Card;
    }
    let deck1:Deck = {
        suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        cards: Array(52),
        createCardPicker:function (this: Deck) {
            return ()=>{
                let pickedCard = Math.floor(Math.random()*52);
                let pickedSuit = Math.floor(pickedCard/13);
                return {suit: this.suits[pickedSuit], card: pickedCard%13};
            }
        }
    };

    // 回调函数中的 this
    interface UIElement {
        addClickListener(onClick:(this:void, e:Event) => void):void;
    }
    class Event {
        constructor(public type:string){};
    }
    class Handler {
        info: string = '';
        onClickBad(this:Handler, e:Event) {
            this.info = e.type;
        }
        onClickGood(this: void, e:Event) {
            console.log(`on click`);
        }
        onClickGoodWithThis = (e:Event) => {
            this.info = e.type;
            console.log(this.info);
        };

    }
    let h = new Handler();
    let uiElement:UIElement = {
        addClickListener(onClick:(this:void, e:Event)=>void):void{
            setTimeout(() => {
                onClick(new Event('click'));
            });
        }
    };
    // uiElement.addClickListener(h.onClickBad); // Argument of type '(this: Handler, e: Event) => void' is not assignable to parameter of type '(this: void, e: Event) => void'. The 'this' types of each signature are incompatible. Type 'void' is not assignable to type 'Handler'.
    uiElement.addClickListener(h.onClickGood);
    uiElement.addClickListener(h.onClickGoodWithThis);


    // 重载
    let suits =  ['hearts', 'spades', 'clubs', 'diamonds'];
    // 重载对象 重载数字
    function pickCard2(x: { suit: string; card: number }[]):number;
    function pickCard2(x: number) :{suit: string; card: number};
    function pickCard2(x:any):any {
        if (typeof x === 'object') {
            return Math.floor(Math.random() * x.length);
        } else if (typeof x === 'number') {
            let pickSuit = Math.floor(x/13);
            return {suit:suits[pickSuit], card: x%13};
        }
    }
    let myDeck = [{suit:'diamonds', card:2}, {suit:'spades', card:10}, {suit:'hearts', card:4}];
    let pickCard21 = myDeck[pickCard2(myDeck)];
    let pickCard22 = pickCard2(15);
    console.log(pickCard21);
    console.log(pickCard22);
    //let pickCard23 = pickCard2('xx'); // Argument of type '"xx"' is not assignable to parameter of type 'number'.
    //let pickCard24 = pickCard2([{suit:'diamonds'}]); // Argument of type '{ suit: string; }[]' is not assignable to parameter of type 'number'.

```
#### 泛型

```typescript
    // 泛型例子
    import get = Reflect.get;

    function identity(arg: number):number {
        return arg;
    }
    function identity1(arg: any):any {
        return arg;
    }
    // 使用类型变量 T 收集输入的参数类型,返回相同的类型
    function identity2<T>(arg:T):T {
        return arg;
    }
    let output = identity2<string>('myString');
    let output1:string = identity2('myString');
    //let output2:number = identity2('myString'); // Type '"myString"' is not assignable to type 'number'.


    // 使用泛型变量
    function loggingIdentity<T>(arg: T):T {
        //console.log(arg.length); // Property 'length' does not exist on type 'T'.
        return arg;
    }
    // function loggingIdentity1<T>(arg: T[]):T[] {
    function loggingIdentity1<T>(arg: Array<T>):Array<T> {
        console.log(arg.length);
        return arg;
    }


    // 泛型类型
    // 可以使用不同的泛型参数名,只要数量和使用方式可以对应
    let myIdentity: <U>(arg:U) => U = identity2;
    // 也可以使用带有调用签名的对象字面量来定义的泛型函数
    let myIdentity1: {<T>(args:T):T} = identity2;

    // 泛型接口
    interface GenericIdentityFn {
        <T>(arg:T):T;
    }
    let myIdentity2:GenericIdentityFn = identity2;

    // 指定泛型类型
    interface GenericIdentityFn1<T> {
        (arg: T): T;
    }
    let myIdentity3:GenericIdentityFn1<number> = identity2;
    identity2('xx');
    //myIdentity3('xx'); // Argument of type '"xx"' is not assignable to parameter of type 'number'.


    // 泛型类(无法创建泛型枚举和泛型命名空间)
    class GenericNumber<T> {
        zeroValue:T;
        add:(x: T, y:T) => T;
    }
    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function (x, y) {
        return x+y;
    };

    let myGenericNumberString = new GenericNumber<string>();
    myGenericNumberString.zeroValue = '';
    myGenericNumberString.add = function (x, y) {
        return x+y;
    };
    console.log(myGenericNumberString.add(myGenericNumberString.zeroValue, 'test'));


    // 泛型约束
    interface Lengthwise {
        length:number
    }
    // 约束输入类型至少包含 .length 属性, 若不包含则报错
    function loggingIdentity2<T extends Lengthwise>(arg:T):T {
        console.log(arg.length);
        return arg;
    }
    //loggingIdentity2(3); // Argument of type '3' is not assignable to parameter of type 'Lengthwise'.


    // 泛型约束中使用类型参数
    function getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }
    let x = {a:1, b:2, c:3, d:4};
    getProperty(x, 'a');
    //getProperty(x. 'm'); //Identifier expected.


    // 在泛型中使用类类型
    // 泛型创建工厂函数时, 需引用构造函数的类类型
    function create<T>(c:{new (): T}): T {
        return new c();
    }

    // 例如
    class BeeKeeper {
        hasMask: boolean;
    }
    class ZooKeeper {
        nameTag: string;
    }
    class Animal {
        numLegs: number;
    }
    class Bee extends Animal{
        keeper: BeeKeeper;
    }
    class Lion extends Animal {
        keeper: ZooKeeper;
    }
    // 使用原型属性推断并约束构造函数与类实例的关系
    function createInstance<A extends Animal>(c: new() => A): A {
        return new c();
    }
    // 输入类型创建出的实例与输入类型保持一致, 可以直接进行类型推断
    let nameTag = createInstance(Lion).keeper.nameTag;
    let hasMask = createInstance(Bee).keeper.hasMask;
```
#### 枚举
```typescript
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
```

#### 类型推断
```typescript
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
```

#### 类型兼容
```typescript
// ts 类型兼容基于结构子类型
  interface Named {
    name: string;
  }
  class Person {
    name: string
  }
  let p: Named;
  p = new Person();
  // p = {}; // Property 'name' is missing in type '{}' but required in type 'Named'

  // 基本规则: 如果x要兼容y，那么y至少具有与x相同的属性
  let x: Named;
  let y = {
    name: 'alice',
    location: 'seattle'
  }
  x = y;
  function greet(n: Named): void {
    console.log(`hello ${n.name}`);
  } 
  greet(y);

  // 比较两个函数
  let f1:(a: number) => 0;
  let f2:(a: number, s: string) => 0;
  // f1 的参数列表,在f2 中都能找到对应类型的参数
  f2 = f1;
  // f2 的参数 s 在 f1 中找不到对应类型参数, 所以报错
  //f1 = f2; // 不能将类型“(a: number, s: string) => 0”分配给类型“(a: number) => 0“
  
  // 如:
  let items = [1, 2, 3];
  items.forEach((item, index, array) => console.log(item));
  items.forEach((item) => console.log(item));
  // 返回值
  let f3 = () => ({name: 'alice'});
  let f4 = () => ({name: 'alice', location: 'seattle'});
  f3 = f4;
  // f4 返回值需要一个 location 属性, f3 返回值没有
  //f4 = f3; // 不能将类型“() => { name: string; }”分配给类型“() => { name: string; location: string; }”。Property 'location' is missing in type '{ name: string; }' but required in type '{ name: string; location: string; }'


  // 函数参数双向协变
  enum EventType {
    Mouse, Keyboard,
  }
  interface Event {
    timestamp: number;
  }
  interface MouseEvent extends Event {
    x: number;
    y: number;
  }
  interface KeyEvent extends Event {
    keyCode: number;
  }
  function listenEvent(eventType:EventType, handle:(n:Event)=>void) {

  }
  // 最常用
  listenEvent(EventType.Mouse, (e:MouseEvent):void => console.log(`${e.x},${e.y}`));
  // 也可以
  listenEvent(EventType.Mouse, (e: Event):void => console.log(`${(<MouseEvent>e).x}, ${(<MouseEvent>e).y}`));
  listenEvent(EventType.Mouse, <(e:Event)=>void>((e: MouseEvent) => console.log(`${e.x}, ${e.y}`)));

  // number 不是 event 的子类, 故不能转换
  //listenEvent(EventType.Mouse, (e:number) => console.log(e)); // 类型“(e: number) => void”的参数不能赋给类型“(n: Event) => void”的参数。参数“e”和“n” 的类型不兼容。不能将类型“Event”分配给类型“number”


  // 可选参数和剩余参数
  function invokeLater(args: any[], callback: (...args: any[]) => void) {
    setTimeout(() =>callback(...args), 1);
  }
  invokeLater([1, 2], (x, y) => console.log(`${x}, ${y}`));
  invokeLater([1, 2], (x?, y?) => console.log(`${x}, ${y}`));

  // 枚举, 枚举类型与数字类型互相兼容, 不同枚举类型之间不兼容
  enum Status {Ready, Waitting};
  enum Color { Red, Blue, Green};
  let status = Status.Ready;
  status = 1;
  let status1 = 1;
  status1 = Status.Ready;
  //status = Color.Green; // 不能将类型“Color.Green”分配给类型“Status”。
  
  // 泛型
  interface Empty<T> {

  }
  let x1: Empty<number>;
  let y1: Empty<string>;
  // 二者结构相同,可以赋值
  x1 = y1;
  interface Empty1<T> {
    data: T  
  }
  let x2: Empty1<number>;
  let y2: Empty1<string>;
  // 此时 data 属性的类型不一致, 故不能替换
  // x2 = y2; // 不能将类型“Empty1<string>”分配给类型“Empty1<number>”。不能将类型“string”分配给类型“number”。
  // 未指定泛型类型的泛型参数时, 会将所有泛型参数当做 any 比较
  let identity = function<T>(x:T):T {
    return x;
  }
  let reverse = function<U>(x:U):U {
    return x;
  }
  identity = reverse;
```
