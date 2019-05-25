(function demo1() {
    const cls = function () {
        const privates = {
            a: 'a',
            b: 2,
            pAdd(a, b) {
                return a+b;
            }
        };
        function p() {}
        p.prototype.getA = function () {
            return privates.a;
        };
        p.prototype.getB = function () {
            return privates.b;
        };
        p.prototype.add = function () {
            return privates.pAdd(...arguments);
        };
        return p;

    };

    const Class = cls();
    const ins1 = new Class();

    console.log(`${ins1.getA()} ${ins1.getB()} ${ins1.add(1, 2)}`);     // a 2 3
    console.log(`${ins1.a} ${ins1.b} ${ins1.pAdd}`);                    // undefined undefined undefined

})();

(function demo2() {

    const Class = function p() {
        const key = Symbol();
        this[key] = {
            a: 'a',
            b: 2,
            pAdd(a, b) {
                return a+b;
            }
        };

        this.getA = function () {
            return this[key].a;
        };
        this.getB = function () {
            return this[key].b;
        };
        this.add = function () {
            return this[key].pAdd(...arguments);
        }
    };

    const ins1 = new Class();
    console.log(`${ins1.getA()} ${ins1.getB()} ${ins1.add(1, 2)}`);    // a 2 3

    // 但是可以通过这种方式取得私有变量
    const symbols = Object.getOwnPropertySymbols(ins1);
    const key = symbols[0];
    console.log(`${ins1[key].a} ${ins1[key].b} ${ins1[key].pAdd}`)      //a 2 pAdd(a, b) {return a+b;}
})();

// class 实现私有属性, 也需要借助 闭包或者 symbol, 目前有提案 使用 # 前缀标志私有
(function demo3() {

    const getClass = function () {

        function a() {
            return 'a';
        }
        function b() {
            return 2;
        }
        function pAdd(a, b) {
            return a+b;
        }

        class Class{
            constructor(){

            }
            getA() {
                return a.call(this);
            }

            getB() {
                return b.call(this);
            }

            add() {
                return pAdd.apply(this, arguments);
            }
        }
        return Class;
    };

    const Class = getClass();

    const ins1 = new Class();
    console.log(`${ins1.getA()} ${ins1.getB()} ${ins1.add(1, 2)}`);    // a 2 3

})();


(function demo4() {
    const uniqueArray = array => [...new Set(array)];

    const res = uniqueArray( [1,2,2,3,4,5,5]);
    console.log(res);

})();
