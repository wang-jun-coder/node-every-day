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
* 基本思想
	* 获取数组最大值最小值，按桶数量给待排序元素划分区间
	* 遍历数组，根据元素大小，插入（插入排序）到该元素对应范围的桶中
	* 合并桶数组，重置待排序数组
	* 本质上是利用空间换时间，先对元素大小判断，将原数组拆分成多个小组合，在小组合内进行插入排序，一般来说，效率会高一点
* 示例代码
	
	```js
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

	```

* 代码分析
	* 空间复杂度
		* 使用了辅助空间，空间复杂度与桶个数有关，O(n+k)
	* 时间复杂度
		* 最坏情况与插入排序一致，O(n<sup>2</sup>)
		* 最好情况，每个桶一个，O(n)
		* 平均情况，O(n+k), k 为桶的个数

#### 希尔排序
* 基本思想：
	* 通过一个增量，将待排序元素分为多个组，初始值一般为数组长度的一半
	* 遍历这些组，并对组内元素进行插入排序
	* 逐步缩小该增量， 直至为 1，则数组有序
* 代码示例
	
	```js
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
	```
	 
* 代码分析
	* 空间复杂度：未使用额外空间，空间复杂度为 O(1)
	* 时间复杂度：希尔排序的时间复杂度与其增量序列有关
		* 步长序列
			* n/2^i 
				* 最坏：O(n<sup>2</sup>)
			* 2^k - 1
				* 最坏：O(n<sup>3/2</sup>)
			* 2^i 3^j
				* 最坏：O(n log^2 n)
	* 注意：希尔排序的性能与步长序列有直接关系，此处示例代码使用的仅是最简单的不断二分
	* 参考资料：
		* [维基百科-希尔排序](https://zh.wikipedia.org/wiki/%E5%B8%8C%E5%B0%94%E6%8E%92%E5%BA%8F)

#### 堆排序
* 基本思想
	* 将数组下标，对应成堆（完全二叉树）的结构
	* 调整数组元素，使之成为大顶堆/小顶堆（每个结点都大于/小于其左右子节点的值，称为大/小顶堆）
	* 将堆顶值移动到数组最后，继续调整堆结构(本质上也是一种选择排序)
	* 直至最后，数组有序
* 代码示例

	```js
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
	```
* 代码分析
	* 空间复杂度：未使用额外空间，故 O(1)
	* 时间复杂度：其最大最小平均时间复杂度均为 O(nlogn), 其中，logn 是调整堆所花的时间


### 排序算法对比

#### 一句话概括
* 冒泡排序
	* 双层循环，比对相邻元素，大者后移（冒泡）
* 选择排序
	* 双层循环，对比指定位置的值与剩余元素，小的留在指定位置继续比对
* 插入排序
	* 当数组只有一个元素时，认定数组有序，后续元素遍历查找合适位置插入
* 快速排序
	* 选取基准值并将数组按大小放在基准值两侧，递归两侧区间直至完成
* 归并排序
	* 递归拆分数组直至单个元素，再按合并有序数组的方式合并起来，此时数组有序
* 计数排序
	* 将辅助数组的下标当做元素出现个数，遍历数组统计个数，而后顺序输出
* 基数排序
	* 将数组按指定位分别放入指定基数数组中，而后合并数组，重复操作直至最高位
* 桶排序
	* 按范围将待排序分别放置到做个桶，每个范围进行插入排序
* 希尔排序
	* 通过增量（间隔）对待排序元素进行分组，组内进行插入排序，逐步缩小增量直至 1
* 堆排序
	* 将待排序数组当做堆，通过调整堆获得最大值，与堆未元素交换并缩小堆范围，而后继续调整堆直至最后一个值

#### 明显缺点
* 排序速度慢
	* 冒泡排序，选择排序，插入排序，算法平均时间复杂度均为 O(n<sup>2</sup>), 即使空间复杂度 O（1），一般不常用
* 使用场景受限
	* 计数排序，基数排序，均要求待排序元素必须为正整数，不太实用
	* 计数排序所需额外内存，又受待排序元素中最大最小值影响，可能占用额外空间较多   
	
#### 数据分析
* 空间复杂度 O(1) 的算法
	* 冒泡排序
	* 选择排序
	* 插入排序
	* 希尔排序
	* 堆排序
	* 快速排序（若实现方式未使用辅助数组，如示例代码，O（1））
* 时间复杂度
	* O(n<sup>2</sup>)
		* 冒泡排序
		* 选择排序
		* 插入排序
	* O(n logn)
		* 希尔排序
		* 快速排序
		* 归并排序
		* 堆排序
		
#### 算法分类
* 比较排序与非比较排序
	* 比较排序：元素之间的次序依赖元素之间的比较
		* 冒泡排序
		* 选择排序
		* 插入排序
		* 希尔排序
		* 归并排序
		* 快速排序
		* 堆排序
		* 桶排序
	* 非比较排序：通过确定每个元素之前，应该有多少个元素来排序
		* 计数排序
		* 基数排序

### 参考资料
* [LeetCode 题解](https://leetcode-cn.com/problems/sort-an-array/)
* [十大排序 js 实现](https://github.com/DangoSky/algorithm/tree/master/Algorithm-notes)
* [visualgo 算法可视化](https://visualgo.net/en/sorting)
* [排序算法总结](https://www.cnblogs.com/guoyaohua/p/8600214.html)
