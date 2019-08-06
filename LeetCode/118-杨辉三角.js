/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
	const ret = [];
	while(numRows) {
		numRows--;
		if (ret.length === 0) {
			ret.push([1]);
			continue;
		}
		let array = [1];
		let pre = ret[ret.length-1];
		for(let i=1; i<pre.length; i++) {
			array.push(pre[i] + pre[i-1]);
		}
		array.push(1);
		ret.push(array);
	}
	return ret;
};



console.log(generate(5));