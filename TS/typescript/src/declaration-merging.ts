import { CONNREFUSED } from "dns";

// 合并接口
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
  // height: number; // 非函数成员应是唯一的, 若不唯一, 类型需相同, 否则报错
  // height: string; // 后续属性声明必须属于同一类型。属性“height”的类型必须为“number”，但此处却为类型“string”。
}
let box: Box = {
  height: 5,
  width: 4,
  scale: 10
}

// 对于函数成员, 同名函数会被当成这个函数的重载, 当接口 A 与 后来接口 A 合并时, 后来接口优先级更高
class Animal { };
class Sheep extends Animal {}; 
class Dog extends Animal {}; 
class Cat extends Animal {}; 
interface Cloner {
  clone(animal: Animal):Animal;
}
interface Cloner {
  clone(animal: Sheep):Sheep;
}
interface Cloner {
  clone(animal: Dog):Dog;
  clone(animal: Cat):Cat;
}
// 相当于
interface Cloner {
  clone(animal: Dog):Dog;
  clone(animal: Cat):Cat;
  clone(animal: Sheep):Sheep;
  clone(animal: Animal):Animal;
}

// 遇到特殊签名时, 若签名有一个参数类型时单一字符串变量, 那么它会被提升到重载列表顶端
interface Document {
  createElement(tag: any):Element;
}
interface Document {
  createElement(tag: "div"):HTMLDivElement;
  createElement(tag: "span"):HTMLSpanElement;
}
interface Document {
  createElement(tag: string):HTMLElement;
  createElement(tag: "canvas"):HTMLCanvasElement;
}
// 相当于(越通用的签名越靠下)
interface Document {
  createElement(tag: "canvas"):HTMLCanvasElement;
  createElement(tag: "div"):HTMLDivElement;
  createElement(tag: "span"):HTMLSpanElement;
  createElement(tag: string):HTMLElement;
  createElement(tag: any):Element;
}

// 合并命名空间
namespace Animals {
  export class Zebra { };
}
namespace Animals {
  export interface Legged { numberOfLegs: number };
  export class Dog {};
}
// 等同于
// namespace Animals {
//   export interface Legged { numberOfLegs: number };
//   export class Zebra { };
//   export class Dog {};
// }

// 注意: 非导出成员仅在其原有的命名空间内可见
namespace Animal {
  let haveMuscles = true;
  export function animalsHaveMuscles() {
    return haveMuscles;
  }
}
namespace Animal {
  export function doAnimalsHaveMuscles() {
    // return haveMuscles; // 找不到名称“haveMuscles”。ts(2304)
  }
}

// 命名空间与类和函数和枚举类型合并

// 命名空间 和 类
class Album {
  label: Album.AlbumLable; // 内部类
}
namespace Album {
  // 需要导出才能让合并的类访问
  export class AlbumLable { };
}
// 可用来扩展函数属性
function buildLabel(name: string):string {
  return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
  export let prefix = "hello, ";
  export let suffix = "";
}
console.log(buildLabel("Sam Smith")); // hello, Sam Smith
// 也可用来扩展枚举类型
enum Color {
  red = 1,
  green = 2,
  blue = 4
}
namespace Color {
  export function mixColor(colorName: string) {
    if(colorName === "yellow") {
      return Color.red + Color.green;
    }
    if(colorName === "white") {
      return Color.red + Color.green + Color.blue;
    }
    if(colorName === "magenta") {
      return Color.red + Color.blue;
    }
    if(colorName === "cyan") {
      return Color.green + Color.blue;
    }
  }
}

// 注意: 类不能与其他类或变量合并