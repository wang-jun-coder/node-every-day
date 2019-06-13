// |    // 分支


// 座机号码
// 三位区号+八位号码
// 四位区号+七位号码
// 区号以 0 开头
// 区号与号码之间用 - 链接
// 区号可以使用 () 括起来, 也可以不括起来


// | 分割分支条件
// 有括号 三位区号 + 八位号码
// 无括号 三位区号 + 八位号码
// 有括号 四位区号 + 七位号码
// 无括号 四位区号 + 七位号码

const reg = /^(\(0\d{2}\)-\d{8}$|0\d{2}-\d{8}|\(0\d{3}\)-\d{7}|0\d{3}-\d{7})$/;
console.log(reg.test('027-12345678'));  // true
console.log(reg.test('0558-1234567'));  // true
console.log(reg.test('(027)-87654321'));// true
console.log(reg.test('(0558)-7654321'));// true

console.log(reg.test('(027-87654321')); // false
console.log(reg.test('(027-77654321')); // false
console.log(reg.test('027)-87654321')); // false
console.log(reg.test('0558)-7654321')); // false
console.log(reg.test('(0558-7654321')); // false
console.log(reg.test('(0558-87654321'));// false


