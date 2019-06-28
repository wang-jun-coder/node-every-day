namespace AdvancedTypesNameSpace {

  // 交叉类型, 将多个类型合并为一个类型, 包好了所需所有类型的特性
  function extend <First, Second>(first: First, second: Second): First & Second {
    
    const result: Partial<First & Second> = {};
    for (const prop in first) {
      // if (first.hasOwnProperty(prop)) {
      if (first[prop] !== undefined) {
          (<First>result)[prop] = first[prop];
      }
    }
    for (const prop of Object.getOwnPropertyNames(second)) {
        // if (second.hasOwnProperty(prop)) {
          if (second[prop] !== undefined) {
            (<Second>result)[prop] = second[prop];
        }
    }
    return <First & Second>result;
  }

  class Person {
    constructor(public name: string){};
  }
  interface Loggable {
    log(name:string):void;
  }
  class ConsoleLogger implements Loggable {
    log(name: string) {
      console.log(`hello, I'm ${name}`);
    }
  }
  const jim = extend(new Person('jim'), ConsoleLogger.prototype);
  jim.log(jim.name);


  // 联合类型
  function padLeft(value: string, padding:string | number) {
    if(typeof padding === 'number') {
      return Array(padding + 1).join(' ') + value;
    }
    if(typeof padding === 'string') {
      return padding + value;
    }
    throw new Error(`Expectd string or number, got ${padding}`);
  }
  padLeft('string', 1);
  padLeft('string', '1');
  //padLeft('string', true); // 类型“true”的参数不能赋给类型“string | number”的参数。

  class Bird {
    fly():void{};
    layEggs():void{};
  }
  class Fish {
    swim():void{};
    layEggs():void{};
  }
  function getSmallPet(): Fish | Bird {
    if(Math.random()>0.5) {
      return new Fish();
    }
    return new Bird();
  }
  // 返回的联合类型,只能使用共通属性
  let pet = getSmallPet();
  pet.layEggs();
  //pet.swim(); // 类型“Bird | Fish”上不存在属性“swim”。类型“Bird”上不存在属性“swim”


  // 类型守卫与类型区分
  // 如:
  if((<Fish>pet).swim) {
    (<Fish>pet).swim();
  } else {
    (<Bird>pet).fly();
  }
  // 用户自定义的类型守卫
  function isFish(pet: Fish | Bird):pet is Fish {
    return (<Fish>pet).swim !== undefined;
  }
  if(isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }

  // typeof 类型守卫
  function isNumber(x:any): x is number {
    return typeof x === 'number';
  }
  function isString(x:any): x is string {
    return typeof x === 'string';
  }
  function padLeft1(value: string, padding: string | number) {
    if(isNumber(padding)) {
      return Array(padding+1).join(' ') + value;
    }
    if(isString(padding)) {
      return padding + value;
    }
    throw new Error(`Expect string or number, got '${padding}'`);
  }
  // 基础类型判断, ts 可以将其识别为一个类型守卫
  // 注意: typeof类型守卫只有两种形式能被识别 typeof v === "typename"和typeof v !== "typename"，"typename"必须是"number"，"string"，"boolean"或"symbol"
  function padLeft2(value: string, padding: string | number) {
    if(typeof padding === 'number') {
      return Array(padding + 1).join(' ') + value;
    }
    if(typeof padding === 'string') {
      return padding + value;
    }
    throw new Error(`Expect string or number, got '${padding}'`);
  }

  // instance 守卫
  interface Padder {
    getPaddingString():string;
  }
  class SpaceRepeatingPadder implements Padder {
    constructor(private numSpace:number){};
    getPaddingString():string {
      return Array(this.numSpace+1).join(' ');
    }
  }
  class StringPadder implements Padder {
    constructor(private value: string){};
    getPaddingString():string {
      return this.value;
    }
  }
  function getRandomPadder():Padder {
    return Math.random() < 0.5 ? new SpaceRepeatingPadder(4) : new StringPadder('  ');
  }
  let padder: Padder = getRandomPadder();
  let spacePadder:SpaceRepeatingPadder;
  let stringPadder: StringPadder;
  // spacePadder = padder; // Property 'numSpace' is missing in type 'Padder' but required in type 'SpaceRepeatingPadder'.
  // stringPadder = padder; // Property 'value' is missing in type 'Padder' but required in type 'StringPadder'.
  if(padder instanceof SpaceRepeatingPadder) {
    spacePadder = padder; // ts 识别类型守卫, 此段代码内 padder 认为 SpaceRepeatingPadder 类型
  }
  if(padder instanceof StringPadder) {
    stringPadder = padder;
  }

  // 可为 null 的类型
  // strictNullChecks 开启时, null 和 undefined 不在是可以赋值给任何类型的了
  // 此时可以通过联合类型处理
  let s = 'foo';
  //s = null; // 不能将类型“null”分配给类型“string”
  let sn: string | null = 'bar';
  sn = null;
  //sn = undefined; // 不能将类型“undefined”分配给类型“string | null”

  // 可选参数和可选属性
  function f(x:number, y?:number){
    return x+ (y || 0);
  }
  f(1, 2);
  f(1);
  f(1, undefined);
  //f(1, null); // 类型“null”的参数不能赋给类型“number | undefined”的参数。

  class C {
    a: number;
    b?:number;
  }
  let c = new C();
  c.a = 12;
  // c.a = undefined; // 不能将类型“undefined”分配给类型“number”
  c.b = 13;
  c.b = undefined;
  // c.b = null; // 不能将类型“null”分配给类型“number | undefined”

  // 类型守卫和类型断言
  function f1(sn:string | null):string {
    // return sn || 'default'; 
    if(sn == null) {
      return 'default';
    } else {
      return sn;
    }
  }
  function broken(name: string | null):string {
    function postfix(epithet: string) {
      // return name.charAt(0) + '.  the' + epithet; // 对象可能为 "null"。
      // 使用 ! 移除 null
      return name!.charAt(0) + '.  the' + epithet;
    }
    name = name || 'Bod';
    return postfix('greate');
  }

  // 类型别名
  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;
  function getName(n: NameOrResolver):Name {
    if(typeof n === 'string') {
      return n;
    } 
    return n();
  }
  // 别名仅是使用新名字引用类型, 类型别名也可以是泛型, 也可以在属性中引用自己
  type Container<T> = {value:T};
  type Tree<T> = {
    value:T;
    left: Tree<T>;
    right: Tree<T>;
  }
  // 也可以与交叉类型一起使用
  type LinkList<T> = T & {next: LinkList<T>};
  interface Person {
    name: string
  }
  let people: LinkList<Person>;
  // 此处仅是为了消除警告, 实际上 people 未初始化, 下面调用会报错
  let s1 = people!.name;
  let s2 = people!.next.name;
  let s3 = people!.next.next.name;
  // type Yikes = Array<Yikes>;  // 类型别名“Yikes”循环引用自身。

  // 接口 vs 类型别名
  // 错误信息不会使用别名
  // 类型别名不能被 extend 和 implement, 自己也不能 extend 和 implement 其他类型
  // 一般使用接口替代类型别名, 如果无法通过接口描述或需要使用联合类型或元组类型时, 可以使用类型别名
  type Alias = { num: number };
  interface Interface { num: number };
  declare function aliased(arg:Alias):Alias;
  declare function interfaced(arg:Interface):Interface;


  // 字符串字面量类型
  type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
  class UIElement {
    animate(dx: number, dy:number, easing:Easing) {
      if('ease-in' === easing) {

      } else if('ease-out' === easing) {

      } 
      // This condition will always return 'false' since the types '"xx"' and '"ease-in-out"' have no overlap
      //else if ('xx' === easing){}
      else {

      }
    }
  }
  let button = new UIElement();
  button.animate(0, 0, 'ease-in');
  //button.animate(0, 0, 'uneasy'); // 类型“"uneasy"”的参数不能赋给类型“Easing”的参数。

  // 字符串字面量还可以用于区分函数重载
  function createElment(tagName: 'img'):HTMLImageElement;
  function createElment(tagName: 'input'):HTMLInputElement;
  function createElment(tagName: string):Element {
    if(tagName === 'img') return new HTMLImageElement();
    if(tagName === 'input') return new HTMLInputElement();
    return new Element();
  }

  // 数字字面量类型
  function rollDice(): 1 |2 |3 |4 | 5| 6 {
    return 1;
  }
  function foo(x: number) {
    // This condition will always return 'true' since the types '1' and '2' have no overlap
    // if(x !== 1 || x !== 2) {}
  }

  // 可辨识联合
  interface Square {
    kind: 'square';
    size: number;
  }
  interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
  }
  interface Circle {
    kind:'circle';
    radius: number;
  }

  type Shape = Square | Rectangle | Circle;
  function area(s: Shape) {
    switch (s.kind) {
      case 'square': return s.size * s.size;
      case 'rectangle': return s.width * s.height;
      case 'circle': return Math.PI * s.radius ** 2;
      // 类型“"circle:"”不可与类型“"square" | "rectangle" | "circle"”进行比较
      // case 'circle:': return Math.PI * s.radius ** 2;
    }
  }

  //  完整性检查
  interface Triangle {
    kind: 'triangle';
  }
  type Shape1 = Square | Rectangle | Circle | Triangle;
  function area1(s: Shape1):number {
    switch (s.kind) {
      case 'square': return s.size * s.size;
      case 'rectangle': return s.width * s.height;
      case 'circle': return Math.PI * s.radius ** 2;
      // 当遗漏条件时, ts 可以检测出错误 , 函数缺少结束返回语句，返回类型不包括 "undefined"
      case 'triangle': return 0; 
    }
  }

  function assertNever(x: never):never {
    throw new Error(`Unexpect object: ${x}`);
  }
  function area2(s: Shape1) {
    switch (s.kind) {
      case 'square': return s.size * s.size;
      case 'rectangle': return s.width * s.height;
      case 'circle': return Math.PI * s.radius ** 2;
      // 当遗漏 triangle 条件时, ts 会报错. 类型“Triangle”的参数不能赋给类型“never”的参数。ts(2345)
      case 'triangle': return 0;
      default: assertNever(s);
    }
  }

  // 多态的 this 类型
  class BasicCalculator {
    public constructor(protected value:number = 0){};
    public currentValue():number {
      return this.value;
    }
    public add(operand: number):this {
      this.value += operand;
      return this;
    }
    public multiply(operand: number):this {
      this.value *= operand;
      return this;
    }
  }
  let v = new BasicCalculator(2).multiply(5).add(6).currentValue();
  class ScientificCalculator extends BasicCalculator {
    public sign() {
      this.value = Math.sign(this.value);
      return this;
    }
  }
  // 如果没有 this 类型,则父类子类不兼容, 无法达成下面的效果
  let v1 = new ScientificCalculator(3).multiply(5).sign().add(1).currentValue();


  // 索引类型
  // 从对象中选取属性子集
  function pluck<T, K extends keyof T>(o:T, names:K[]):T[K][] {
    return names.map(n => o[n]);
  }

  interface Person {
    name: string;
    age: number;
  }
  let person:Person = {
    name: 'jarid',
    age:35
  };
  let strings:string[] = pluck(person, ['name']);
  // let strings1:string[] = pluck(person, ['name', '']); // 不能将类型“string”分配给类型“"name" | "age"”
  
  function getProperty<T, K extends keyof T>(o:T, name: K):T[K] {
    return o[name];
  }
  let name: string = getProperty(person, 'name');
  let age: number = getProperty(person, 'age');
  // name = getProperty(person, 'age'); // 不能将类型“number”分配给类型“string”。
  // let unknown = getProperty(person, 'unknown'); // 类型“"unknown"”的参数不能赋给类型“"name" | "age"”的参数

  // 索引类型和字符串索引签名
  interface Dictionary<T> {
    [key: string]: T;
  }
  let keys: keyof Dictionary<number>; // let keys: string | number
  let value: Dictionary<number>['foo']; // let value: number


  // 映射类型
  type Readonly<T> = {
    readonly [P in keyof T] : T[P];
  }
  type Partial<T> = {
    [P in keyof T]?:T[P];
  }
  type PersonPartial = Partial<Person>;
  type ReadonlyPerson = Readonly<Person>;
  // 若要添加额外成员
  type PartialWithNewMember<T> = {
    [P in keyof T]: T[P];
  } & {newMember: boolean;};

  // 最简单的映射类型
  type Keys = 'option1' | 'option2';
  type Flags = { [K in Keys]: boolean}; // 等同于 type Flags = { option1: boolean;option2: boolean; }

  type NullablePerson = { [P in keyof Person]: Person[P] | null};
  type PartialPerson = { [P in keyof Person]?: Person[P]};
  type Nullable<T> = {[K in keyof T]: T[K] | null};
  type Partial1<T> = {[K in keyof T]?:T[K]};

  //另一个例子
  type Proxy<T> = {
    get():T;
    set(value:T):void;
  }
  type Proxify<T> = {
    [P in keyof T]: Proxy<[T[P]]>;
  }
  function proxify<T>(o:T):(Proxify<T>) {
    let x:Proxify<T>;
    // 强制指定非空, 避过编译器检测, 实际执行有问题
    return x!;
  }
  type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>;
  // Record并不需要输入类型来拷贝属性，所以它不属于同态,  非同态类型本质上会创建新的属性，因此它们不会从它处拷贝属性修饰符

  // 由映射类型推断
  function unproxify<T>(t:Proxify<T>):T {
    let result = {} as T;
    for (const k in t) {
      t[k].get();
    }
    return result;
  }

  // 有条件类型
  declare function f22<T extends boolean>(x: T): T extends true ? string : number;
  let x = f22(Math.random() < 0.5); // let x: string | number

  type TypeName<T> = 
   T extends string ? 'string' :
   T extends number ? 'number' :
   T extends boolean ? 'boolean' :
   T extends undefined ? 'undefined' :
   T extends Function ? 'function' :
   'object';

   // 有条件类型解析
   type T0 = TypeName<string>; // type T0 = "string"
   type T1 = TypeName<'a'>; // type T1 = "string"
   type T2 = TypeName<true>; // type T2 = "boolean"
   type T3 = TypeName<()=>void>; // type T3 = "function"
   type T4 = TypeName<string[]>; // type T4 = "object"

   // 有条件类型延迟解析
   interface Foo {
     propA: boolean;
     propB: boolean;
   }

   declare function f33<T>(x:T):T extends Foo ? string : number;
   function foo1<U>(x:U) {
      let a = f33(x);
      let b:string | number = a;
   }

   // 分布式有条件类型, 分布式有条件类型在实例化时会自动分发成联合类型
   type T10 = TypeName<string | (()=>void)>; // type T10 = "string" | "function"
   type T12 = TypeName<string | string[] | undefined>; // type T12 = "string" | "undefined" | "object"
   type T11 = TypeName<string[] | number[]>; // type T11 = "object"

   type BoxedValue<T> = {value: T};
   type BoxedArray<T> = {array: T[]};
   type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;
   type T20 = Boxed<string>;  // type T20 = {value: string;}
   type T21 = Boxed<number[]>; //  type T21 = {array: number[];}
   type T22 = Boxed<string | number[]>; //type T22 = BoxedValue<string> | BoxedArray<number>

   // 过滤联合类型
   type Diff<T, U> = T extends U ? never : T;
   type Filter<T, U> = T extends U ? T : never;
   type T30 = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // type T30 = "b" | "d"
   type T31 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // type T31 = "a" | "c"
   type T32 = Diff<string | number | (() => void), Function>; // type T32 = string | number
   type T33 = Filter<string | number | (() => void), Function>; // type T33 = () => void

   type NonNullable<T> = Diff<T, null | undefined>; // type NonNullable<T> = T extends null | undefined ? never : T
   type T34 = NonNullable<string | number | undefined>; // type T34 = string | number
   type T35 = NonNullable<string | string[] | null | undefined>; // type T35 = string | string[]

   function f2<T>(x: T, y:NonNullable<T>) {
      x=y;
      //y=x; // 不能将类型“T”分配给类型“Diff<T, null | undefined>”。ts(2322)
   }
   function f3<T extends string | undefined>(x: T, y:NonNullable<T>) {
     x = y;
     //y = x; // 不能将类型“T”分配给类型“Diff<T, null | undefined>”。
     //let s1: string = x; // 不能将类型“T”分配给类型“string”。
     let s2: string = y;
   }

   // 有条件类型与映射类型结合
   type FunctionPropertyNames<T> = {
     [K in keyof T]: T[K] extends Function ? K : never
    }[keyof T];
    type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
    type NonFunctionPropertyNames<T> = {
      [K in keyof T] : T[K] extends Function ? never : K;
    }[keyof T];
    type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

    interface Part {
      id: number;
      name: string;
      subparts: Part[];
      updatePart(newName: string):void;
    }
    type T40 = FunctionPropertyNames<Part>; // type T40 = "updatePart"
    type T41 = NonFunctionPropertyNames<Part>; // type T41 = "id" | "name" | "subparts"
    type T42 = FunctionProperties<Part>; // type T42 = {updatePart: (newName: string) => void;}
    type T43 = NonFunctionProperties<Part>; //  type T43 = {id: number;name: string;subparts: Part[];}

    // 和联合类型交叉类型相似, 有条件类型不允许递归自己
    //type ElementType<T> = T extends any[] ? ElementType<T[number]> : T; // 类型别名“ElementType”循环引用自身。ts(2456)

    // 有条件类型中的类型推断
    type ReturnType1<T> = T extends (...args: any[]) => infer R ? R : any;
    type Unpacked<T> = 
      T extends (infer U)[] ? U :
      T extends (...args: any[]) => infer U ? U :
      T extends Promise<infer U> ? U :
      T;
    type T50 = Unpacked<string>; // type T50 = string
    type T51 = Unpacked<string[]>; // type T51 = string
    type T52 = Unpacked<() => string>; // type T52 = string
    type T53 = Unpacked<Promise<string>>; // type T53 = string
    type T54 = Unpacked<Promise<string>[]>; // type T54 = Promise<string>
    type T55 = Unpacked<Unpacked<Promise<string>[]>>; // type T55 = string
    // 协变位置上，同一个类型变量的多个候选类型会被推断为联合类型
    type Foo2<T> = T extends { a: infer U, b: infer U} ? U : never;
    type T60 = Foo2<{a: string, b: string }>; // type T60 = string
    type T61 = Foo2<{a: number, b: string}>; // type T61 = string | number
    // 抗变位置上，同一个类型变量的多个候选类型会被推断为交叉类型：
    type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U)=>void} ? U : never;
    type T70 = Bar<{
      a: (x: string)=>void, b:(x: string)=>void;
    }>;// type T70 = string
    type T71 = Bar<{
      a: (x: string)=>void, b:(x: number)=>void;
    }>;// type T71 = string & number

    // 多个调用签名(如: 函数重载), 用最后的签名推断(最自由)
    declare function foo2(x:string):number;
    declare function foo2(x: number):string;
    declare function foo2(x:string|number):string|number;
    type T80 = ReturnType1<typeof foo2>; // type T80 = string | number
    // 无法再正常类型的参数的约束子语句中使用 infer
    // 仅条件类型的 "extends" 子句中才允许 "infer" 声明。ts(1338)
    //type ReturnType2<T extends (...args: any[])=> infer R> = R;
    // 但是可以这样达到目的
    type AnyFunction = (...args: any[]) => any;
    type ReturnType2<T extends AnyFunction> = T extends (...args: []) => infer R ? R : any;

    // TS 预定义的有条件类型
    // 从T 中剔除可以赋值给 U 的类型
    type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // type T00 = "b" | "d"
    // 从 T 中提取可以赋值给 U 的类型
    type T01 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // type T01 = "a" | "c"
    type T02 = Exclude<string | number | (()=>void), Function>; // type T02 = string | number
    type T03 = Extract<string | number | (()=>void), Function>; // type T03 = () => void
    type T04 = NonNullable<string | number | undefined>; // type T04 = string | number
    type T05 = NonNullable<(()=>string) | string[] | null | undefined>; // type T05 = (() => string) | string[]
    
    // ReturnType & InstanceType
    function f4(s: string) {
      return {a: 1, b: s};
    }
    class C1 {
      x = 0;
      b = 0;
    }
    type T011 = ReturnType<() => string>;
    type T012 = ReturnType<(s: string) => void>;
    type T013 = ReturnType<(<T>()=>T)>; // type T013 = unknown
    type T014 = ReturnType<<T extends U, U extends number[]>()=>T>; // type T014 = number[]
    type T015 = ReturnType<typeof f4>;  // type T015 = {a: number;b: string;}
    type T016 = ReturnType<any>; 
    //type T017 = ReturnType<string>;  // 类型“string”不满足约束“(...args: any) => any”。ts(2344)
    //type T018 = ReturnType<Function>; // 类型“Function”不满足约束“(...args: any) => any”。


    type T021 = InstanceType<typeof C1>; // type T021 = C1
    type T022 = InstanceType<any>;  
    type T023 = InstanceType<never>; 
    //type T024 = InstanceType<string>; // 类型“string”不满足约束“new (...args: any) => any”。ts(2344)
    //type T025 = InstanceType<Function>; // 类型“Function”不满足约束“new (...args: any) => any”。
    //type T026 = InstanceType<String>; // 类型“String”不满足约束“new (...args: any) => any”。

}