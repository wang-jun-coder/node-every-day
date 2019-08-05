/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
 function ListNode(val) {
    this.val = val;
    this.next = null;
}
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};


function buildLink(array) {
	let root = null;
	let cur = null;
	while(array.length) {
		const val = array.shift();
		const node = new ListNode(val);
		if (!root) root = node;
		if (!cur) cur = node;
		else {
			cur.next = node;
			cur = node;
		}
	}
	return root;
}

const link = buildLink([4,5,1,9]);
deleteNode(link.next);
console.log(link);

