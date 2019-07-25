## 模块机制

### 模块加载
* `main `
* `node::Start(argc, argv);`
* `Start(uv_default_loop(), args, exec_args);`
* `Start(isolate, isolate_data.get(), args, exec_args);`
* `LoadEnvironment(&env);`
* `internal/bootstrap/node.js`
* `startup();`
* `CJSModule.runMain();`
* `Module._load(process.argv[1], null, true);`
* `tryModuleLoad(module, filename);`
* `module.load(filename);`
* `Module._extensions[extension](this, filename);`
* `module._compile(stripBOM(content), filename);`
* `compiledWrapper.call(this.exports, this.exports, require, this,
                                  filename, dirname);`
                                  

### 循环引用问题

```js
// ---------- circular/a.js -----------

console.log(`a begin`);
exports.done = false;

const b = require('./b');
console.log(`a load b.js, b.done = ${b.done}`);

exports.done = true;
console.log(`b end`);

// ---------- circular/b.js -----------
console.log(`b.js begin`);
exports.done = false;

const a = require('./a');
console.log(`b load a.js, a.done = ${a.done}`);

exports.done = true;
console.log(`b end`);


// ---------- index.js -----------
console.log(`circular load a.js and b.js begin`);
const a = require('./circular/a');
const b = require('./circular/b');
console.log(`index.js a.done = ${a.done}, b.done = ${b.done}`);
console.log(`circular load a.js and b.js end`);

// ---------- console -----------
/*
circular load a.js and b.js begin
a begin
b.js begin
b load a.js, a.done = false
b end
a load b.js, b.done = true
b end
index.js a.done = true, b.done = true
circular load a.js and b.js end
* */
```
加载流程如下  

* index.js 加载 a.js, 
* a 尝试加载 b.js
* b.js 这时候尝试加载 a.js
* 为防止死循环, 此时, b.js 只能拿到一个 a.js 的未完成的副本进行使用
* b.js 完成加载后 a.js 拿到 b.js 的 exports, 
* a.js 再完成剩余的加载
* 最终, 在 index.js 中 a.js 和 b.js 均完成加载

需注意：循环过程中，b.js 中拿到的 a.js 是不完整的，部分属性方法可能无法使用。虽然循环引用不会导致死循环，但也应该避免。


### 全局变量泄露问题

```js
// ---------- global/leakGlobalVar.js -----------
leak = 'this is a leak global variable'; // 可启用严格模式避免
module.exports = {
    name: 'leakGlobalVar.js'
};

// ----------index.js -----------
const leakGlobalVar = require('./global/leakGlobalVar');
console.log(`module: ${JSON.stringify(leakGlobalVar)}, leak: ${leak}`); // module: {"name":"leakGlobalVar.js"}, leak: this is a leak global variable
```

模块中泄露的全局变量可在其他模块中拿到， 无意识的变量泄露可通过启用严格模式避免

```js
// ---------- global/vm.js -----------
const vm = require('vm');
let code = `(
    function() {
        leakInVm = 'this is a leak object in vm';
        return {
            name: 'global/vm.js'
        }
    }
)`;
const vmFn = vm.runInThisContext(code);
module.exports = vmFn();

// ---------- index.js -----------

const vm1 = require('./global/vm');
console.log(vm1);       // { name: 'global/vm.js' }
console.log(leakInVm);  // this is a leak object in vm

```
[vm.runInThisContext() compiles code, runs it within the context of the current global and returns the result. Running code does not have access to local scope, but does have access to the current global object.](https://nodejs.org/docs/latest-v8.x/api/vm.html#vm_vm_runinthiscontext_code_options)



