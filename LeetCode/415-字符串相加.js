const a = 999;
const b = 999;

const add = (a, b) => {
	const aArray = (a + '').split('').reverse();
	const bArray = (b + '').split('').reverse();
	const ret = [];
	const len = aArray.length > bArray.length ? aArray.length : bArray.length;

	let carry = 0;
	for (let i=0; i<len; i++) {
		let augend = Number(aArray[i] || 0);
		let addend = Number(bArray[i] || 0);

		let tmpResult = augend + addend + carry;
		carry = Math.floor(tmpResult / 10);
		ret.push(tmpResult % 10);
	}
	if (carry) {
		ret.push(carry);
	}
	return ret.reverse().join('');
}

console.log(add(a, b));