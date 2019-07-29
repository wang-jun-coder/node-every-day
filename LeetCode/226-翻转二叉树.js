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
 * @return {TreeNode}
 */
var invertTree = function(root) {
	if (!root) return root;
	let tmpNode = root.left;
	root.left = root.right;
	root.right = tmpNode;
	if (root.left) invertTree(root.left);
	if (root.right) invertTree(root.right);
	return root;
};

var invertTree2 = function(root) {
	if (!root) return root;
	if (!root.left && !root.right) return root;
	let tmpNode = root.left;
	root.left = root.right;
	root.right = tmpNode;
	invertTree(root.right);	
	invertTree(root.left);
	return root;
};

/*
     4
   /   \
  2     7
 / \   / \
1   3 6   9
*/ 

const tree = new TreeNode(4);
tree.left = new TreeNode(2);
tree.right = new TreeNode(7);
tree.left.left = new TreeNode(1);
tree.left.right = new TreeNode(3);
tree.right.left = new TreeNode(6);
tree.right.right = new TreeNode(9);

/**
     4
   /   \
  7     2
 / \   / \
9   6 3   1
*/ 
console.log(JSON.stringify(invertTree(tree)));










