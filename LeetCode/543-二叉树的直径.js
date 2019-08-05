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
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
	if(!root) return 0;
	// 左子树深度+右子树深度
	function depth(root, cur=0) {
		if (!root) return cur;
		let depthLeft = depth(root.left, cur+1);
		let depthRight = depth(root.right, cur+1);
		return depthLeft > depthRight ? depthLeft : depthRight;
	}


	function diameterOfBinary (root, max = 0) {
		const left = depth(root.left);
		const right = depth(root.right);
		let cur = left + right;
		max = cur > max ? cur : max;
		if (root.left) {
			let leftMax = diameterOfBinary(root.left, max);
			max = leftMax > max ? leftMax : max;
		};
		if (root.right) {
			let rightMax = diameterOfBinary(root.right, max);
			max = rightMax > max ? rightMax : max;
		}
		return max;
	}
	return diameterOfBinary(root, 0);
};

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
const root = buildTree([4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2]);
console.log(JSON.stringify(root));
console.log(diameterOfBinaryTree(root));

