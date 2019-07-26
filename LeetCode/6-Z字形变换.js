/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    const rows = [];
    let curRow = 0;
    let down = false;
    if (numRows===1) return numRows;
    for(let i=0; i<s.length; i++) {
        rows[curRow] = rows[curRow] ? rows[curRow] + s[i] : s[i];
        if (curRow===0 || curRow === numRows-1) down = !down;
        curRow += down ? 1 : -1;
    }
    console.log(rows);
    return rows.join('');

};


console.log(convert("PAYPALISHIRING",3));
/**

p    a   h   n
a p  l s i i g
y    i   r
*/