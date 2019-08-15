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
	* 	

#### 归并排序

#### 计数排序

#### 基数排序

#### 桶排序

#### 希尔排序

#### 堆排序


### 排序算法对比


### 参考资料
* [LeetCode 题解](https://leetcode-cn.com/problems/sort-an-array/)
* [十大排序 js 实现](https://github.com/DangoSky/algorithm/tree/master/Algorithm-notes)
* [visualgo 算法可视化](https://visualgo.net/en/sorting)
