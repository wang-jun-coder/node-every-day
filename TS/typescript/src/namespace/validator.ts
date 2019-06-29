interface StringValidator {
  isAcceptable(s: string):boolean;
}
const letterReg = /^[a-zA-Z]+$/;
const numberReg = /^[0-9]+%/;

class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string):boolean {
    return letterReg.test(s);
  }
}

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string):boolean {
    return s.length === 5 && numberReg.test(s);
  }
}

// some sample to try
let strings = ['hello', '98052', '101'];

// use
let validators:{[s: string]: StringValidator} = {};
validators['ZIP code'] = new ZipCodeValidator();
validators['Letters only'] = new LettersOnlyValidator();

strings.forEach(s => {
  for (const key in validators) {
    let isMatch = validators[key].isAcceptable(s);
      console.log(`${s} ${isMatch ? "matchs" : "dose not match"} ${key}`)
  }
})

export default {};