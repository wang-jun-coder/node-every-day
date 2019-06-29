// 示例
// 定义 mixins
class Disposable {
  isDisposed: boolean;
  dispose() {
    this.isDisposed = true;
  }
}
class Activatable {
  isActived: boolean;
  activate() {
    this.isActived = true;
  }
  deactivate() {
    this.isActived = false;
  }
}
// 创建一个类, 实现 mixins 相关属性(并未实现, 仅声明属性占位)
class SmartObject implements Disposable, Activatable {
  constructor() {
    setInterval(()=> console.log(`${this.isActived} : ${this.isDisposed}`, 500));
  }
  interact() {
    this.activate();
  }
  isDisposed: boolean = false;
  dispose: ()=>void;

  isActived: boolean = false;
  activate: () => void;
  deactivate: () => void;
}
// 调用函数混入属性至声明的类
applyMixins(SmartObject, [Disposable, Activatable]);
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!);
    });
  })
}
