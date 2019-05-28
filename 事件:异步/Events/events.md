## Events

### 基本使用

```js
    class MyEmitter extends EventEmitter{}
    const emitter = new MyEmitter();

    // 自带事件, 注意, 不可在此回调中添加新的监听者, 避免导致死循环
    emitter.on('newListener', function (...args) {
        console.log(`newListener: ${args}`);
        // newListener: removeListener,function (...args) {
        //     console.log(`removeListener: ${args}`);
        // }
        // newListener: event1,function event1Listener(...args) {
        //     console.log(`event1: ${args}, is emitter: ${this === emitter}`);    // event1: 1,2, is emitter: true
        // }
        // newListener: error,function (error) {
        //     console.log(`error: ${error}`);         //error: Error: oh, error
        // }
    });
    // 自带事件
    emitter.on('removeListener', function (...args) {
        console.log(`removeListener: ${args}`);
        // removeListener: event1,function event1Listener(...args) {
        //     console.log(`event1: ${args}, is emitter: ${this === emitter}`);    // event1: 1,2, is emitter: true
        // }
    });

    // 注意回调函数的声明方式, Function 中的 this,调用时根据作用域链进行确定, 若是箭头函数, 则会被绑定到声明时的词法作用域上
    function event1Listener(...args) {
        console.log(`event1: ${args}, is emitter: ${this === emitter}`);    // event1: 1,2, is emitter: true
    }
    emitter.on('event1', event1Listener);
    emitter.on('error', function (error) {
        console.log(`error: ${error}`);         //error: Error: oh, error
    });

    emitter.emit('event1', 1, '2'); // 按注册顺序依次同步执行监听函数, 若想切换为异步, 可在监听函数中使用定时器切换异步
    emitter.emit('error', new Error('oh, error'));
    emitter.removeListener('event1', event1Listener);   // 移除指定监听者


    // max listener
    console.log(`EventEmitter default: ${EventEmitter.defaultMaxListeners}`);    // 默认每个事件可注册十个监听器
    emitter.setMaxListeners(11);                                    // 可通过 setMaxListeners 修改单个监听器实例的最大监听个数
    console.log(`emitter maxListeners: ${emitter.getMaxListeners()}`);  // emitter maxListeners: 11
    EventEmitter.defaultMaxListeners = 12;                          // 也可直接修改所有监听器默认个数, 需谨慎使用, 此方法影响所有实例, 包括已创建的
    console.log(`EventEmitter custom: ${EventEmitter.defaultMaxListeners}`);     // custom: 12
    console.log(`emitter maxListeners: ${emitter.getMaxListeners()}`);  // emitter maxListeners: 11
    console.log(`event names: ${emitter.eventNames()}`) // event names: event1,error    
```

### 错误示范
```js

    let emitter = new EventEmitter();
    emitter.on('event1', function () {
        console.log(`circulation before`);
        emitter.emit('event1');             // 此处死循环, 不停回调监听函数,然后触发事件, 再次回调(通知监听者是一个同步操作)
        console.log(`circulation after`);         // 此 log 没有机会输出
    });
    emitter.emit('event1');

```
```js
    let emitter = new EventEmitter();
    // 监听默认加入新监听的事件
    emitter.on('newListener', function (listener) {
        console.log('circulation before');
        emitter.on('event1',() => console.log(`on event1`)); // 新加入监听者会触发回调
        console.log('circulation after');       // 此处 log 没有机会输出
    });
    emitter.on('event1', ()=>{});
```
```js
    let emitter = new EventEmitter();
    // 每次回调都添加自己本身作为监听者, 事件触发越多, 监听者回调越多, 直至达到最大值(默认十个)
    emitter.on('event1', function listener() {
        emitter.on('event1', listener);
        console.log(`listener: on event1`);
    });
    emitter.emit('event1');
    // listener: on event1
    
    emitter.emit('event1');
    // listener: on event1
    // listener: on event1
```

### 自己实现一个简单的 EventEmitter

```js
const NEW_LISTENER = 'newListener';
const REMOVE_LISTENER = 'removeListener';
class WJEventEmitter {

    constructor() {
        this.hander = {
            NEW_LISTENER: [],
            REMOVE_LISTENER:[]
        };
    }
    on(eventName, listener) {
        let listeners = this.hander[eventName];
        if (!listeners) {
            listeners = [];
            this.hander[eventName] = listeners;
        }
        listeners.push(listener);

        this.emit(NEW_LISTENER, listener);
    }
    off(eventName, listener) {
        let listeners = this.hander[eventName] || [];
        let index = listeners.indexOf(listener);
        if (index !== -1) {
            listeners.splice(index, 1);
        }

        this.emit(REMOVE_LISTENER, listener);
    }
    emit(eventName, ...args) {
        const listeners = this.hander[eventName] || [];
        listeners.forEach(listener => {
            listener.call(this, ...args);
        })
    }
}
```
EventEmitter 实现了一个监听者机制，完整实现还需要添加 onec， 和个数限制， 使用时需注意不需要监听时，请移除所有监听者，避免内存泄露

