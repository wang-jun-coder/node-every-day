## 排序算法

### 概述
排序是程序中最基本的操作，不同的排序所消耗的时间空间不同，此处实现了十种排序算法，做下笔记。

### 实现
以下代码均以升序排列数组，如需降序，通常只需要在判断条件处处理即可

#### 冒泡排序

* 基本思想是 
	* 每次对比相邻的两个元素，将大的放到后面，一轮循环后则最大元素就处于正确的位置了
	* 外层循环，依次得到最大值，第二大, ..., 最小值
* 示例代码

	```js
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
	```
* 代码分析
	* 空间复杂度: 没有使用额外空间，空间复杂度为 O(1)
	* 时间复杂度
		* 最好：数组已有序，一轮遍历后停止，O(n)
		* 最坏：需计算 n！ 次，根据等差数列求和公式，为 O(n<sup>2</sup>)
		* 平均：O(n<sup>2</sup>)

#### 选择排序
* 基本思想
	* 选择排序则是选择第 0 位元素作为最小值
	* 将其后元素分别与第 0 位元素比较，若比其小，则交换
	* 如此一来，一轮循环结束，则第 0 位则是数组中最小的元素
	* 外层循环，分别选择第 0，1 ..., 直至最后一位
* 示例代码
	
	```js
	function selectSort(nums) {
		if (!nums || nums.length <=1) return nums;
	
		for(let i=0; i<nums.length; i++) {
			for(let j=i; j<nums.length; j++) {
				if (nums[i] > nums[j]) [nums[i], nums[j]] = [nums[j], nums[i]];
			}
		}
		return nums;
	}
	```
* 代码分析
	* 空间复杂度：未使用额外空间，空间复杂度为 O(1)
	* 时间复杂度：由于无法判断后续元素是否有序，故最好，最坏，平均时间复杂度均为 O(n<sup>2</sup>)

#### 插入排序
* 基本思想
	* 插入排序则是假设数组前 i 个元素有序，i 初始值为 1
	* 从第 i+1 个元素开始，去前 i 个元素进行遍历，找到一个比 i+1 对应元素小的位置 j
	* 将第 i+1 个元素插入到 j 的后面，依次插入完毕后，数组有序
* 示例代码

	```js
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
	```
* 代码分析
	* 空间复杂度：未使用额外空间，空间复杂度为 O(1)
	* 时间复杂度：
		* 最好：数组已有序，内层插入操作每次仅一次， O(n)
		* 最坏：数组反序，内层插入操作每次都要遍历已有序部分，O(n<sup>2</sup>)
		* 平均：O(n<sup>2</sup>)

#### 快速排序
* 基本思想
	* 快速排序采用分治的思想，递归处理
	* 首先选择基准值，通常选择区间最左侧元素
	* 遍历区间，将区间分为小于基准值和大于基准值的两部分
	* 将基准值插入到这两部分之间，
	* 以基准值的位置为中点，拆分并递归处理这两个子区间
* 示例代码

	```js
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
	```
* 代码分析
	* 空间复杂度： 未使用额外空间，空间复杂度 O(1) 
	* 时间复杂度：
		* 最好：元素均匀分享，此时相当于不断二分数组，O(n*logn)
		* 最坏：所有元素均处于基数另一侧，此时相当于插入排序，O(n<sup>2</sup>)
		* 平均：O(n*logn)

#### 归并排序
* 基本思想
	* 递归拆分数组，直至拆分到每个区间仅有单个元素
	* 此时可认为每个区间均有序
	* 再有序合并拆分后的区间内元素（合并有序数组）
	* 将合并后的数组，重置到源数组中
* 代码示例

	```js
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

	```
* 代码分析
	* 空间复复杂度：需要与原数组相同的控件大小作为临时存储，故 O（n）
	* 时间复杂度
		* 不管最好最坏，归并排序均为二分至底，然后有序合并，所以其时间复杂度为 O(n * log n)
	* 注意：归并排序本质上不是数组原地排序，而是将排序结果中的数据存至另一个数组中去了，本示例代码中，将排序结果赋值到待排序数组中，才使得原数组被改变。

#### 计数排序
* 基本思想：
	* 声明辅助数组，该数组的下标当做被排序的元素
	* 遍历待排序数组，将元素作为辅助数组的下标，将该下标对应的值加一，标记此元素又出现了一次
	* 遍历辅助数组，若某个下标对应的值大于零，这当前下标在原数组中出现过对应次数
	* 注意：
		* 仅适用于正整数排序
		* 由于 js 数组的对象特性，索引也可为负数，故在 js 中也支持负数排序
* 代码示例
	
	```js
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
	```
* 代码分析
	* 空间复杂度，需要长度为 k (k 为数组的最大和最小值之差) 的辅助数组，故空间复杂度为 O(k)
	* 时间复杂度，不管最好最坏，该排序方式均为 O(n+k)

#### 基数排序
* 基本思想
	* 准备一个二维数组，内层数组分别存放对应位为 0-9 的元素
	* 以最大值的位数来进行遍历，分别取各个元素的对应位（个，十，百，...），作为基数，从外层数组中取出对应的存放数组，如指定位不存在，则补零
	* 每轮循环完毕，在不考虑未遍历到高位的情况下，数组有序，按顺序合并二维数组中的元素，继续循环直至最高位，此时数组有序
	* 注意：
		* 分离位数，所以只能排序正整数，负数小数均不支持
* 代码示例

	```js
	function radixSort(nums) {
		if (!nums || nums.length <= 1) return nums;
		// 计算数字位数, js 中可以将其转为字符串求长度, 如不利用语言特性, 则需要分离指定位数
		// function calculateDigits(num) {
		// 	// return (num+'').length;
		// 	let digits = 0;
		// 	while(num>0) {
		// 		num = Math.floor(num/10);
		// 		digits++
		// 	}
		// 	return digits;
		// }
		// 获取指定位对应的值, js 中可转换字符串处理, 如不利用语言特性, 则需要进行计算求得	
		// function getDigit(num, i) {
		// 	// return (num+'')[num.length-1 -i]; 
		// 	num = num % Math.pow(10, i+1);
		// 	return Math.floor(num/Math.pow(10, i));
		// }
	
		// 基数数组
		const radixArray = [];
		for(let i=0; i<10; i++) {
			radixArray[i]=[];
		}
		// 遍历数组获取最大值
		let max = nums[0];
		for(let i=0; i<nums.length; i++) {
			max = max > nums[i] ? max : nums[i];
		};
		let maxDigits = `${max}`.length;
	
		// 按位数循环排序(从低位到高位进行排序, 避免高位排序后, 次高位影响高位排序好的结果) 
		for(let i= maxDigits-1; i>=0; i--) {
			// 循环原数组, 将元素按指定位数, 置于基数对应数组中, 同时清空原数组
			while(nums.length) {
				let n = nums.shift();
				// 高位补零
				let nStr = `${n}`.padStart(maxDigits, '0');
				let key = nStr[i]; 
				radixArray[key].push(n);
			}
			// 遍历基数数组, 合并至原数组
			for(let j=0; j<radixArray.length; j++) {
				let array = radixArray[j];
				while(array.length) {
					nums.push(array.shift());
				}
			}
		}
		return nums;
	}
	```
* 代码分析
	* 空间复杂度，需要辅助空间临时存放元素 O(n+k)
	* 时间复杂度，需要在遍历数组的情况下，外层还需要最大位数次循环，故 O(k*n)
	
#### 桶排序
* 基本思想，

#### 希尔排序

#### 堆排序


### 排序算法对比


### 参考资料
* [LeetCode 题解](https://leetcode-cn.com/problems/sort-an-array/)
* [十大排序 js 实现](https://github.com/DangoSky/algorithm/tree/master/Algorithm-notes)
* [visualgo 算法可视化](https://visualgo.net/en/sorting)
