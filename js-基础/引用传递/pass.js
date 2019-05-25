// 基础类型值传递
(function demo1() {

    let u = undefined;
    let b = true;
    let n = null;
    let num = 1;
    let s = 'string';
    let symbol = Symbol('Symbol');

    console.log(`${u} ${b} ${n} ${num} ${s}`);  // undefined true null 1 string
    console.log(symbol);                        // Symbol(Symbol)

    function foo(u1, b1, n1, num1, s1, symbol1) {

        u1 = null;
        b1 = true;
        n1 = undefined;
        num1 = 2;
        s1 = 's1';
        symbol1 = Symbol('Symbol1');

        console.log(`${u1} ${b1} ${n1} ${num1} ${s1}`); // null true undefined 2 s1
        console.log(symbol1);                           // Symbol(Symbol1)
    }
    foo(u, b, n, num, s, symbol);

    console.log(`${u} ${b} ${n} ${num} ${s}`);      // undefined true null 1 string
    console.log(symbol);                            // Symbol(Symbol)

})();

// 基础类型传递引用
(function demo2() {

    let num = new Number(1);
    let str = new String('str');
    let bool = new Boolean(true);

    console.log(`${num} ${str} ${bool}`);   //1 str true
    function foo(num1, str1, bool1) {
        // 注意: 如果重新对变量赋值, 变量就切换了引用的对象
        num1.test = 2;
        str1.test = 'str1';
        bool1.test = false;

        console.log(`${num1} ${str1} ${bool1}`);                // 1 str true
        console.log(`${num1.test} ${str1.test} ${bool1.test}`); // 2 str1 false
    }
    foo(num, str, bool);
    console.log(`${num} ${str} ${bool}`);                   // 1 str true
    console.log(`${num.test} ${str.test} ${bool.test}`);    // 2 str1 false

})();


// 复杂类型按共享传递
(function demo3() {
    let a = {a: 1};

    console.log(JSON.stringify(a));             // {"a":1}
    function foo(param) {
        // 传递进来的 param 实际上是对 a 对象的一个引用, 对其修改值, 则 a 对象也会改变
        param.b = 2;
        console.log(JSON.stringify(param));     // {"a":1,"b":2}

        // 变量是对对象的一个引用, 可以通过引用修改对象的值, 也可以重新赋值引用其他对象
        param = {c: 3};
        console.log(JSON.stringify(param));     // {"c":3}
    }
    foo(a);
    console.log(JSON.stringify(a));             // {"a":1,"b":2}

})();


