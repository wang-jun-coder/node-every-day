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
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 // 递归
var isValidBST = function(root, lower=null, upper=null) {
	if (!root) return true;
	let val = root.val;
	if (lower !== null && val <= lower) return false;
	if (upper !== null && val >= upper) return false;
	if (!isValidBST(root.left, lower, val)) return false;
	if (!isValidBST(root.right, val, upper)) return false;
    return true;
};

// 迭代
var isValidBST1 = function(root) {
	const nodes = [];
	const uppers = [];
	const lowers = [];

	function update(node, lower=null, upper=null) {
		nodes.push(node);
		lowers.push(lower);
		uppers.push(upper);
	}
	update(root, null, null);
	while(nodes.length) {
		let node = nodes.shift();
		let upper = uppers.shift();
		let lower = lowers.shift();

		if (!node) continue;
		if (lower !== null && node.val <= lower) return false;
		if (upper !== null && node.val >= upper) return false;	
		update(node.left, lower, node.val);
		update(node.right, node.val, upper);
	}
	return true;
}



const root = buildTree([2,1,3]);
console.log(isValidBST1(root));
