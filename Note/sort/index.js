const bubbleSort = require('./bubbleSort.js');
const selectSort = require('./selectSort.js');


function randomNums(len=1, min=0, max=1) {
	let nums = [];
	while(len--) nums.push(Math.floor(Math.random() * max + min));
	return nums;
}
let nums = randomNums(10, 0, 100);
console.log(nums);

// 测试代码
console.log(bubbleSort([...nums]));
console.log(selectSort([...nums]));
