import t from './MyClass';
import f from './MyFunc';
let x = new t();
console.log(f());


import {somFunc, SomeType} from './MyThings'
let x1 = new SomeType();
let y1 = somFunc();


import * as MyLargModule from './MyLargeModule';
let x2 = new MyLargModule.Dog();