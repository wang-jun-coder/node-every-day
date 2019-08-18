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

module.exports = radixSort;