/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
	let arr = [1];
    for(let i=1;i<=rowIndex;i++){
        arr.push(arr[i-1]*(rowIndex-i+1)/i);
    }
    return arr;
};

var getRow1 = function(rowIndex) {
	const ret = [];
	let numRows = rowIndex+1;
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
	return ret[rowIndex];
}


console.log(getRow(22));
// console.log(getRow1(22));
