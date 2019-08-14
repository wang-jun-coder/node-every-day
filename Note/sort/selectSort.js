function selectSort(nums) {
	if (!nums || nums.length <=1) return nums;

	for(let i=0; i<nums.length; i++) {
		for(let j=i; j<nums.length; j++) {
			if (nums[i] > nums[j]) [nums[i], nums[j]] = [nums[j], nums[i]];
		}
	}
	return nums;
}

module.exports = selectSort;