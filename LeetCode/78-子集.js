/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  if (!nums) return nums;
  if (nums.length===0) return [[]];
  if (nums.length===1) return [[],nums];

  let ret = [[]];
  for(let i=0; i< nums.length; i++) {
  	let len = ret.length;
  	for(let j=0; j<len; j++) {
  		ret.push([...ret[j], nums[i]])
  	}
  }
  return ret;
};

console.log(subsets([1,2,3]));