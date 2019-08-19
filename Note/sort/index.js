const bubbleSort = require('./bubbleSort.js');
const selectSort = require('./selectSort.js');
const insertSort = require('./insertSort.js');
const quickSort = require('./quickSort.js');
const mergeSort = require('./mergeSort.js');
const countingSort = require('./countingSort.js');
const radixSort = require('./radixSort.js');
const bucketSort = require('./bucketSort.js');
const shellSort = require('./shellSort.js');



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
console.log(mergeSort([...nums]));
console.log(countingSort([...nums]));
console.log(radixSort([...nums]));
console.log(bucketSort([...nums]));
console.log(shellSort([...nums]));
