/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
	if (x<0) return false;
	if (x<10) return true;
	if (x%10 === 0 && x !==0) return false;
	let revers = x;
	let res = 0;
	while(revers !== 0) {
		const remainder = revers % 10;
		revers = Math.floor(revers/10);
		res = res * 10 + remainder;
	}
	if (res === x) return true;
	return false;
};

var isPalindrome2 = function(x) {
	if (x<0) return false;
	if (x<10) return true;
	if (x%10 === 0 && x !==0) return false;
	let revers =0;
	while(x > revers) {
		const remainder = x % 10;
		x = Math.floor(x/10);
		revers = revers * 10 + remainder;
	}
	return x === revers || x === Math.floor(revers / 10);
};

console.log(isPalindrome2(121));