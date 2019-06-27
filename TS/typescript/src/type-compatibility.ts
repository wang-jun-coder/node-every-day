namespace TypeCompatibilityNameSpace {

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
  let f1:undefined|((a: number) => 0);
  let f2:undefined|((a: number, s: string) => 0);
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
  let x1: undefined | Empty<number>;
  let y1: undefined |Empty<string>;
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



}