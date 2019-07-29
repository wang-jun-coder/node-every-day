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
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
	let cur = head;
	let prev = null;
	while(cur) {
		let tmpNext = cur.next;
		cur.next = prev;
		prev = cur;
		cur = tmpNext;
	}
    return prev;
};

var reverseList2 = function(head) {
	if (!head || !head.next) return head;
	let p = reverseList2(head.next);
	head.next.next = head;
	head.next = null;
	return p;
};


function buildList(array) {
	let curNode = null;
	for (var i = array.length - 1; i >= 0; i--) {
		const val = array[i];
		let next = curNode;
		curNode = new ListNode(val);
		curNode.next = next;
	}
	return curNode;
}
function listToArray(head) {
	const ret = [];

	while(head) {
		ret.push(head.val);
		head = head.next;
	}
	return ret;
}

console.log(listToArray(reverseList2(buildList([1,2,3,4,5]))));