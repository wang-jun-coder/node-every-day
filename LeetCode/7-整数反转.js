/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const sign = x > 0 ? 1 : -1;
    const num = String(x * sign).split('').reverse().join('');
    let result = parseInt(num * sign);
    if (result < Math.pow(-2, 31) || result > Math.pow(2, 31)-1) return 0;
    return result;
};

var reverse2 = function(x) {
	const MAX_VALUE = 2147483647;
	const MIN_VALUE = -2147483648;
	const TENTH_MAX_VALUE = Math.floor(MAX_VALUE/10);
	const TENTH_MIN_VALUE = Math.ceil(MIN_VALUE/10);

    let res = 0;
    while(x !== 0) {
    	const remainder = x % 10;
    	x = x > 0 ? Math.floor(x/10) : Math.ceil(x/10);
    	if (res > TENTH_MAX_VALUE || (res === TENTH_MAX_VALUE && remainder > 7)) return 0;
    	if (res < TENTH_MIN_VALUE || (res === TENTH_MIN_VALUE && remainder < -8)) return 0;
    	res = res * 10 + remainder;
    }
    return res;
};

var reverse3 = function(x) {
	const MAX_VALUE = 2147483647;
	const MIN_VALUE = -2147483648;
    let res = 0;
    while(x !== 0) {
    	const remainder = x % 10;
    	x = x > 0 ? Math.floor(x/10) : Math.ceil(x/10);
    	res = res * 10 + remainder;
    }
    if (res < MIN_VALUE || res > MAX_VALUE) return 0;
    return res;
};

// console.log(reverse2((123)));
// console.log(reverse2((-123)));
console.log(reverse2((-1563847412)));
