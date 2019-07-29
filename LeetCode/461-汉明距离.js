/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
	const xArray = x.toString(2).split('').reverse();
	const yArray = y.toString(2).split('').reverse();
	const len = xArray.length > yArray.length ? xArray.length : yArray.length;
	let cnt = 0;
	for(let i=0; i<len; i++) {
		let xi = xArray[i] || '0';
		let yi = yArray[i] || '0';
		if (xi !== yi) cnt++;
	}
	return cnt;
};

var hammingDistance2 = function(x, y) {
	const ret = x ^ y; // 按位异或取值, 求 1 的个数
	let cnt = 0;
	const str = ret.toString(2);
	for(let i=0; i<str.length; i++) {
		if (str[i] === '1') cnt++;
	}
	return cnt;
};


console.log(hammingDistance2(1,4));