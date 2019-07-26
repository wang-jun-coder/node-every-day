/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    const v1 = version1.split('.');
    const v2 = version2.split('.');

    let ret = 0;
    let len = v1.length > v2.length ? v1.length : v2.length;

    for(let i=0; i<len; i++) {
    	let n1 = Number(v1[i]) || 0;
    	let n2 = Number(v2[i]) || 0;
    	if (n1 === n2) continue;
    	if (n1 > n2) {
    		ret = 1; 
    		break;
    	} 
    	ret = -1;
    	break;
    }
    return ret;
};

console.log(compareVersion('0.1',  '1.1')); // -1;
console.log(compareVersion('1.0.1',  '1')); // 1;
console.log(compareVersion('7.5.2.4',  '7.5.3')); // -1;
console.log(compareVersion('1.01',  '1.001')); // 0;
console.log(compareVersion('1.0',  '1.0.0')); // 0;
