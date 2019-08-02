/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
	if (!nums || nums.length === 0) return null;
	if (nums.length===1) return new TreeNode(nums[0]);
	let mid = Math.floor((nums.length-1)/2); 
	console.log(mid);
	let root = new TreeNode(nums[mid]);
	root.left = sortedArrayToBST(nums.slice(0, mid));
	root.right = sortedArrayToBST(nums.slice(mid+1, nums.length));
	return root;
};
// 上述方法切分数组不必要, 直接引用原数组, 指定区间, 理论上减少内存消耗
var sortedArrayToBST1 = function(nums) {
	if (!nums || nums.length===0) return null;
	function buildTree(nums, left, right){
		if (left > right) return null;
		let mid = Math.floor((left + right)/2);
		let root = new TreeNode(nums[mid]);
		root.left = buildTree(nums, left, mid-1);
		root.right = buildTree(nums, mid+1, right);
		return root;
	}
	return buildTree(nums, 0, nums.length-1);
};


const tree = sortedArrayToBST1([-10,-3,0,5,9]);
console.log(JSON.stringify(tree));