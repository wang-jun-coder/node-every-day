namespace Validation1 {
  const letterReg = /^[a-zA-Z]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string):boolean {
      return letterReg.test(s);
    }
  }
}