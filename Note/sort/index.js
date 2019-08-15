const bubbleSort = require('./bubbleSort.js');
const selectSort = require('./selectSort.js');
const insertSort = require('./insertSort.js');
const quickSort = require('./quickSort.js');


function randomNums(len=1, min=0, max=1) {
	let nums = [];
	while(len--) nums.push(Math.floor(Math.random() * max + min));
	return nums;
}
let nums = randomNums(10, 0, 300);
console.log(nums);

// 测试代码
console.log(bubbleSort([...nums]));
console.log(selectSort([...nums]));
console.log(insertSort([...nums]));
console.log(quickSort([...nums]));
