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
var isSymmetric = function(root) {
    
    function isSymmetricTree(left, right) {
    	if (!left && !right) return true;
    	if (!left || !right) return false;
    	return left.val === right.val && isSymmetricTree(left.right, right.left) && isSymmetricTree(left.left, right.right);
    }
    return isSymmetricTree(root, root);
};

// 迭代
var isSymmetric1 = function(root) {
	if (!root) return false;
	const queue = [];
	queue.push(root.left, root.right);
	console.log(queue);
	while(queue.length) {
		let node1 = queue.shift();
		let node2 = queue.shift();
		if(!node1 && !node2) continue;
		if (!node1 || !node2) return false;
		if (node1.val !== node2.val) return false;
		queue.push(node1.left, node2.right);
		queue.push(node1.right, node2.left);
	}
	return true;
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
let root1 = buildTree([1,2,2,3,4,4,3]);
let root2 = buildTree([1,2,2,null,3,null,3]);

console.log(isSymmetric1(root2));




