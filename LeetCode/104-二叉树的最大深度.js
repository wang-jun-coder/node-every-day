function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

const buildTree = array => {
	let nodes = [];
	for(let i=0; i<array.length; i++) {
		let val = array[i];
		if (val !== null) {
			nodes[i] = new TreeNode(val);
			continue;
		}
		nodes[i] = null;
	}
	for(let i=0; i<array.length/2; i++) {
		let node = nodes[i];
		if (node) {
			node.left = nodes[2*i+1] || null;
			node.right = nodes[2*i+2] || null;
		}
	}
	return nodes[0];
}
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root, cur=1) {
	if (!root) return cur || 0;
	cur = undefined === cur ? 1 : cur;
	if (!root.left && !root.right) return cur;
	if (!root.left) return maxDepth(root.right, cur+1);
	if (!root.right) return maxDepth(root.left, cur+1);
	let left = maxDepth(root.left, cur+1);
	let right = maxDepth(root.right, cur+1);
    return left > right ? left : right;
};
const tree = buildTree([3,9,20,null,null,15,7]);
console.log(maxDepth(tree));
















