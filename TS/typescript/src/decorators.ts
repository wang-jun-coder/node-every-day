// 装饰器是一种特殊类型的声明, 可以附加到类声明方法,访问符,属性或参数上
// 装饰器使用@expression 这种像是, expression 求值后必须为一个函数, 运行时会被调用, 被装饰的生命信息作为参数传入
// function sealed(target:any) {
// }

// 装饰器工厂
// 若定制一个修饰器如何应用到一个声明上, 需要一个装饰器工厂函数
// 装饰器工厂函数就是一个简单的函数, 返回一个表达式供装饰器在运行时使用
function color(value: string) { // 装饰器工厂
  return function(target:object) { // 装饰器

  }
}

// 装饰器组合
// 多个装饰器可以同时应用到一个声明上, 可以写在一行也可以多行
// 多个装饰器应用到一个声明上,其求值方式与复合函数相似
// 此时 TS 会进行如下步骤, 1. 由上至下依次对装饰器表达式求值, 2. 求值结果会被当做函数, 由上至下依次调用
function f() {
  console.log("f(): evaluated");
  return function(target:any, propertyKey:string, descriptor: PropertyDescriptor) {
    console.log("f(): called");
  }
}
function g() {
  console.log("g(): evaluated");
  return function(target:any, propertyKey:string, descriptor: PropertyDescriptor) {
    console.log("g(): called");
  }
}

class C {
  @f()
  @g()
  method() { }
}

// 装饰器求值
// 1. 参数装饰器, 然后依次是: 方法装饰器, 访问符装饰器, 或者属性装饰器应用到每个实例成员
// 2. 参数装饰器, 然后依次是: 方法装饰器, 访问符装饰器, 或者属性装饰器应用到每个静态成员
// 3. 参数装饰器应用到构造函数
// 4. 参数装饰器应用到类

// 类装饰器
@sealed 
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `hello, ${this.greeting}`
  }
}
// 密封构造函数和其原型
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// 重载构造函数
function classDecorator<T extends {new (...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
    newProperty = "new Property";
    hello = "override";
  }
}

@classDecorator
class Greeter1 {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}
console.log(new Greeter1("world"));  // Greeter1 {property: 'property', hello: 'override', newProperty: 'new Property' }

// 方法装饰器
// 方法装饰器声明在一个方法的声明之前, 会被应用到方法的属性描述性上
// 方法装饰器表达式会在运行时当做函数被调用, 传入三个参数, 1. 对于静态成员是类的构造函数, 对于实例成员, 是类的原型对象, 2. 成员名字, 3, 成员属性描述符
// 注意: 目标版本 ES5, 若方法装饰器返回一个值, 其值会被作为方法的属性描述符
class Greeter2 {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @enumerable(false)
  greet() {
    return `hello, ${this.greeting}`;
  }
}
function enumerable(value: boolean) {
  console.log("enumerable evaluate");
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("enumerable called");
    descriptor.enumerable = value;
  }
}
let g2 = new Greeter2("world");
console.log(g2.greet());
console.log(g2.greet());
// 访问装饰器
// 声明在访问器的声明之前, 注意: ts 不允许同时装饰一个成员的 get 和 set 装饰器
// 访问器表达式在运行时当做函数被调用, 传入下列三个参数, 1. 对于静态函数成员是类的构造函数, 实例成员是类的原型对象. 2. 成员名字, 3. 成员的属性描述符
// 若装饰器返回一个值, 会被用作方法的属性描述符
class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y:number) {
    this._x = x;
    this._y = y;
  }
  @configurable(false)
  get x() { return this._x };
  
  @configurable(false)
  get y() { return this._y };
}
function configurable(value: boolean) {
  return function(target:any, propertyKey:string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  }
}

// 属性装饰器
// 紧靠属性声明, 运行时当做函数调用, 传入下列两个参数, 1. 对于静态成员是类构造函数, 对于实例成员是类原型对象, 2, 成员名字
// 注意: 属性描述符不会作为参数传入, 返回值也会忽略, 这点与访问装饰器不同
import "reflect-metadata";
import symbol from "./symbol";
const formatMetadataKey = Symbol("format");
function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target:any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter3 {
  @format("hello, %s")
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}

let g3 = new Greeter3("world");
console.log(g3.greet());

// 参数装饰器
// 紧靠着参数声明, 运行时当做函数调用, 传入下列三个参数: 1. 对于静态成员是类的构造函数, 实例成员是类的原型对象, 2. 成员名字, 3, 参数在函数参数列表中的索引
// 参数装饰器只能用来监视一个方法的参数是否被传入, 函数返回值会被忽略
const requireMetadataKey = Symbol("required");
function required(target:object, propertyKey: string | symbol, parameteerIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requireMetadataKey, target, propertyKey) ||[];
  existingRequiredParameters.push(parameteerIndex);
  Reflect.defineMetadata(requireMetadataKey, existingRequiredParameters, target, propertyKey);
}
function validate(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  let method = descriptor.value;
  descriptor.value = function() {
    let requiredParameters:number[] = Reflect.getOwnMetadata(requireMetadataKey, target, propertyName);
    if(requiredParameters) {
      for(let parameterIndex of requiredParameters) {
        if(parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error("missing required argument.");
        }
      }
    }
    return method.apply(this, arguments);
  }
}
class Greeter4 {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @validate
  Greeter(@required name?: string) {
    return `hello ${name}, ${this.greeting}`;
  }
}
let g4 = new Greeter4("world");
// g4.Greeter(); //运行时报错 missing required argument
g4.Greeter("somebody");


// 元数据, 实验性功能
import "reflect-metadata";

function validate1<T>(target:object, propertyKey: string, description: TypedPropertyDescriptor<T>) {
  let set = description.set;
  console.log(description);
  description.set = function(value: T) {
    let type = Reflect.getMetadata("design:type", target, propertyKey);
    console.log(type);
    if(!(value instanceof type)) {
      throw new TypeError("Invalid type.");
    }
    set!.call(target, value);
  }
}

class Point1 {
  x: number;
  y: number;
}
class Line {
  private _p0: Point1;
  private _p1: Point1;

  @validate1
  set p0(value: Point1) { this._p0 = value };
  get p0() { return this._p0 };

  @validate1
  set p1(value: Point1) { this._p1 = value };
  get p1() { return this._p1 };
}

let l = new Line();
// l.p0 = {} as Point1; // Invalid type

// 相当于
class Line1 {
  private _p0: Point1;
  private _p1: Point1;

  @validate1 
  @Reflect.metadata("design:type", Point1)
  set p0(value: Point1) { this._p0 = value };
  get p0() { return this._p0 };

  @validate1 
  @Reflect.metadata("design:type", Point1)
  set p1(value: Point1) { this._p1 = value };
  get p1() { return this._p1 };
}

let l1 = new Line1();
l1.p0 = {} as Point1; // Invalid type