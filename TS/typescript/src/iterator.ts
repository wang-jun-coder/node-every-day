
// 可迭代性, 实现了 Symbol.iterator 属性

// for .. of
let array = [1, 'string', false];
let iterFunc = array[Symbol.iterator];
array[Symbol.iterator] = function() {
  console.log(`Symbol.iterator called: ${this}`); // Symbol.iterator called: 1,string,false
  return iterFunc.call(this);
}
for (const entry of array) {
  console.log(entry); //  1 string false
}

// for of vs for in
// for of 迭代 value, for in 迭代 key
let list = ['a', 'b', 'c'];
for (const key in list) {
  console.log(key); // 0 1 2
}
for (const value of list) {
  console.log(value); // a b c
}
// for in 可以操作任何对象, 提供了查看对象属性的一种方法, for of 则关注迭代对象的值
let pets = new Set(['cat', 'dog', 'Hamster']);
pets['species'] = 'mammals';
for (const key in pets) {
  console.log(key); // species
}
for (const pet of pets) {
  console.log(pet); // cat dog hamster
}

// es5 或 es3, forof 不支持在非数组值上使用, 即使已实现了  Symbol.iterator 方法, 此时可以使用 for 循环代替





export default {};