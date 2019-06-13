/**
 * 常用限定符
 *
 * *        // 重复 0 次或多次
 * +        // 重复 1 次或多次
 * ?        // 重复 0 次或一次
 * {n}      // 重复 n 次
 * {n,}     // 重复 n 次或更多次
 * {n,m}    // 重复 n 次到 m 次
 * */

const str1 = 'reggger';

// *        // 重复 0 次或多次
console.log(str1.match(/b*/));    // [ '', index: 0, input: 'reggger' ]
console.log(str1.match(/r*/));    // [ 'r', index: 0, input: 'reggger' ]
console.log(str1.match(/eg*/));   // [ 'eggg', index: 1, input: 'reggger' ]

// +        // 重复 1 次或多次
console.log(str1.match(/g+/));      // [ 'ggg', index: 2, input: 'reggger' ]
console.log(str1.match(/f+/));      // null

// {n}      // 重复 n 次
console.log(str1.match(/g{2}/));    // [ 'gg', index: 2, input: 'reggger' ]
// {n,}     // 重复 n 次或更多次
console.log(str1.match(/g{2,}/));   // [ 'ggg', index: 2, input: 'reggger' ]
// {n,m}    // 重复 n 次到 m 次
console.log(str1.match(/eg{1,5}/)); // [ 'eggg', index: 1, input: 'reggger' ]
