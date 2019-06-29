/// <reference path="Validation1.ts" />
/// <reference path="LetterOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// some sample to try
let strings = ['hello', '98052', '101'];

// use
let validators:{[s: string]: Validation1.StringValidator} = {};
validators['ZIP code'] = new Validation1.ZipCodeValidator();
validators['Letters only'] = new Validation1.LettersOnlyValidator();

strings.forEach(s => {
  for (const key in validators) {
    let isMatch = validators[key].isAcceptable(s);
      console.log(`${s} ${isMatch ? "matchs" : "dose not match"} ${key}`)
  }
})

// tsc --outFile build/test.js Test.ts && node build/test.js
