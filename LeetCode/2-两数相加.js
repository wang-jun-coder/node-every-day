/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function getNodeValue(node) {
	const result = [];
	while(node) {
		result.push(node.val);
		node = node.next;
	}
	return result;
}

var addTwoNumbers = function(l1, l2) {
    const result = new ListNode(0);
    let l3 = result;
    let carry = 0; // 进位标志
    while(l1 || l2) {
    	const first = l1 ? l1.val : 0;
    	const second = l2 ? l2.val : 0;
    	const third = carry;
    	const resNum = first + second + third;
    	carry = resNum >= 10 ? 1 : 0;
    	l3.val = resNum % 10;
    	
    	if (l1) l1 = l1.next;
    	if (l2) l2 = l2.next;

    	if (!l3.next && (l1 || l2)) l3.next = new ListNode(0);
    	if (l1 || l2) l3 = l3.next;
    }
    if (carry) {
    	l3.next = new ListNode(carry);
    }
    return result;
};

const l1 = new ListNode(2);
l1.next = new ListNode(5);
l1.next.next = new ListNode(5);

const l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

let retNode = addTwoNumbers(l1, l2);
const result = getNodeValue(retNode);
// 2 5 5 + 5 6 4 = 7 1 0 1 
console.log('-------');
console.log(result);



