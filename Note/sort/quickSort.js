function quickSort(nums) {

	if (!nums || nums.length <=1) return nums;

	function partition(nums, left, right) {

		let base = nums[left];
		let savePoint = left+1; // 这里存放的是大于基准值的区间下限位置


		for(let i=left+1; i<=right; i++) {
			const cur = nums[i];
			// 如果当前值小于基准值, 则将其余大区间下限交换, 同时将下限提升
			if (cur<base) {
				[nums[savePoint], nums[i]] = [nums[i], nums[savePoint]];
				savePoint++;
			}
		}
		// 循环结束后, 小于 savePoint 的元素, 均小于基准值, 大于等于savePoint 的值, 均大于基准值
		// 此时基准值仍在最左侧, 所以将基准值和小区间上限交换, 则达成目标, 基准值左侧均小于基准值, 基准值右侧均大于基准值
		[nums[savePoint-1], nums[left]] = [nums[left], nums[savePoint-1]];
		return savePoint-1; // 返回此时基准值位置, 便于拆分区间
	}

	function recursive(nums, left, right) {
		if (left >= right) return nums;
		const index = partition(nums, left, right);
		recursive(nums, left, index-1);
		recursive(nums, index+1, right);
	}

	recursive(nums, 0, nums.length-1);
	return nums;
}

module.exports = quickSort;


