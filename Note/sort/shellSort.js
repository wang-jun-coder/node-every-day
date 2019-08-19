function shellSort(nums) {
	if (!nums || nums.length <=1) return nums;
	// 初始增量为数组长度一半, 此时每个分组内元素最多只有两个
	let gap = Math.floor(nums.length/2);
	// 调整分组步长, 直至步长唯一, 则此时只有一个元素
	while(gap > 0) {
		// 遍历每个分组的每个元素(第一个分组的第二个元素, 第二个分组的第二个元素, 第 gap 个分组的第二个元素, 第一个分组的第二个元素, ...)
		for(let i=gap; i<nums.length; i++) {

			// 倒序遍历分组内元素, 如外层循环为第三个元素(倒序第一个), 则倒序遍历, 判断倒数第二个, 如比当前大, 则交换值(大值后移), 直至遍历至合适位置
			for(let j=i-gap; j>=0; j-=gap) {
				if (nums[j] > nums[j+gap]) {
					[nums[j], nums[j+gap]] = [nums[j+gap], nums[j]]
				} else {
					// 类似插入排序, 数组遍历查找合适位置, 数组一直有序, 一旦找到合适位置, 再往前的数据无需遍历, 跳过即可
					break;
				}
			}
		}	
		gap = Math.floor(gap/2);
	}
	return nums;
}


module.exports = shellSort;