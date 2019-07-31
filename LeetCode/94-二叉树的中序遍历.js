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
 * @return {number[]}
 */
 // 递归
var inorderTraversal = function(root) {
	
	if (!root) return [];
	if (!root.left && !root.right) return [root.val];
	let ret = [];
	if(root.left) ret.push(...inorderTraversal(root.left));
	ret.push(root.val);
	if(root.right) ret.push(...inorderTraversal(root.right));
    return ret;
};
// 迭代, 利用栈保存访问路径
var inorderTraversal1 = function(root) {
	let stack = [];
	let ret = [];
	let cur = root;
	while(cur || stack.length) {
		if (cur) {
			stack.push(cur);
			cur = cur.left;
			continue
		} 
		cur = stack.pop();
		ret.push(cur.val);
		cur = cur.right;
	}
	return ret;
}

// 莫里斯方法解析 + 线索二叉树 ???

const root = new TreeNode(1);
root.left = null;
root.right = new TreeNode(2);
root.right.left = new TreeNode(3);

console.log(inorderTraversal1(root));

