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
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
	if (!t1 && !t2) return null;
	if (!t1) return t2;
	if (!t2) return t1;

    const ret = new TreeNode(t1.val + t2.val);
	ret.left = mergeTrees(t1.left, t2.left);
	ret.right = mergeTrees(t1.right, t2.right);
    return ret;
};


const t1 = new TreeNode(1);
t1.left = new TreeNode(3);
t1.right = new TreeNode(2);
t1.left.left = new TreeNode(5);

const t2 = new TreeNode(2);
t2.left = new TreeNode(1);
t2.right = new TreeNode(3);
t2.left.right = new TreeNode(4);
t2.right.right = new TreeNode(7);

console.log(JSON.stringify(mergeTrees(t1, t2)));








