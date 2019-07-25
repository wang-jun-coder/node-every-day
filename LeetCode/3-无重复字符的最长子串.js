/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
	if (s.length===1) return 1;
	let max = 0;
	const check = str => {
		return new Set(str.split('')).size === str.length;
	}
	for(let i=0; i<s.length; i++) {
		if (s.length-i<max) break;
		for(let j=i+1+max; j<=s.length; j++) {
			const sub = s.substring(i, j);
			if (check(sub)) max = sub.length > max ? sub.length : max;
			else break;
		}
	}
	return max;
};
// 视窗处理 -> 左右游标, 右边遇到区间内重复,左边移动一位, 依次操作
var lengthOfLongestSubstring2 = function(s) {
	if (s.length===1) return 1;
	let max = 0;
	let set = [];
	let i=0, j = 0;
	while(i < s.length && j < s.length) {
		if (s.length - i <max) break;
		if (set.includes(s.charAt(j))) {
			set.shift();
			i++;
		} else {
			set.push(s.charAt(j++));
			max = max > j-i ? max : j-i;
		}
	}
	return max;
};

var lengthOfLongestSubstring3 = function(s) {
	if (s.length===1) return 1;
	let max = 0;
	let map = {};
	let i=0, j = 0;
	
	for (j = 0; j < s.length; j++) {
		const val = map[s.charAt(j)];
		if (undefined !== val) {
			i = val > i ? val : i;
		}

		max = max > j-i+1 ? max : j-i+1;
		map[s.charAt(j)] = j+1;
	}

	return max;
};

console.log(lengthOfLongestSubstring3("abcabcbb"));

