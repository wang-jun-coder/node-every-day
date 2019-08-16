function mergeSort(nums) {

	if (!nums || nums.length <= 1) return nums;
	// 治, 有序合并数组
	function merge(left1, right1, left2, right2) {
		// 定义临时数组, 存放合并后的结果
		const tmpArray = [];
		// 定义两个游标, 分别从区间取值
		let i = left1;
		let j = left2;

		// 合并有序数组
		while(i<=right1 && j <= right2) {
			// 遍历两个有序区间内的元素, 哪个小, 将哪个放在临时数组中, 同时移动该区间内的游标, 继续判断, 直至一方或双方同时完成
			tmpArray.push(nums[i] < nums[j] ? nums[i++] : nums[j++]);
		}
		// 若合并后有区间有元素残留
		while(i <= right1) {
			tmpArray.push(nums[i++]);
		}
		while(j <= right2) {
			tmpArray.push(nums[j++]);
		}

		// 将数组中的数据, 填充至原数组中
		for(let i=0; i<tmpArray.length; i++) {
			nums[left1+i] = tmpArray[i];
		}
	}
	// 分, 递归拆分数组, 
	function recursive(nums, left, right) {
		if (left>=right) return;
		const mid = Math.floor((right-left)/2+left);
		recursive(nums, left, mid);
		recursive(nums, mid+1,right);
		merge(left, mid, mid+1, right);
	}

	recursive(nums, 0, nums.length-1);
	return nums;
}


module.exports = mergeSort;





