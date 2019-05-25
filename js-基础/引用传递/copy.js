// json对象浅拷贝

function shadowCopy(obj) {
    let result = Object.assign({}, obj);
}

// json 对象深拷贝, 注意: 若考虑循环对象的拷贝, 需判断出环的存在再进行进一步处理
function deepCopy(obj) {

    if (!obj || typeof obj !== 'object') {
        return null;
    }
    // return  JSON.parse(JSON.stringify(obj)); // 会丢失 function 的值, 转换环对象会报错

    const res = Array.isArray(obj) ? [] : {};
    for (let i in obj) {
        if (typeof obj[i] === 'object') {
            res[i] = deepCopy(obj[i]);
        } else {
            res[i] = obj[i];
        }
    }
    return res;
}

const a = {
    a: 1,
    b: [[1, 2], [3, 4], 5],
    c: {
        d: {
            e: () => 'e',
            f: "f"
        }
    },

};


const b = deepCopy(a);
b.b[0][1] = 0;
b.c.d.f = 'b.d.d.f';
console.log(`${JSON.stringify(b)}`);    // {"a":1,"b":[[1,0],[3,4],5],"c":{"d":{"f":"b.d.d.f"}}}
console.log(`${JSON.stringify(a)}`);    // {"a":1,"b":[[1,2],[3,4],5],"c":{"d":{"f":"f"}}}

console.log(a.c.d.e);   // [Function: e]
console.log(b.c.d.e);   // [Function: e]
