## 私有化成员

### 使用闭包
```js
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
```
### 使用 symbol, 但是不能完全阻止对私有属性的操作
```js
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
```


