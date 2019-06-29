import { ZipCodeValidator, ZipCodeValidator as ZCV } from './ZipCodeValidator';
let myValidator = new ZipCodeValidator();
myValidator = new ZCV();

// 正常情况, import 应该放在顶部集中, 此处为了 demo 方便
import * as validator from './ZipCodeValidator';
myValidator = new validator.ZipCodeValidator();
myValidator = new validator.mainValidator();


import StaticZipCodeValidator from './StaticZipCodeValidator';
let strings = ['hello', '98052', '101'];
strings.forEach(s => console.log(`${s} ${StaticZipCodeValidator(s) ? 'matchs' : 'does not match'}`));

import num from './OneTowThree';
console.log(num);

import Zip  = require('./ZipCodeValidator1');
let v = new Zip();
strings.forEach(s => console.log(`${s} ${v.isAcceptable(s) ? 'matchs' : 'does not match'}`));

// 模拟 nodejs 中的动态模块加载
declare function require(params:string): any;
import { ZipCodeValidator as Zip1} from './ZipCodeValidator';
let needZip1 = true;
if(needZip1) {
  let ZipCodeValidator: typeof Zip1 = require('./ZipCodeValidator');
  let v = new ZipCodeValidator();
  if(v.isAcceptable('123456')) {
    console.log('ZipCodeValidator load');
  }
}


// 外部模块
/// <refrence> node.d.ts
import * as URL from "url";
let myUrl = URL.parse("http://www.test.com");

import x, {y} from "hot-new-module";
x(y);

// 类型声明通配符
import fileContent from "./xyz.txt!text";
import data from "json!http://test.com/data.json";
console.log(data, fileContent);

/// <refrence> math-lib.d.ts
// import { isPrime } from "math-lib";
// isPrime(2);
// import * as mathLib from "math-lib";
// mathLib.isPrime(2);

