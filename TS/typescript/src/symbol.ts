namespace SymbolNameSpace {
  let sym1 = Symbol();
  let sym2 = Symbol('key');
  let sym3 = Symbol.for('key');
  let sym4 = Symbol.keyFor(sym3);

  // 做属性
  let sym5 = Symbol();
  let obj = {[sym5]: 'value'};
  let val = Object.getOwnPropertyDescriptor(obj, sym5);
  console.log(val); // { value: 'value',writable: true, enumerable: true, configurable: true }

  // 声明对象的属性和成员
  const getClassSymble = Symbol();
  class C {
    [getClassSymble]() {
      return 'C';
    }
  }
  let c = new C();
  let className = c[getClassSymble]();

  // 常用的 Symbol

  const { 
    hasInstance, // instanceof 运算符调用
    isConcatSpreadable, // 当在一个对象上调用 Array.prototype.concat, 这个对象的数组元素是否可以展开
    iterator, // for of 调用, 返回默认迭代器
    match, // String.prototype.match 调用. 匹配字符串
    replace, // String.prototype.replace 调用, 正则替换
    search, // String.prototype.search 调用, 返回匹配部分的索引
    species, // 创建派生对象
    split, // 正则分割字符串
    toPrimitive, // 转换为原始值
    toStringTag, //Object.prototype.toString 返回创建对象时默认的字符串描述
    unscopables, // 自己拥有的属性,会被 with 作用域排除在外
  } = Symbol;

}