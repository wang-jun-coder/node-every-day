/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
    
	// 第一想法就是按首位排序, 但是这种排序方式不能保证组合数最大
	// 参考题解, 理解了一个传递性, 对于 a 和 b 比较谁应该放在前面, 只需要拼接后试一下即可:  a+b > b+a
    nums.sort((a, b) => {
    	return `${a}${b}` > `${b}${a}` ? -1 : 1;
    });

    if (nums[0] === 0) return '0';
    return nums.join('');
};

var largestNumber2 = function(nums) {
   	function compare(a, b) {
   		return `${a}${b}` > `${b}${a}` ? -1 : 1;
   	}
   	// 使用快速排序
   	function partition(nums, left, right) {
   		let base = nums[left];
   		let save = left+1; // 记录大区间的左侧索引
   		for(let i=save; i<=right; i++) {
   			if (compare(nums[i], base) < 0) {
   				[nums[i], nums[save]] = [nums[save], nums[i]];
   				save++;
   			}
   		}
   		// 将基准值, 与小区间的最右侧交换, 则基准值左侧, 均小于基准值, 右侧大于基准值
   		[nums[save-1], nums[left]] = [nums[left], nums[save-1]];
   		return save-1;

   	}
   	function recursive(nums, left, right) {
   		if (left>right) return;
   		const index = partition(nums, left, right);
   		recursive(nums, left, index-1);
   		recursive(nums, index+1, right);
   	}
   	recursive(nums, 0, nums.length-1);
    if (nums[0] === 0) return '0';
    return nums.join('');
};


console.log(largestNumber2([3,30,34,5,9]));
console.log(largestNumber2([0,0]));