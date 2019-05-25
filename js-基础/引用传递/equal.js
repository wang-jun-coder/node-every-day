// === 严格相等 // https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.6
(function demo1() {

    let num =0;
    let obj = new String('0');
    let str = '0';
    let bool = false;

    console.log(num === num);       // true
    console.log(obj === obj);       // true
    console.log(str === str);       // true
    console.log(bool === bool);     // true

    console.log(num === obj);       // false
    console.log(num === str);       // false
    console.log(num === bool);      // false

    console.log(null === undefined);// false
    console.log(-0 === +0);         // true
    console.log(NaN === NaN);       // false
    console.log(0.3 === 0.3);       // true
    console.log(0.1+0.2 === 0.3);   // false    // 精度问题导致
})();

// == 宽松相等
// https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3
(function demo2() {

    // NaN 与任何数(包括 NaN)比较均不相等
    console.log(NaN == 1);          // false
    console.log(NaN == NaN);        // false

    // -0 == +0
    console.log(-0 == +0);          // true


    let a = {
        valueOf() {
            return 1
        },
        toString() {
            return '2'
        }
    };
    let b = a;
    console.log(a == b);            // true

    // ecma 规定 undefined == null
    console.log(undefined == null); // true
    console.log(null == undefined); // true


    // 字符串与 number 对比, 字符串转换为 number 再和 number 比较
    console.log(1 == '1');          // true
    console.log('1' == 1);          // true

    // boolean 与其他类型比较, 均线转换为 number
    console.log(true == '1');       // true
    console.log(true == 1);         // false


    // 对象与number 或字符串比较, 将复杂对象转换为基本对象
    const c = {
        valueOf() {
            return '0';
        },
        toString() {
            return "2";
        }
    };

    console.log(c == 0);    // true
    console.log(c == 2);    // false

    const d = {
        toString() {
            return '2'
        }
    };
    console.log(d == 2);    // true;

})();


(function demo3() {

    function equal(obj1, obj2) {
        let result = true;
        if (typeof obj1 !== typeof obj2) {
            result =false;
            return result;
        }
        // 基本类型
        if (typeof obj1 !== 'object') return obj1 === obj2;

        // 对象类型
        for (let i in obj1) {
            // obj2 不存在该属性
            if (!obj2.hasOwnProperty(i)) {
                result = false;
                break;
            }
            let val1 = obj1[i];
            let val2 = obj2[i];

            // 二者值类型不同
            if (typeof val1 !== typeof val2) {
                result = false;
                break;
            }

            // 基础类型
            if (typeof val1 !== 'object') {
                result = val1 === val2;
                if (!result) break;
                continue;
            }

            // 复杂类型, 递归判断
            result = equal(val1, val2);
            if (!result) {
                break;
            }
        }
        return result;
    }

    const a = {
        a: '1',
        b: 2,
        c: {
            d: true,
            e: null,
            f: [
                {
                    g: 3
                },
                4
            ]
        }
    };
    const b = {
        a: '1',
        b: 2,
        c: {
            d: true,
            e: null,
            f: [
                {
                    g: 3
                },
                4
            ]
        }
    };

    console.log(a === b);       // false
    console.log(equal(a, b));   // true
})();
