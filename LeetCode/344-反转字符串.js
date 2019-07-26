/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
	if (s.length <=1) return s;
	let tmp = null;
	let len = Math.floor(s.length/2);
	for(let i=0; i<len; i++) {
		tmp = s[i];
		const index = s.length - i - 1;
		s[i] = s[index];
		s[index] = tmp;
	}
	return s;
};

console.log(reverseString(["h","e","l","l","o"]));