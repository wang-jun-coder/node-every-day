
// Generics

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
    // @ts-ignore
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
    hasMask!: boolean;
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


export default {};
