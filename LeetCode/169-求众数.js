/**
 * @param {number[]} nums
 * @return {number}
 */
// 暴力破解
var majorityElement = function(nums) {
    let ret = -1;
    let majority = nums.length/2;
    for (let i=0; i<nums.length; i++) {
    	let cnt = 0;
    	for(let j=0; j<nums.length; j++) {
    		if (nums[i] === nums[j]) {
    			cnt++;
    		}
    	}
    	if (cnt > majority) {
    		ret = nums[i];
    		break;
    	}
    }
    return ret;
};
// 字典
var majorityElement2 = function(nums) {
    let ret = -1;
    let majority = Math.floor(nums.length/2);
    let map = {};
    for (let i=0; i<nums.length; i++) {
    	if (map[nums[i]] === undefined) {
    		map[nums[i]] = 1;
    	} else {
    		map[nums[i]] += 1;
    	}
    }
    Object.keys(map).forEach(key => {
    	if (map[key] > majority) {
    		ret = key;
    	}
    })
    return ret;
};
// 排序
var majorityElement3 = function(nums) {
    let majority = Math.floor(nums.length/2);
    nums.sort();
    return nums[majority];
};



// 投票



console.log(majorityElement2([2,2,1,1,1,2,2]));