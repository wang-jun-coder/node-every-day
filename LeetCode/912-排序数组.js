/*
冒泡排序, 双层循环
每次内层循环比较相邻两个元素, 确保后一位比前一位大
每次外层循环得到最大,倒数第二大...(数组最后一位是最大, ...)
每次将大值, 冒泡到数组最后, 故名冒泡排序
*/
const bubbleSort = nums => {
	if (!nums || nums.length <=1) return nums;
	for(let i=0; i< nums.length-1; i++) {
		for(let j=0; j< nums.length-i-1; j++) {
			if (nums[j] > nums[j+1]) { // 升序排序, 前者比后者大, 交换位置
				[nums[j], nums[j+1]] = [nums[j+1], nums[j]];
			}
		}
	}
	return nums;
}

/*
选择排序, 双层循环
每轮外层循环选择第 i 位置的值
每轮内存循环, 确保第 i 位置的值, 是第 i 小的
每次外层选择排名, 内层获取此排名, 故名选择排序
*/
const selectSort = nums => {
	if (!nums || nums.length <=1) return nums;	
	for(let i=0; i<nums.length; i++) {
		for(let j=i+1; j<nums.length; j++) {
			if (nums[i] > nums[j]) { // 升序排列, 若有比第 i 位大的元素, 则替换第 i 位的值
				[nums[j], nums[i]] = [nums[i], nums[j]];
			}
		}
	}
	return nums;
}

/*
插入排序, 双层循环
外层循环, 默认前 i 个为有序数组, 初始值为 1
内层循环, 为即将插入的元素, 寻找合适的插入位置
故名插入排序
*/
const insertSort = nums => {
	if (!nums || nums.length <=1) return nums;

	for(let i=1; i<nums.length; i++) {
		let j = i;
		let tmp = nums[j]; // 取出要插入的元素

		// 当要插入的元素, 比前一个元素还要小, 则前一个元素后移, 直至找到合适的插入位置
		while(j > 0 && tmp < nums[j-1]) {
			nums[j] = nums[j-1];
			j--;
		}	
		// 找到合适位置后, 插入元素
		nums[j] = tmp;
	}
	return nums;
}

/*
快速排序

*/
const quickSort = nums => {
	if (!nums || nums.length <=1) return nums;
	function partition(nums, left, right) {
		// 对指定区间内元素进行排序
		// 选取一个基数, 将区间内小于基数的元素放在该元素左侧, 否则右侧
		let base = nums[left]; // 为了后续遍历跳过基准值方便(无需跳过基准值), 故选择开始元素
		// 用 save 点, 标记大于基准点对应区间的起始索引 
		// 这样在基准值右侧可以 save 点分为大于基准值和小于基准值两个区间
		// 当一轮遍历完毕后, 仅需要, 将基准值, 和小于区间的最大值即 save-1 点位置的元素互换, 此时即可达成 基准值左侧均小于基准值, 基准值右侧大于基准值
		let save = left+1; 

		for(let i=left+1; i<=right; i++) {
			// 小于基准值的元素, 将其放到 save 点, 同时将save 点++, 这样 save 点之前都是小于基准值的元素
			if (nums[i]<base) {
				[nums[i], nums[save]] = [nums[save], nums[i]];
				save++
			}
		}
		[nums[left], nums[save-1]] = [nums[save-1], nums[left]];
		return save-1;
	}
	function recursive(nums, left, right) {
		if (left > right) return nums;
		// 找出分割点
		let index = partition(nums, left, right);
		// 递归排序
		recursive(nums, left, index-1);
		recursive(nums, index+1, right);
		return nums;
	}
	return recursive(nums, 0, nums.length-1);
}

/*
归并排序
将数组递归拆分成两个序列, 有序合并这两个序列
*/

function mergeSort(nums) {
	// 临时数组存放元素
	let tmp = [];	
	function merge(left1, right1, left2, right2) {
		
		// 定义左区间游标和右区间游标
		let i=left1;
		let j=left2;
		while(i <= right1 && j <= right2) {
			// 开始向数组中填充元素, 小的放前面, 哪个区间游标对应的元素填充进去了, 哪个游标右移
			tmp.push(nums[i]>nums[j] ? nums[j++] : nums[i++]);
		}
		// 对比填充完成后, 可能有一侧区间, 仍有剩余元素
		// 此时分别填充
		while(i<=right1) {
			tmp.push(nums[i++]);
		}
		while(j<=right2) {
			tmp.push(nums[j++]);	
		}
		// 复制临时数组中的元素到源数组中
		for(let k=tmp.length-1; k>=0; k--) {
			nums[left1+k] = tmp.pop();
		}
	}
	// 递归拆分数组, 调用合并函数(分治思想)
	function recursive(left, right) {
		if (left >= right) return nums;
		let mid = Math.floor((right-left)/2 + left);
		recursive(left, mid);
		recursive(mid + 1, right);
		merge(left, mid, mid+1, right)
		return nums;
	};
	return recursive(0, nums.length-1);
}

//*************************** 计数排序, 基数排序, 桶排序 ***************************
/*
计数排序, 适用于正整数排序, 对于 js 来说, 可以支持负数, 但不支持 小数

主要思路是将待排序数组内的元素, 作为一个计数数组的下标, 遍历待排序数组, 将对应下标加一, 最后遍历计数数组, 将数据填入原数组
*/
function countingSort(nums) {
	if (!nums || nums.length<=1) return nums;
	const array = [];
	let min = nums[0];
	let max = nums[0];

	// 开始计数
	nums.forEach((n, i) => {
		array[n] = (array[n] || 0) + 1;
		min = min < n ? min : n;
		max = max > n ? max : n;
	});

	// 还原数组
	let index = 0; // 用来记录原数组的还原位置
	for(let i=min; i<=max; i++) {	// 不直接使用 for each, 是为了处理负数的 case 
		let cnt = array[i];
		while(cnt > 0) {
			nums[index] = i;
			index++;
			cnt--; // cnt 为 几, 就标记有几个值为 i 的元素
		}

	}
	return nums;
}



function randomnums(len=1, min=0, max=1) {
	let nums = [];

	while(len--) {
		nums.push(Math.floor(Math.random() * max + min));
	}
	return nums;
}
let nums = randomnums(5, 0, 100);
nums=[3,-1]
console.log(nums);
console.log(`
-------- result -----------
`);
// console.log(bubbleSort(nums));
// console.log(selectSort(nums));
// console.log(insertSort(nums));
// console.log(quickSort(nums));
// console.log(mergeSort(nums));
console.log(countingSort(nums));

