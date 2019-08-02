/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
	if (x <= 1) return x;
	function sqrt(x, left, right) {
		console.log(`${x} ${left} ${right}`);
		if (left > right) return left;
		let mid = Math.floor((left+right)/2);
		if (mid === left || mid === right) return mid;
		if (mid*mid > x) {
			return sqrt(x, left, mid);
		} else {
			return sqrt(x, mid, right);
		}
	}
    return sqrt(x, 0, Math.floor(x/2)+1);
};

console.log(mySqrt(4));
console.log(mySqrt(8));
console.log(mySqrt(9));