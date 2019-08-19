function bucketSort(nums) {
	if (!nums || nums.length <= 1) return nums;
	// 计算准备桶
	const bucketCnt = Math.ceil(nums.length/100);
	const buckets = [];
	for(let i=0; i<bucketCnt; i++) {
		buckets[i] = [];
	}
	// 获取数组最大最小值, 用来计算步长
	let min = max = nums[0];
	nums.forEach(n => {
		min = min < n ? min : n;
		max = max > n ? max : n;
	});
	// 对于正好除尽无小数的情况, 会导致元素分配超出桶范围, 此处步长加一, 确保元素不会超出桶范围
	const step = Math.ceil((max-min)/bucketCnt) +1;

	// 遍历数组, 将元素插入到对应的桶中(同时清空原数组, 便于后续添加元素)
	while(nums.length) {
		const n = nums.pop();
		const index = Math.floor((n-min)/step);
		const bucket =  buckets[index];

		let j = bucket.length-1;
		// 插入排序
		while(j >=0 && bucket[j] > n) {
			bucket[j+1] = bucket[j]; // 后移大于 n 的元素
			j--; 
		}
		bucket[j+1] = n;
	}
	buckets.forEach(bucket => {
		nums.push(...bucket);
	});
	return nums;
}


module.exports = bucketSort;