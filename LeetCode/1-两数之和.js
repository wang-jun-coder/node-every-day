/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
	for (let i=0; i<nums.length; i++) {
		const first = nums[i];
		for (let j = i+1; j < nums.length; j++) {
			const second = nums[j];
			console.log(`${first} + ${second} ? ${target}`);
			if (first + second === target) {
				return [i, j];
			}
		}
	}
};

var twoSum2 = function(nums, target) {
	const map = {};
	for (let i=0; i<nums.length; i++) {
		// 因为后面的覆盖前面的, 遍历时, 从前面开始遍历, 故不需要特殊操作
		map[nums[i]] = i;
	}
	for (let i = 0; i < nums.length; i++) {
		const first = nums[i];
		const second = target-first;
		const index = map[second];
		if (undefined === index) continue;
		if (index === i) continue;
		return [i, index];
	}
};	

var twoSum3 = function(nums, target) {
	const map = {};
	for (let i=0; i<nums.length; i++) {
		const first = nums[i];
		const second = target - first;
		const index = map[second];

		if (undefined !== index) {
			return [index, i];
		}
		map[first] = i;
	}
	
};	





// var nums = [3, 2, 3], target = 6;
// console.log(twoSum(nums, target));

// var nums = [2,7,11,15], target = 9;
// console.log(twoSum2(nums, target));

var nums = [2,7,11,15], target = 9;
console.log(twoSum3(nums, target));






