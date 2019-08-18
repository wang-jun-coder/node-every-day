function countingSort(nums) {
	if (!nums || nums.length <= 1) return nums;

	let cntArray = [];
	// 记录最大最小值,(辅助数组的索引范围)
	let min = nums[0];
	let max = nums[0];

	// 遍历计数, 同时记录最大最小值
	for(let i=0; i<nums.length; i++) {
		const cnt = cntArray[nums[i]] || 0;
		cntArray[nums[i]] = cnt+1;
		min = nums[i] > min ? min : nums[i];
		max = nums[i] > max ? nums[i] : max;
	}
	// 恢复数据至原数组
	let idx = 0; // 原数组游标
	for(let i=min; i<=max; i++) {
		let cnt = cntArray[i];
		// 将多次出现的值, 依次放入原数组
		while(cnt && cnt > 0) {
			nums[idx] = i;
			cnt --;
			idx++;
		}
	}
	return nums;
}


module.exports = countingSort;
