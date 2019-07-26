/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const isPalindrom = str => {
    	for(let i=0; i<str.length; i++) {
    		if (str.charAt(i) !== str.charAt(str.length-i-1)) {
    			return false;
    		}
    		if (i>str.length/2) break;
    	}
    	return true;
    }

    let result = '';
    for(let i=0; i<s.length; i++) {
	    for(let j=i+1; j<=s.length; j++) {
	    	const str = s.substring(i, j);
	    	if (isPalindrom(str)) {
	    		result = result.length > str.length ? result : str;
	    	}
	    }	
    }
    return result;
};
// 中心扩展算法
var longestPalindrome2 = function(s) {
    const expandAroundCenter = (str, L, R) => {
    	while(L>=0 && R < str.length && str.charAt(L) === s.charAt(R)) {
    		L--;
    		R++;
    	}
    	return R-L-1;
    }
    if (!s || s.length <=1) return s || '';
    let start = 0, end = 0;
    for(let i=0; i<s.length; i++) {
    	let len1 = expandAroundCenter(s, i, i);
    	let len2 = expandAroundCenter(s, i, i+1);
    	let len = len1 > len2 ? len1 : len2;
    	// 若当前回文字符串长度大于记录长度, 则修正记录长度
    	if (len <= end-start) continue;
		// start = i - Math.floor((len-1) / 2);
		// end = i + Math.floor(len / 2);	
		if (len%2 === 0) {
			start = i - (len-2)/2;
			end = i + len/2;
		} else {
			start = i - (len-1)/2;
			end = i + (len-1)/2;
		}
		console.log(`${i} ${len} ${start} ${end} ${s.substring(start, end+1)}`);
    }
    return s.substring(start, end+1);
};
console.log(longestPalindrome2("cbbd"));

