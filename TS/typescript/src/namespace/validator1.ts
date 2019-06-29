namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string):boolean;
  }
  const letterReg = /^[a-zA-Z]+$/;
  const numberReg = /^[0-9]+%/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string):boolean {
      return letterReg.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string):boolean {
      return s.length === 5 && numberReg.test(s);
    }
  }
}

// some sample to try
let strings = ['hello', '98052', '101'];

// use
let validators:{[s: string]: Validation.StringValidator} = {};
validators['ZIP code'] = new Validation.ZipCodeValidator();
validators['Letters only'] = new Validation.LettersOnlyValidator();

strings.forEach(s => {
  for (const key in validators) {
    let isMatch = validators[key].isAcceptable(s);
      console.log(`${s} ${isMatch ? "matchs" : "dose not match"} ${key}`)
  }
})

export default {};