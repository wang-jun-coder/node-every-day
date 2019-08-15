function insertSort(nums) {
	if (!nums || nums.length <= 1) return nums;

	// 假设数组前 i 个元素有序, 循环后续元素, 一依次插入到合适位置
	for(let i=1; i< nums.length; i++) {
		let j = i-1;
		const cur = nums[i]; // 当前操作的元素
		// 倒序遍历有序部分, 查找合适的位置
		while(j>=0 && nums[j] > cur) {
			nums[j+1] = nums[j]; // 后移比当前元素大的元素
			j--;
		}
		nums[j+1] = cur;
	}
	return nums;
}


module.exports = insertSort;