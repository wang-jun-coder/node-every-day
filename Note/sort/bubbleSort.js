function bubbleSort(nums) {
	if (!nums || nums.length <= 1) return nums;

	for(let i=0; i<nums.length-1; i++) {
		let sorted = true; 
		for(let j=0; j<nums.length-1-i; j++) {
			if(nums[j]>nums[j+1]) {
				[nums[j], nums[j+1]] = [nums[j+1], nums[j]];
				sorted = false; // 若一轮循环没有可交换元素, 即数组已有序, 则不需要后续遍历了
			}
		}
		if (sorted) break;
	}
	return nums;
}


module.exports = bubbleSort;