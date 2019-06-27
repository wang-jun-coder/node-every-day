namespace AdvancedTypesNameSpace {

  // 交叉类型, 将多个类型合并为一个类型, 包好了所需所有类型的特性
  function extend <First, Second>(first: First, second: Second): First & Second {
    
    const result: Partial<First & Second> = {};
    for (const prop in first) {
      if (first.hasOwnProperty(prop)) {
          (<First>result)[prop] = first[prop];
      }
    }
    for (const prop of Object.getOwnPropertyNames(second)) {
        if (second.hasOwnProperty(prop)) {
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

}