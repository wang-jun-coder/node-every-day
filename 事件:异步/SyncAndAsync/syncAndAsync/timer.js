setTimeout(() => console.log('timeout'));
setImmediate(() => console.log(`immediate`));

// case1:
// immediate
// timeout

// case2:
// timeout
// immediate

/**
 * 为什么会这样?
 *
 * 已知:
 * 1. 当 Node.js 启动后，它会初始化事件轮询, https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
 * 2. setTimeout(fn, 0), (据说相当于 setTimeout(fn, 1))无法保证立即执行; https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout
 * 3. setTimeout 不能保证时间到达立即执行, 仅保证不早于改时间执行
 *
 * 当 上述代码在主模块执行后, 下轮事件循环: timers 阶段有回调, check 阶段也有回调
 *
 * 当 主模块代码执行完毕后, 进入事件循环, 若系统状态良好, 经过 timers 阶段时, 不到 1ms, 则回调不执行
 * 当 轮询到 check 阶段 setImmediate 执行
 *
 * 当 主模块代码执行完毕后, 进入事件循环, 若系统状态良好, 经过 timers 阶段时, 超过 1ms, 则回调执行
 * 当 轮询到 check 阶段 setImmediate 执行
 *
 * */


setTimeout(() => {
    setTimeout(() => console.log('setTimeout: timeout in callback'));
    setImmediate(() => console.log(`setTimeout: immediate in callback`));
});

/*
* 这个为什么不稳定??????????
* */

setImmediate(() => {
    setImmediate(() => console.log(`setImmediate: immediate in callback`));
    setTimeout(() => console.log('setImmediate: timeout in callback'));
});
/*
* 这个为什么也不稳定???? 非要勉强解释, 实际上不成立,
*
* 和在主模块中一样, setTimeout(fn,0) 无法保证立即调用
*
* setImmediate 回调的执行处于事件循环的 check 阶段
*
* 本轮循环已处于 check 阶段, 内部 setImmediate 的回调只能等待下轮循环的 check 执行
* 次轮循环开始进入 timer 阶段, 若上轮循环足够快, 则此时 执行 setTimeout 回调, 否则等待下轮循环
* 经过其他事件循环阶段, 再次进入 check 阶段, 执行 内部 setImmediate 的回调
* */



// setImmediate 设计为, 在当前轮询阶段完成后执行脚本
// setTimeout 设计为, 在计划在毫秒的最小阈值经过后执行脚本

// setTimeout(fn), setTimeout(fn, 0), setTimeout(fn, 1);
// setImmediate(() => {

    setImmediate(() => {
        console.log(`on check. 1`);
        setImmediate(() => {
            console.log(`on check. 2`);
            setImmediate(() => {
                console.log(`on check. 3`);
                setImmediate(() => {
                    console.log(`on check. 4`);
                });
            });
        });
    });


    setTimeout(() => {
        console.log(`on timer. setTimeout(fn)`);
    });

    setTimeout(() => {
        console.log(`on timer. setTimeout(fn, 0)`);
    }, 0);

    setTimeout(() => {
        console.log(`on timer. setTimeout(fn, 1)`);
    }, 1);

    /*
    on timer. setTimeout(fn)
    on timer. setTimeout(fn, 0)
    on timer. setTimeout(fn, 1)
    on check. 1
    on check. 2
    on check. 3
    on check. 4
    * */

    /*
    on check. 1
    on timer. setTimeout(fn)
    on timer. setTimeout(fn, 0)
    on timer. setTimeout(fn, 1)
    on check. 2
    on check. 3
    on check. 4
    * */
// });

