
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
export default {};
