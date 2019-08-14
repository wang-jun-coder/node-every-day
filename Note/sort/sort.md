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
	```

#### 快速排序

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
