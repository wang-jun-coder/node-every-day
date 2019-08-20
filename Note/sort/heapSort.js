function heapSort(nums) {

	// 调整堆指定节点的方法, 指定数组, 和要排序的结点索引, 以及最大的结点索引
	function adjustHeap(nums, index, size) {
		while(index>=0 && index <size) {
			let max = index;
			// 取左右结点对应的索引
			let left = 2*index+1;
			let right = 2*index+2;

			// 找出当前节点和两个子节点, 对应的值
			if (left < size && nums[left] > nums[max]) max = left;
			if (right < size && nums[right] > nums[max]) max = right;

			// 调整元素, 将最大值, 与当前值替换
			if (max === index) break;
			[nums[max], nums[index]] = [nums[index], nums[max]];
			
			// // 递归遍历被调整的结点, 确保结构适合(此处使用迭代遍历处理)
			// adjustHeap(nums, max, size);
			index = max
		}
		
	}

	if (!nums || nums.length <= 1) return nums;

	// 遍历排序数组, 使之成为一个大根堆
	for(let i=(Math.floor(nums.length/2)-1); i>=0; i--) {
		adjustHeap(nums, i, nums.length);
	}

	// 选择排序, 将最大根与数组尾元素交换, 并重新调整堆
	for(let i=nums.length-1; i>=0; i--) {
		[nums[0], nums[i]] = [nums[i], nums[0]];
		adjustHeap(nums, 0, i);
	}
	return nums;
}

module.exports = heapSort;