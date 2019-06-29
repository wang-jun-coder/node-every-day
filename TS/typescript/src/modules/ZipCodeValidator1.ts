export = class ZipCodeValidator {
  static numReg = /^[0-9]+$/;
  isAcceptable(s:string) {
    return s.length === 5 && ZipCodeValidator.numReg.test(s);
  }
}